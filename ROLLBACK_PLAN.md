# CMS-First Architecture Rollback Plan

This document describes rollback strategies for the CMS-first architecture migration.

## Overview

The migration introduces several layers that can be independently rolled back:
1. Database schema changes
2. Code splitting configuration
3. CMS-first content loading
4. Lazy-loaded admin components
5. Individual page refactors

## Emergency Rollback Procedures

### Level 1: Feature Flag Rollback (Immediate)

**Use when:** CMS service is completely unavailable and fallbacks aren't working.

**Steps:**
1. Add feature flag to environment variables:
   ```env
   VITE_DISABLE_CMS_FIRST=true
   ```

2. Update main entry point to check flag:
   ```typescript
   // In useCMSContent.ts or cmsFallback.ts
   const CMS_ENABLED = import.meta.env.VITE_DISABLE_CMS_FIRST !== 'true';
   
   if (!CMS_ENABLED) {
     // Skip CMS fetching, use defaults immediately
     return { data: defaults, source: 'defaults' };
   }
   ```

3. Deploy immediately (no code changes needed, just env var)

**Rollback time:** ~5 minutes  
**Impact:** Site continues working with default content

### Level 2: Per-Page Rollback (Selective)

**Use when:** Specific pages have issues after refactoring.

**Steps:**
1. Identify problematic page (e.g., EconomyShed)

2. Revert page component to previous version from Git:
   ```bash
   git checkout HEAD~1 -- client/src/pages/EconomyShed.tsx
   ```

3. Keep new infrastructure in place (other pages unaffected)

4. Deploy

**Rollback time:** ~15 minutes  
**Impact:** Single page uses old pattern, rest use new architecture

### Level 3: Bundle Config Rollback (Code Splitting)

**Use when:** Bundle splitting causes loading issues or performance problems.

**Steps:**
1. Revert vite.config.ts:
   ```typescript
   // Remove manualChunks configuration
   build: {
     outDir: path.resolve(__dirname, "dist/public"),
     emptyOutDir: true,
     // Remove rollupOptions
   }
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

3. Deploy

**Rollback time:** ~30 minutes (includes build time)  
**Impact:** All code bundled together (larger bundle), but functional

### Level 4: Complete Architecture Rollback (Full)

**Use when:** Multiple components failing, architecture fundamentally flawed.

**Steps:**
1. Revert to specific commit before migration started:
   ```bash
   git log --oneline --all | grep "CMS-first"
   # Find commit hash before migration
   git revert <commit-hash>..HEAD
   ```

2. Review and resolve conflicts

3. Rebuild and test:
   ```bash
   npm run build
   npm run start
   ```

4. Deploy with full testing

**Rollback time:** ~2-4 hours  
**Impact:** Complete reversion to previous architecture

## Gradual Rollback Strategy

For less urgent issues, use a gradual approach:

### Phase 1: Stop New Migrations
- Pause refactoring of remaining pages
- Keep already-refactored pages as-is
- Monitor for issues

### Phase 2: Analyze Issues
- Use Performance Monitor to identify problems
- Check browser console for errors
- Review CMS health status
- Analyze bundle sizes

### Phase 3: Selective Fixes
- Revert specific problematic pages
- Keep working pages on new architecture
- Continue monitoring

### Phase 4: Decision Point
- If fixes work: Continue migration with caution
- If issues persist: Consider full rollback

## Monitoring & Detection

### Automatic Alerts

Set up monitoring for:

1. **CMS Health:**
   ```typescript
   // Alert if CMS consecutiveFailures > 5
   if (cmsHealth.consecutiveFailures > 5) {
     alert('CMS service critically degraded');
   }
   ```

2. **Bundle Size:**
   ```bash
   # In CI/CD pipeline
   BUNDLE_SIZE=$(du -sk dist/public/assets/index-*.js | cut -f1)
   if [ $BUNDLE_SIZE -gt 600 ]; then
     echo "WARNING: Bundle size exceeded 600KB"
   fi
   ```

3. **Performance Metrics:**
   ```typescript
   // Alert if FCP > 3000ms for multiple users
   if (performanceMetrics.fcp > 3000) {
     logWarning('Slow FCP detected', { fcp: performanceMetrics.fcp });
   }
   ```

4. **Error Rate:**
   - Track JavaScript errors in production
   - Alert if error rate spikes > 5%

### Manual Checks

**Daily (during migration period):**
- [ ] Check Admin Dashboard Performance Monitor
- [ ] Verify CMS health status
- [ ] Review bundle analysis report
- [ ] Test random pages as public user
- [ ] Test admin editing functionality

**Weekly:**
- [ ] Full regression test of all migrated pages
- [ ] Performance benchmarking (Lighthouse)
- [ ] Database query performance review
- [ ] Cache hit rate analysis

## Database Rollback

### Schema Changes

Database schema changes are **forward-compatible** - old code can work with new schema:

**New fields added:**
- `layout_config` (JSONB) - nullable, ignored by old code
- `is_canonical` (BOOLEAN) - defaults to false
- `template_type` (VARCHAR) - nullable
- `status` (ENUM) - defaults to 'published'
- `seo_config` (JSONB) - nullable

**No fields removed** - full backward compatibility maintained.

**If schema rollback needed:**
```sql
-- Only run if absolutely necessary
ALTER TABLE page_content DROP COLUMN IF EXISTS layout_config;
ALTER TABLE page_content DROP COLUMN IF EXISTS is_canonical;
ALTER TABLE page_content DROP COLUMN IF EXISTS template_type;
ALTER TABLE page_content DROP COLUMN IF EXISTS status;
ALTER TABLE page_content DROP COLUMN IF EXISTS seo_config;

