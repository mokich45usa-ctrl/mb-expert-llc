import { defineConfig } from "sanity";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "mb-expert-llc",
  title: "MB Expert LLC Studio",
  projectId: "3r3gcxe4",
  dataset: "production",
  schema: {
    types: schemaTypes,
  },
});
