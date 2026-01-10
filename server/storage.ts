import { 
  type PageContent, type InsertPageContent,
  type Profile, type InsertProfile,
  type UserRole, type InsertUserRole,
  type AppRole
} from "@shared/schema";

export interface IStorage {
  getPageContent(slug: string): Promise<PageContent | undefined>;
  upsertPageContent(data: InsertPageContent): Promise<PageContent>;
  
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(data: InsertProfile): Promise<Profile>;
  
  getUserRoles(userId: string): Promise<AppRole[]>;
  hasRole(userId: string, role: AppRole): Promise<boolean>;
  addUserRole(data: InsertUserRole): Promise<UserRole>;
}

export class MemStorage implements IStorage {
  private pageContents: Map<string, PageContent> = new Map();
  private profiles: Map<string, Profile> = new Map();
  private userRoles: Map<string, UserRole[]> = new Map();

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

  async getProfile(userId: string): Promise<Profile | undefined> {
    return this.profiles.get(userId);
  }

  async createProfile(data: InsertProfile): Promise<Profile> {
    const now = new Date();
    const profile: Profile = {
      id: crypto.randomUUID(),
      userId: data.userId,
      email: data.email,
      createdAt: now,
      updatedAt: now,
    };
    this.profiles.set(data.userId, profile);
    return profile;
  }

  async getUserRoles(userId: string): Promise<AppRole[]> {
    const roles = this.userRoles.get(userId) || [];
    return roles.map(r => r.role);
  }

  async hasRole(userId: string, role: AppRole): Promise<boolean> {
    const roles = await this.getUserRoles(userId);
    return roles.includes(role);
  }

  async addUserRole(data: InsertUserRole): Promise<UserRole> {
    const userRole: UserRole = {
      id: crypto.randomUUID(),
      userId: data.userId,
      role: data.role,
      createdAt: new Date(),
    };
    const existing = this.userRoles.get(data.userId) || [];
    existing.push(userRole);
    this.userRoles.set(data.userId, existing);
    return userRole;
  }
}

export const storage = new MemStorage();
