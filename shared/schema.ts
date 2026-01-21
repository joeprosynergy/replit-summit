import { pgTable, text, timestamp, varchar, pgEnum, jsonb, boolean, integer } from "drizzle-orm/pg-core";
import { z } from "zod";

export const appRoleEnum = pgEnum("app_role", ["admin", "editor"]);
export const pageStatusEnum = pgEnum("page_status", ["draft", "published", "archived"]);
export const userApprovalStatusEnum = pgEnum("user_approval_status", ["pending", "approved", "rejected"]);

export const pageContent = pgTable("page_content", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  heading: text("heading"),
  subheading: text("subheading"),
  tagline: text("tagline"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  ctaHeading: text("cta_heading"),
  ctaDescription: text("cta_description"),
  ctaButton: text("cta_button"),
  // CMS-first canonical fields
  layoutConfig: jsonb("layout_config"),
  isCanonical: boolean("is_canonical").default(false),
  templateType: varchar("template_type", { length: 50 }),
  status: pageStatusEnum("status").default("published"),
  seoConfig: jsonb("seo_config"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sectionContent = pgTable("section_content", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  pageId: text("page_id").references(() => pageContent.id, { onDelete: "cascade" }),
  pageSlug: varchar("page_slug", { length: 255 }).notNull(),
  sectionName: varchar("section_name", { length: 100 }).notNull(),
  content: jsonb("content").notNull(),
  // CMS-first section fields
  orderIndex: integer("order_index").default(0),
  sectionType: varchar("section_type", { length: 50 }),
  layoutConfig: jsonb("layout_config"),
  isVisible: boolean("is_visible").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  userId: text("user_id").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  displayName: varchar("display_name", { length: 255 }),
  approvalStatus: userApprovalStatusEnum("approval_status").default("pending"),
  approvedBy: text("approved_by"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userRoles = pgTable("user_roles", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  userId: text("user_id").notNull(),
  role: appRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPageContentSchema = z.object({
  slug: z.string(),
  heading: z.string().optional().nullable(),
  subheading: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  ctaHeading: z.string().optional().nullable(),
  ctaDescription: z.string().optional().nullable(),
  ctaButton: z.string().optional().nullable(),
  layoutConfig: z.record(z.any()).optional().nullable(),
  isCanonical: z.boolean().optional(),
  templateType: z.string().optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  seoConfig: z.record(z.any()).optional().nullable(),
});

export const insertSectionContentSchema = z.object({
  pageId: z.string().optional().nullable(),
  pageSlug: z.string(),
  sectionName: z.string(),
  content: z.record(z.any()),
  orderIndex: z.number().optional(),
  sectionType: z.string().optional().nullable(),
  layoutConfig: z.record(z.any()).optional().nullable(),
  isVisible: z.boolean().optional(),
});

export const insertProfileSchema = z.object({
  userId: z.string(),
  email: z.string(),
  displayName: z.string().optional(),
  approvalStatus: z.enum(["pending", "approved", "rejected"]).optional(),
});

export type UserApprovalStatus = "pending" | "approved" | "rejected";

export const insertUserRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["admin", "editor"]),
});

export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type PageContent = typeof pageContent.$inferSelect;

export type InsertSectionContent = z.infer<typeof insertSectionContentSchema>;
export type SectionContent = typeof sectionContent.$inferSelect;

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;

export type InsertUserRole = z.infer<typeof insertUserRoleSchema>;
export type UserRole = typeof userRoles.$inferSelect;

export type AppRole = "admin" | "editor";
export type PageStatus = "draft" | "published" | "archived";
