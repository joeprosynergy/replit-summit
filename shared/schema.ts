import { pgTable, text, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";
import { z } from "zod";

export const appRoleEnum = pgEnum("app_role", ["admin", "editor"]);

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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  userId: text("user_id").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
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
});

export const insertProfileSchema = z.object({
  userId: z.string(),
  email: z.string(),
});

export const insertUserRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["admin", "editor"]),
});

export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type PageContent = typeof pageContent.$inferSelect;

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;

export type InsertUserRole = z.infer<typeof insertUserRoleSchema>;
export type UserRole = typeof userRoles.$inferSelect;

export type AppRole = "admin" | "editor";
