# MB Expert LLC Frontend

Next.js frontend for the MB Expert LLC website.

## Responsibilities

- render the public marketing site
- fetch content from Sanity
- keep layout and presentation separate from content editing

## Structure

- `app/layout.tsx` - root document shell
- `app/page.tsx` - homepage
- `app/services/page.tsx` - full services catalog
- `lib/sanity/client.ts` - Sanity client
- `lib/sanity/queries.ts` - GROQ queries and typed fetch helpers

## Local setup

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env.local` and set the Sanity project values.

