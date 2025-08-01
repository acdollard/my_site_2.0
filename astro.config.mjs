// astro.config.mjs
import { defineConfig } from "astro/config";

import sanity from "@sanity/astro";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import { loadEnv } from "vite";
import netlify from "@astrojs/netlify";
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  site: "https://thisweekinalex.town", // Replace with your actual domain
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: false, // See note on using the CDN
      apiVersion: "2025-03-02", // insert the current date to access the latest version of the API
      studioBasePath: "/studio",
      stega: {
        studioUrl: "/studio",
      },
    }),
    react(),
    tailwind(),
  ],

  adapter: netlify(),
});
