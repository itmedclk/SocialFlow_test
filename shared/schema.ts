import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, boolean, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ============================================
// Campaigns Table
// ============================================
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  topic: text("topic").notNull(),
  scheduleCron: text("schedule_cron"),
  rssUrls: jsonb("rss_urls").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  aiPrompt: text("ai_prompt"),
  imageKeywords: jsonb("image_keywords").$type<string[]>().default(sql`'[]'::jsonb`),
  imageProviders: jsonb("image_providers").$type<Array<{type: string, value: string}>>().default(sql`'[]'::jsonb`),
  targetPlatforms: jsonb("target_platforms").$type<string[]>().default(sql`'[]'::jsonb`),
  safetyForbiddenTerms: text("safety_forbidden_terms"),
  safetyMaxLength: integer("safety_max_length").default(2000),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;

// ============================================
// Posts Table
// ============================================
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").notNull().references(() => campaigns.id, { onDelete: 'cascade' }),
  sourceTitle: text("source_title").notNull(),
  sourceUrl: text("source_url").notNull(),
  sourceGuid: text("source_guid").notNull(),
  sourceSnippet: text("source_snippet"),
  generatedCaption: text("generated_caption"),
  imageUrl: text("image_url"),
  imageCredit: text("image_credit"),
  status: text("status").$type<'draft' | 'approved' | 'scheduled' | 'posted' | 'failed'>().notNull().default('draft'),
  scheduledFor: timestamp("scheduled_for"),
  postedAt: timestamp("posted_at"),
  retryCount: integer("retry_count").default(0),
  failureReason: text("failure_reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

// ============================================
// Logs Table
// ============================================
export const logs = pgTable("logs", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => campaigns.id, { onDelete: 'set null' }),
  postId: integer("post_id").references(() => posts.id, { onDelete: 'set null' }),
  level: text("level").$type<'info' | 'warning' | 'error'>().notNull(),
  message: text("message").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLogSchema = createInsertSchema(logs).omit({
  id: true,
  createdAt: true,
});

export type InsertLog = z.infer<typeof insertLogSchema>;
export type Log = typeof logs.$inferSelect;

// ============================================
// Users Table (for future authentication)
// ============================================
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
