# MB Expert LLC Sanity Studio

Sanity content model for the MB Expert LLC website.

## Document types

- `siteSettings` - brand, contact, and CTA values
- `homePage` - homepage content and section data
- `servicesPage` - full categorized services catalog

## Editing rules

- keep images optional but recommended for hero and featured sections
- keep text fields short and business-focused
- avoid nested structures that the client does not need to touch

## Local setup

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env` and set:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`

