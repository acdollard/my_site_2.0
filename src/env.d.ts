// ./src/env.d.ts
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
/// <reference types="@astrojs/tailwind/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}