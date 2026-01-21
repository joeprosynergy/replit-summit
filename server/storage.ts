import { type PageContent, type InsertPageContent } from "@shared/schema";

export interface IStorage {
  getPageContent(slug: string): Promise<PageContent | undefined>;
  upsertPageContent(data: InsertPageContent): Promise<PageContent>;
}

export class MemStorage implements IStorage {
  private pageContents: Map<string, PageContent> = new Map();

  async getPageContent(slug: string): Promise<PageContent | undefined> {
    return this.pageContents.get(slug);
  }

  async upsertPageContent(data: InsertPageContent): Promise<PageContent> {
    const existing = this.pageContents.get(data.slug);
    const now = new Date();
    const content: PageContent = {
      id: existing?.id || crypto.randomUUID(),
      slug: data.slug,
      heading: data.heading ?? null,
      subheading: data.subheading ?? null,
      tagline: data.tagline ?? null,
      metaTitle: data.metaTitle ?? null,
      metaDescription: data.metaDescription ?? null,
      ctaHeading: data.ctaHeading ?? null,
      ctaDescription: data.ctaDescription ?? null,
      ctaButton: data.ctaButton ?? null,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };
    this.pageContents.set(data.slug, content);
    return content;
  }
}

export const storage = new MemStorage();