ALTER TABLE section_content DROP COLUMN IF EXISTS order_index;
ALTER TABLE section_content DROP COLUMN IF EXISTS section_type;
ALTER TABLE section_content DROP COLUMN IF EXISTS layout_config;
ALTER TABLE section_content DROP COLUMN IF EXISTS is_visible;
```

**Note:** Database rollback not usually necessary due to forward compatibility.

## Content Rollback

### CMS Content Issues

**Scenario:** Canonicalized content is incorrect or corrupted.

**Solution:**
1. Mark page as non-canonical:
   ```sql
   UPDATE page_content 
   SET is_canonical = false 
   WHERE slug = 'problem-page';
   ```

2. Code automatically falls back to defaults

3. Fix content in CMS, then re-canonicalize:
   ```sql
   UPDATE page_content 
   SET is_canonical = true 
   WHERE slug = 'problem-page';
   ```

### Cache Issues

**Scenario:** Stale content being served from cache.

**Solution:**
1. Clear specific page cache:
   ```typescript
   CMSFallbackManager.clearCache('page-slug');
   ```

2. Or clear all cache:
   ```typescript
   CMSFallbackManager.clearAll();
   ```

3. Or via Admin Dashboard:
   - Go to Performance Monitor
   - Click "Clear All Cache"

## Testing Before Rollback

Before initiating rollback, verify the issue:

### 1. Reproduce in Multiple Browsers
- Chrome
- Firefox
- Safari
- Edge

### 2. Check Different User Types
- Public user (not logged in)
- Admin user (logged in)
- Different network conditions (3G, 4G, WiFi)

### 3. Verify Not Configuration Issue
- Check environment variables
- Verify database connection
- Check Supabase RLS policies
- Review server logs

### 4. Test Fallback Mechanisms
- Disconnect from network
- Block Supabase API calls
- Verify default content loads

## Communication Plan

### Internal Team
1. **Alert:** Immediate Slack/Discord message
2. **Assessment:** 15-minute evaluation call
3. **Decision:** Go/no-go on rollback
4. **Execution:** Implement rollback
5. **Verification:** Test and confirm
6. **Post-mortem:** Document what happened

### External (if needed)
1. **Status page update:** "Investigating performance issues"
2. **During rollback:** "Implementing fixes"
3. **After rollback:** "Issue resolved"
4. **Never mention:** Specifics about architecture or rollback

## Post-Rollback Actions

After any rollback:

1. **Document Issue:**
   - What went wrong
   - Why it went wrong
   - What was rolled back
   - How long it took

2. **Root Cause Analysis:**
   - Technical investigation
   - Identify prevention strategies
   - Update tests/monitoring

3. **Update Plan:**
   - Revise migration strategy
   - Add safety checks
   - Improve testing

4. **Team Debrief:**
   - What went well
   - What could be improved
   - Action items

## Rollback Decision Matrix

| Severity | Criteria | Rollback Level | Decision Time |
|----------|----------|----------------|---------------|
| **Critical** | Site completely down | Level 4 (Full) | Immediate |
| **High** | Multiple pages broken | Level 3 (Bundle) | 15 minutes |
| **Medium** | Single page issues | Level 2 (Per-page) | 30 minutes |
| **Low** | Performance degraded | Level 1 (Feature flag) | 1 hour |
| **Info** | Minor issues | Monitor only | No rollback |

## Prevention Strategies

To minimize need for rollbacks:

1. **Gradual Rollout:**
   - Migrate 5 pages at a time
   - Test thoroughly between batches
   - Monitor for 24-48 hours before continuing

2. **Canary Deployment:**
   - Deploy to 10% of traffic first
   - Monitor metrics
   - Gradually increase to 100%

3. **Feature Flags:**
   - Use flags for all major changes
   - Easy enable/disable without deployment
   - Per-page or per-feature granularity

4. **Comprehensive Testing:**
   - Automated tests for all refactored pages
   - Visual regression tests
   - Performance benchmarks
   - Load testing

5. **Monitoring:**
   - Real-time performance metrics
   - Error tracking (Sentry, etc.)
   - User session recording
   - Bundle size tracking

## Contact Information

**During Migration Period:**
- Primary: [Lead Developer]
- Backup: [Senior Developer]
- Database: [DBA/DevOps]
- On-call: [Rotation schedule]

**Escalation Path:**
1. Developer notices issue
2. Alert team lead
3. Emergency call if Critical/High
4. Execute appropriate rollback level
5. Notify stakeholders

## Checklist: Before Declaring Rollback Complete

- [ ] Site is functional for public users
- [ ] Admin functionality works
- [ ] No console errors on key pages
- [ ] Performance metrics acceptable
- [ ] CMS health status normal
- [ ] Database queries performant
- [ ] All stakeholders notified
- [ ] Post-mortem scheduled
- [ ] Documentation updated

## Version History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-15 | 1.0 | Initial rollback plan | Migration Team |

## Additional Resources

- [REFACTORING_GUIDE.md](./REFACTORING_GUIDE.md) - How to refactor pages
- [Performance Monitor](Admin Dashboard → Performance Monitor) - Real-time metrics
- [Git History](git log --oneline) - Commit history for rollbacks
- [Bundle Analyzer](npm run build && npx vite-bundle-analyzer) - Bundle analysis
