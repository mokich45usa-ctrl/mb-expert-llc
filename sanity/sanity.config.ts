import { defineConfig } from "sanity";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "mb-expert-llc",
  title: "MB Expert LLC Studio",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  schema: {
    types: schemaTypes,
  },
});

