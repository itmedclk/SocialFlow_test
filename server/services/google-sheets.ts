import { google } from "googleapis";
import type { Campaign, Post } from "@shared/schema";
import { storage } from "../storage";

const DEFAULT_SHEET_NAME = "Posts";

export async function appendPostToSheet(
  post: Post,
  campaign: Campaign,
  captionOverride?: string | null,
): Promise<void> {
  if (!campaign.userId) {
    throw new Error("Campaign userId is required for Google Sheets logging");
  }

  const settings = await storage.getUserSettings(campaign.userId);
  if (!settings?.googleRefreshToken) {
    throw new Error("Google account is not connected");
  }
  if (!settings.googleClientId || !settings.googleClientSecret) {
    throw new Error("Google OAuth client credentials are missing");
  }
  if (!settings.googleSpreadsheetId) {
    throw new Error("Google Spreadsheet ID is missing");
  }

  const redirectUri =
    process.env.GOOGLE_OAUTH_REDIRECT_URI ||
    "https://social-flow-test.replit.app/api/google/oauth/callback";

  const auth = new google.auth.OAuth2(
    settings.googleClientId,
    settings.googleClientSecret,
    redirectUri,
  );
  auth.setCredentials({ refresh_token: settings.googleRefreshToken });

  const sheets = google.sheets({ version: "v4", auth });

  const caption = captionOverride || post.generatedCaption || "";
  const row = [
    new Date().toISOString(),
    post.id?.toString() || "",
    campaign.name || "",
    post.sourceTitle || "",
    post.sourceUrl || "",
    caption,
    post.imageUrl || "",
    post.imageCredit || "",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: settings.googleSpreadsheetId,
    range: `${DEFAULT_SHEET_NAME}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row],
    },
  });
}