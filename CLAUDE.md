# Summit buildings website

The public site is https://summitbuildings.com. This repo is a Next.js App Router app on Vercel. React draws the pages. The product is the Next.js app, not a single-page app.

Read this file before an edit. A copy change stays inside the current page. Do not move a URL, a form, or the phone number while changing wording.

## Run locally

```sh
npm i
npm run dev
```

`npm run build` checks that the app still builds. `npm run lint` runs ESLint. The production build currently ignores TypeScript and ESLint failures inside `next build`. Do not flip those switches as part of a copy change.

## Where things live

Pages live under `app/(public)`.
Page copy comes from Supabase, with fallbacks in `data/defaults`.
A page file loads the CMS row, then falls back to the matching file in `data/defaults` when that row is empty. Edit the fallback when the page must still read correctly with no CMS row. Edit the CMS row when the live wording is already coming from Supabase.

Canonical product URLs are `/styles/{slug}`, defined in `shared/productStyleRoutes.ts`.
`/styles/{slug}` rewrites onto the older `/types/...` page. Do not add a second page component for a slug that already has a rewrite.

Admin screens live under `app/admin`. They are not public pages.

The homepage A/B test is paused in `middleware.ts` (`AB_ENABLED` is false). V1 is what visitors and crawlers get. Do not turn the test back on during a copy change.

## URLs the ads and old links use

Google Ads landing pages in use are `/farmington-mo` and `/traditional`.
`/farmington` 301s to `/farmington-mo`.
`/home` 301s to `/`.
Do not redirect `/barn`.
`/barn` is its own landing page. It is not the `/styles/barn` hub.

Other 301s live in `next.config.ts` and `shared/productStyleRoutes.ts`. Add a redirect there. Do not invent a second redirect in the page.

## Phone numbers and tracking

The phone swap is client-side only, in `lib/ads-dni.ts`.
The public number is 5737474700.
The ads number is 5737474052.
Do not write 5737474052 into server HTML.
The swap runs in the browser for an ads session. Server HTML, JSON-LD, and the defaults files keep the public number. The swap only rewrites 5737474700. Leave every other number alone.

Form events go through `/api/ghl-track`.
Phone clicks post to `/api/phone-click`.
`lib/tracking-params.ts` stores gclid and UTM values for those two calls. Do not drop those params while editing a form or a `tel:` link.

## Leave the running site alone unless asked

Do not deploy.
Do not run `npm run db:push`.
Do not change Google Ads.
Do not print or commit secrets.
Do not edit a file unless the person asked for that change.

Secrets stay in the local env file and in the host's env settings. Do not paste them into a page, a commit, or this file.
