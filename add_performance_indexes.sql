-- Critical Performance Indexes for CMS-First Architecture
-- Run this in Supabase SQL Editor to speed up page queries

-- CRITICAL: Index on slug (used in EVERY page query)
CREATE INDEX IF NOT EXISTS idx_page_content_slug ON page_content(slug);

-- CRITICAL: Index on page_slug for section lookups
CREATE INDEX IF NOT EXISTS idx_section_content_page_slug ON section_content(page_slug);

-- CRITICAL: Index on section_name for faster section queries
CREATE INDEX IF NOT EXISTS idx_section_content_section_name ON section_content(page_id, section_name);

-- Improve query performance for visible sections only
CREATE INDEX IF NOT EXISTS idx_section_content_visible ON section_content(page_id, is_visible, order_index);

-- Analyze tables to update query planner statistics
ANALYZE page_content;
ANALYZE section_content;
