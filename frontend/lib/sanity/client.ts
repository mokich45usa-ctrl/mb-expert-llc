import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-04",
      useCdn: true,
    })
  : null;
