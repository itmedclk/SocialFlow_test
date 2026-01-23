import { storage } from "../storage";
import { processCampaignFeeds, processAllActiveCampaigns } from "./rss";
import { processDraftPosts, publishScheduledPosts, processNextPosts } from "./pipeline";

let mainLoopId: NodeJS.Timeout | null = null;

const MAIN_LOOP_INTERVAL = 5 * 60 * 1000;
const PREPARATION_WINDOW_MINUTES = 30;
const MAX_POSTS_TO_PREPARE = 2;

export function startScheduler(): void {
  console.log("[Scheduler] Starting smart scheduler...");

  mainLoopId = setInterval(async () => {
    try {
      await runSchedulerCycle();
    } catch (error) {
      console.error("[Scheduler] Cycle error:", error);
    }
  }, MAIN_LOOP_INTERVAL);

  setTimeout(() => runSchedulerCycle(), 10000);

  console.log("[Scheduler] Smart scheduler started");
  console.log(`  - Check interval: every ${MAIN_LOOP_INTERVAL / 60000} minutes`);
  console.log(`  - Preparation window: ${PREPARATION_WINDOW_MINUTES} minutes before scheduled time`);
  console.log(`  - Max posts to prepare per cycle: ${MAX_POSTS_TO_PREPARE}`);
}

async function runSchedulerCycle(): Promise<void> {
  const now = new Date();
  const campaigns = await storage.getActiveCampaigns();

  for (const campaign of campaigns) {
    const shouldFetchRSS = await shouldRunRSSFetch(campaign.id);
    if (shouldFetchRSS) {
      console.log(`[Scheduler] Fetching RSS for campaign ${campaign.id}...`);
      try {
        await processCampaignFeeds(campaign.id);
      } catch (error) {
        console.error(`[Scheduler] RSS fetch error for campaign ${campaign.id}:`, error);
      }
    }
  }

  try {
    const prepared = await processNextPosts(MAX_POSTS_TO_PREPARE, PREPARATION_WINDOW_MINUTES);
    if (prepared > 0) {
      console.log(`[Scheduler] Prepared ${prepared} posts for upcoming publication`);
    }
  } catch (error) {
    console.error("[Scheduler] Preparation error:", error);
  }

  try {
    const result = await publishScheduledPosts();
    if (result.published > 0 || result.failed > 0) {
      console.log(`[Scheduler] Published: ${result.published}, Failed: ${result.failed}`);
    }
  } catch (error) {
    console.error("[Scheduler] Publish error:", error);
  }
}

async function shouldRunRSSFetch(campaignId: number): Promise<boolean> {
  const logs = await storage.getLogsByCampaign(campaignId, 10);
  const lastFetchLog = logs.find(log => 
    log.message.includes("RSS fetch completed") || 
    log.message.includes("New article found")
  );

  if (!lastFetchLog) return true;

  const lastFetchTime = new Date(lastFetchLog.createdAt!);
  const hoursSinceLastFetch = (Date.now() - lastFetchTime.getTime()) / (1000 * 60 * 60);
  
  return hoursSinceLastFetch >= 1;
}

export function stopScheduler(): void {
  if (mainLoopId) {
    clearInterval(mainLoopId);
    mainLoopId = null;
  }
  console.log("[Scheduler] Stopped");
}

export async function runNow(action: "fetch" | "process" | "publish", campaignId?: number): Promise<any> {
  switch (action) {
    case "fetch":
      if (campaignId) {
        return await processCampaignFeeds(campaignId);
      } else {
        await processAllActiveCampaigns();
        return { message: "Fetched all active campaigns" };
      }
    
    case "process":
      if (campaignId) {
        return await processDraftPosts(campaignId);
      } else {
        const campaigns = await storage.getActiveCampaigns();
        const results = [];
        for (const campaign of campaigns) {
          results.push({
            campaignId: campaign.id,
            result: await processDraftPosts(campaign.id),
          });
        }
        return results;
      }
    
    case "publish":
      return await publishScheduledPosts();
    
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}
