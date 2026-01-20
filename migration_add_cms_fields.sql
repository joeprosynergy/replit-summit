-- Migration: Add CMS-first architecture fields to page_content and section_content tables
-- Run this in Supabase SQL Editor

-- Add new columns to page_content table
ALTER TABLE page_content
ADD COLUMN IF NOT EXISTS layout_config JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS is_canonical BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS template_type VARCHAR(50) DEFAULT 'standard',
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft',
ADD COLUMN IF NOT EXISTS seo_config JSONB DEFAULT '{}'::jsonb;

-- Add new columns to section_content table
ALTER TABLE section_content
ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS section_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS layout_config JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;

-- Create index on is_canonical for faster queries
CREATE INDEX IF NOT EXISTS idx_page_content_is_canonical ON page_content(is_canonical);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_page_content_status ON page_content(status);

-- Create index on section order for sorting
CREATE INDEX IF NOT EXISTS idx_section_content_order ON section_content(page_id, order_index);

-- Add comments for documentation
COMMENT ON COLUMN page_content.layout_config IS 'JSON configuration for page layout and theme settings';
COMMENT ON COLUMN page_content.is_canonical IS 'True if this page has been fully migrated to CMS with all defaults extracted';
COMMENT ON COLUMN page_content.template_type IS 'Template identifier for rendering (e.g., product-detail, category, content)';
COMMENT ON COLUMN page_content.status IS 'Page status: draft, published, or archived';
COMMENT ON COLUMN page_content.seo_config IS 'SEO metadata including meta tags, og tags, schema.org, etc.';

COMMENT ON COLUMN section_content.order_index IS 'Display order of sections within a page';
COMMENT ON COLUMN section_content.section_type IS 'Type identifier for the section (e.g., hero, features, gallery)';
COMMENT ON COLUMN section_content.layout_config IS 'JSON configuration for section-specific layout';
COMMENT ON COLUMN section_content.is_visible IS 'Whether this section should be displayed';
