import '../../chunks/page-ssr_BPegoxoD.mjs';
import { e as createAstro, f as createComponent, h as addAttribute, l as renderHead, i as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DRYa5zCf.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                                           */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://thisweekinalex.town");
async function getStaticPaths() {
  return [{ params: { path: "admin" } }];
}
const prerender = false;
const $$StudioRoute = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StudioRoute;
  return renderTemplate`<html lang="en" data-astro-cid-lhrw536y> <head><meta charset="UTF-8"><!--  Studio implements display cutouts CSS (The iPhone Notch ™ ) and needs \`viewport-fit=cover\` for it to work correctly --><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg width='512' height='512' viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='512' height='512' fill='%23F03E2F' rx='30' /%3E%3Cpath d='M161.527 136.723C161.527 179.76 187.738 205.443 240.388 219.095L296 232.283C345.687 243.852 376 272.775 376 319.514C376 341.727 369.162 360.931 357.538 375.971C357.538 329.232 333.607 303.78 276.171 288.74L221.47 276.246C177.709 266.065 143.977 242.464 143.977 191.56C143.977 170.505 150.359 151.994 161.527 136.723Z' fill='white' /%3E%3Cpath opacity='0.5' d='M323.35 308.176C347.054 323.679 357.538 345.197 357.538 376.202C337.709 401.654 303.293 416 262.724 416C194.575 416 146.484 381.756 136 322.753H201.641C210.074 350.056 232.41 362.551 262.268 362.551C298.735 362.32 322.895 342.652 323.35 308.176Z' fill='white' /%3E%3Cpath opacity='0.5' d='M195.715 200.816C172.923 186.007 161.527 165.183 161.527 136.954C180.672 111.503 213.493 96 253.835 96C323.35 96 363.692 133.252 373.721 185.776H310.359C303.293 165.183 285.971 148.986 254.291 148.986C220.33 148.986 197.311 169.116 195.715 200.816Z' fill='white' /%3E%3C/svg%3E%0A"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Sanity Studio</title>${renderHead()}</head> <body data-astro-cid-lhrw536y> ${renderComponent($$result, "StudioComponent", null, { "client:only": "react", "client:component-hydration": "only", "data-astro-cid-lhrw536y": true, "client:component-path": "/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/@sanity/astro/dist/studio/studio-component", "client:component-export": "StudioComponent" })} </body></html>`;
}, "/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/@sanity/astro/dist/studio/studio-route.astro", void 0);

const $$file = "/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/@sanity/astro/dist/studio/studio-route.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$StudioRoute,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
