# PerksNest Bug Fix Sprint — 16 Issues

Fix ALL issues below in the React/TypeScript SPA. Source is in `src/`. Deploy info: this is a Vite React app.

## Issue 15: Navbar Design Inconsistency
- Ensure a SINGLE consistent Navbar/Header component renders the same across ALL routes
- Check Header.tsx, MegaMenuHeader.tsx — unify them
- Same styling, spacing, element visibility on every page

## Issue 16: Solutions Dropdown Not Working on Homepage
- On homepage (/), clicking "Solutions" redirects to /deals instead of showing dropdown
- Find the Solutions nav item — remove any href="/deals" that overrides the dropdown toggle
- Must show dropdown flyout on ALL pages including homepage

## Issue 17: "Get Started" Button Routing
- Hero section "Get started →" button should:
  - If logged in → route to /deals
  - If NOT logged in → route to /signup

## Issue 18: "Sign Up with Google" Auth State
- Hide "Sign up with Google" button when user IS logged in
- Show it only when NOT logged in
- Check all instances across the app

## Issue 19: "Most Popular Deals" Section
- Fix design inconsistency — all deal cards must use same shared component with consistent styling
- Fix broken CTA buttons — they should route to /deals/[slug]

## Issue 20: Deal Detail Routes Broken
- /deals/[slug] shows blank page or 404
- Fix routing config + data fetching + error handling for deal detail pages

## Issue 21: Sub-Category Filtering
- Sub-categories show parent category deals instead of filtered results
- Fix: filter by sub-category ID, not parent category

## Issue 22: Scroll-to-Top on Navigation
- Add ScrollToTop component that calls window.scrollTo(0, 0) on route change
- Apply to all route navigations

## Issue 23: Remove White Label from Homepage Pricing
- Remove "White Label Solution" card from homepage pricing section
- Keep it consistent with /pricing page

## Issue 24: Bottom CTA Buttons
- "Get started →" → route to /signup (or /deals if logged in)
- "Talk to sales" → href="mailto:sales@perksnest.co?subject=Sales Inquiry"

## Issue 25: Hide Search Bar on Deals Page
- Hide navbar search bar when on /deals route (deals page has its own search)

## Issue 26: Edit Profile Button
- Make "Edit Profile" button in user dashboard functional
- Open inline edit form or navigate to /profile/edit

## Issue 27: Partner Portal "Download Report" Button
- White text on white background — fix colors to be visible

## Issue 28: Admin Portal Backend (AUDIT ONLY)
- DO NOT build a full backend. Just audit admin pages and list what API endpoints would be needed.
- Add TODO comments in the code where API calls should go.

## Issue 29: Ticket System (STUB ONLY)
- DO NOT build full ticket system. Add UI stubs with "Coming Soon" messages.
- Add TODO comments for future backend integration.

## Issue 30: Add 41 Startup Deals
Add these deals to the deals data file (find where deals are defined — likely in src/data/):

1. Google Cloud — Up to $350,000 credits — https://cloud.google.com/startup
2. Cloudflare — Up to $250,000 credits — https://www.cloudflare.com/forstartups/
3. Microsoft — Up to $150,000 Azure credits — https://foundershub.startups.microsoft.com/
4. Amazon Web Services — Up to $100,000 credits — https://aws.amazon.com/activate/
5. Digital Ocean — Up to $100,000 credits — https://www.digitalocean.com/hatch
6. OVHCloud — Up to €100,000 credits — https://startup.ovhcloud.com/
7. Vercel — Varies by Partner — https://vercel.com/startups
8. Anthropic — $25,000 Claude API credits — https://www.anthropic.com/startups
9. Perplexity AI — $5,000 API credits — https://www.perplexity.ai/hub/blog/introducing-the-perplexity-startup-program
10. Eleven Labs — $4,000 (12 months scale tier) — https://elevenlabs.io/startup-grants
11. OpenAI — Up to $2,500 API credits — https://ramp.com/rewards/openai
12. MongoDB — Up to $20,000 Atlas credits — https://www.mongodb.com/startups
13. Couchbase — $12,750 Capella credits — https://aws.amazon.com/startups/offers
14. Supabase — $300 credits — https://supabase.com/partners/integrations
15. PlanetScale — Varies — https://planetscale.com/startups
16. Mixpanel — $50,000 benefits — https://mixpanel.com/startups
17. PostHog — $50,000 benefits — https://posthog.com/startups
18. Twilio Segment — $25,000 benefits — https://segment.com/industry/startups/
19. Amplitude — 1 year free — https://amplitude.com/startups
20. Datadog — 1 year free — https://www.datadoghq.com/partner/datadog-for-startups/
21. Sentry — Free tier + discounts — https://sentry.io/for/startups/
22. Retool — Up to $60,000 benefits — https://retool.com/startups
23. Algolia — $10,000 credits — https://www.algolia.com/startups/
24. Notion — Up to $1,000 (6 months free) — https://www.notion.so/startups
25. Miro — Up to $1,000 benefits — https://miro.com/startups/
26. GitHub — 20 seats free — https://github.com/enterprise/startups
27. Linear — Up to 6 months free — https://linear.app/startups
28. Atlassian — Free/Discounted — https://www.atlassian.com/software/startups
29. Twilio — $500 benefits — https://www.twilio.com/startups
30. Intercom — Up to 95% off — https://www.intercom.com/early-stage
31. HubSpot — Up to 90% off — https://www.hubspot.com/startups
32. Zendesk — 6 months free — https://www.zendesk.com/startups/
33. Figma — $1,000 benefits — https://www.figma.com/startups/
34. Canva — Free tier + discounts — https://www.canva.com/teams/
35. Freshworks — Up to $10,000 — https://www.freshworks.com/startups/
36. Stripe — $150 off + perks — https://stripe.com/atlas
37. Dropbox — 40-90% off — https://www.dropbox.com/startups
38. Zoho — 1 year free — https://www.zoho.com/one/startups/
39. Brex — Exclusive deals — https://www.brex.com/startups
40. Ramp — Extensive deals — https://ramp.com/rewards
41. Gusto — Discounted pricing — https://gusto.com/partners

Categorize them appropriately (cloud, ai, analytics, dev-tools, design, finance, communication, etc.)
Set isFree=true for free-tier deals. Use the service's favicon as logo placeholder: `https://www.google.com/s2/favicons?domain=DOMAIN&sz=128`

## IMPORTANT RULES
- Do NOT break existing functionality
- Test that the app builds without errors after each major change
- Run `npm run build` at the end to verify
- Commit changes with descriptive messages
