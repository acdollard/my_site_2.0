import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_DRYa5zCf.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/","cacheDir":"file:///Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/.astro/","outDir":"file:///Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/dist/","srcDir":"file:///Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/src/","publicDir":"file:///Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/public/","buildClientDir":"file:///Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/dist/","buildServerDir":"file:///Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/studio-route.ClDjZkCl.css"},{"type":"inline","content":"body{margin:0;padding:0}\n"}],"routeData":{"type":"page","isIndex":false,"route":"/studio/[...params]","pattern":"^\\/studio(?:\\/(.*?))?\\/?$","segments":[[{"content":"studio","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@sanity/astro/dist/studio/studio-route.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}}],"site":"https://thisweekinalex.town","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/@sanity/astro/dist/studio/studio-route.astro",{"propagation":"none","containsHead":true}],["/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/src/pages/blog.astro",{"propagation":"none","containsHead":true}],["/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/src/pages/post/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/post/[slug]@_@astro":"pages/post/_slug_.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:node_modules/@sanity/astro/dist/studio/studio-route@_@astro":"pages/studio/_---params_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BDCZnuO4.mjs","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DKxCzl1_.mjs","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/@sanity/astro/dist/visual-editing/visual-editing-component":"_astro/visual-editing-component.DchqwQu6.js","@astrojs/react/client.js":"_astro/client.oPQ2CNZe.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/src/pages/blog.astro?astro&type=script&index=0&lang.ts":"_astro/blog.astro_astro_type_script_index_0_lang.BbsrdWGq.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/src/components/Welcome.astro?astro&type=script&index=0&lang.ts":"_astro/Welcome.astro_astro_type_script_index_0_lang.BbsrdWGq.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/resources.mjs":"_astro/resources.esWxvLuB.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/resources4.mjs":"_astro/resources4.Bbfw7BUj.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/resources2.mjs":"_astro/resources2.DquTew93.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/resources3.mjs":"_astro/resources3.8YRAi-O8.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/ViteDevServerStopped.mjs":"_astro/ViteDevServerStopped.k5M_trbA.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/@sanity/client/dist/_chunks-es/stegaEncodeSourceMap.js":"_astro/stegaEncodeSourceMap.DPgp_TsG.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/@sanity/ui/dist/_chunks-es/refractor.mjs":"_astro/refractor.BHca-E6G.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/resources5.mjs":"_astro/resources5.hKlzc9UN.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/index3.mjs":"_astro/index3.4_sQWSZ5.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/resources6.mjs":"_astro/resources6.BmTsiFky.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/PresentationToolGrantsCheck.mjs":"_astro/PresentationToolGrantsCheck.AJLrOwtr.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/BroadcastDisplayedDocument.mjs":"_astro/BroadcastDisplayedDocument.CqFeSgq_.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/index.mjs":"_astro/index.B2QuFFKC.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/index2.mjs":"_astro/index2.DhhBJL3M.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/QRCodeSVG.mjs":"_astro/QRCodeSVG.BKXU5SBS.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/LiveQueries.mjs":"_astro/LiveQueries.BMeJOqin.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/PostMessageDocuments.mjs":"_astro/PostMessageDocuments.hpOKPgUB.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/PostMessageRefreshMutations.mjs":"_astro/PostMessageRefreshMutations.BBO6VYue.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/PostMessagePerspective.mjs":"_astro/PostMessagePerspective.Bw4qYEc_.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/PostMessagePreviewSnapshots.mjs":"_astro/PostMessagePreviewSnapshots.Cj0_JdIV.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/PostMessageSchema.mjs":"_astro/PostMessageSchema.DzLRMA5m.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/sanity/lib/_chunks-es/PostMessageTelemetry.mjs":"_astro/PostMessageTelemetry.BETxg28k.js","/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/node_modules/@sanity/astro/dist/studio/studio-component":"_astro/studio-component.DHs0bJpY.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/src/pages/blog.astro?astro&type=script&index=0&lang.ts","const c=document.querySelectorAll(\".category-filter\"),n=document.getElementById(\"posts-grid\"),o=n?.getElementsByTagName(\"article\"),e=new Set;c.forEach(s=>{s.addEventListener(\"click\",()=>{const t=s.getAttribute(\"data-category-id\");e.has(t)?(e.delete(t),s.classList.remove(\"bg-indigo-600\",\"text-white\"),s.classList.add(\"bg-gray-100\",\"text-gray-800\")):(e.add(t),s.classList.remove(\"bg-gray-100\",\"text-gray-800\"),s.classList.add(\"bg-indigo-600\",\"text-white\")),o&&Array.from(o).forEach(a=>{const d=a.getAttribute(\"data-categories\")?.split(\",\")||[],g=e.size===0||d.some(i=>e.has(i));a.style.display=g?\"\":\"none\"})})});c.forEach(s=>{s.addEventListener(\"mouseenter\",()=>{s.classList.contains(\"bg-indigo-600\")||s.classList.add(\"bg-gray-200\")}),s.addEventListener(\"mouseleave\",()=>{s.classList.contains(\"bg-indigo-600\")||(s.classList.remove(\"bg-gray-200\"),s.classList.add(\"bg-gray-100\"))})});"],["/Users/alexanderdollard/Development/my_site_2.0/opposite-osiris/src/components/Welcome.astro?astro&type=script&index=0&lang.ts","const c=document.querySelectorAll(\".category-filter\"),n=document.getElementById(\"posts-grid\"),o=n?.getElementsByTagName(\"article\"),e=new Set;c.forEach(s=>{s.addEventListener(\"click\",()=>{const t=s.getAttribute(\"data-category-id\");e.has(t)?(e.delete(t),s.classList.remove(\"bg-indigo-600\",\"text-white\"),s.classList.add(\"bg-gray-100\",\"text-gray-800\")):(e.add(t),s.classList.remove(\"bg-gray-100\",\"text-gray-800\"),s.classList.add(\"bg-indigo-600\",\"text-white\")),o&&Array.from(o).forEach(a=>{const d=a.getAttribute(\"data-categories\")?.split(\",\")||[],g=e.size===0||d.some(i=>e.has(i));a.style.display=g?\"\":\"none\"})})});c.forEach(s=>{s.addEventListener(\"mouseenter\",()=>{s.classList.contains(\"bg-indigo-600\")||s.classList.add(\"bg-gray-200\")}),s.addEventListener(\"mouseleave\",()=>{s.classList.contains(\"bg-indigo-600\")||(s.classList.remove(\"bg-gray-200\"),s.classList.add(\"bg-gray-100\"))})});"]],"assets":["/_astro/studio-route.ClDjZkCl.css","/VintageDust_mobile.jpg","/background1.webp","/background1_dust-mobile.webp","/background1_dust-tablet.webp","/background1_dust.webp","/dust-mobile.jpg","/favicon.svg","/twat.svg","/_astro/BroadcastDisplayedDocument.CqFeSgq_.js","/_astro/DisplayedDocumentBroadcaster.Bfv8O0JG.js","/_astro/LiveQueries.BMeJOqin.js","/_astro/PostMessageDocuments.hpOKPgUB.js","/_astro/PostMessagePerspective.Bw4qYEc_.js","/_astro/PostMessagePreviewSnapshots.Cj0_JdIV.js","/_astro/PostMessageRefreshMutations.BBO6VYue.js","/_astro/PostMessageSchema.DzLRMA5m.js","/_astro/PostMessageTelemetry.BETxg28k.js","/_astro/PresentationToolGrantsCheck.AJLrOwtr.js","/_astro/QRCodeSVG.BKXU5SBS.js","/_astro/Refractor.CCOAaNC0.js","/_astro/ViteDevServerStopped.k5M_trbA.js","/_astro/browser.Dy4jV4n-.js","/_astro/client.DeJuI-cF.js","/_astro/client.oPQ2CNZe.js","/_astro/index.B2QuFFKC.js","/_astro/index.COPhuDSj.js","/_astro/index.DCQm31DJ.js","/_astro/index2.DhhBJL3M.js","/_astro/index3.4_sQWSZ5.js","/_astro/refractor.BHca-E6G.js","/_astro/resolveEditInfo.BFM-t18A.js","/_astro/resources.esWxvLuB.js","/_astro/resources2.DquTew93.js","/_astro/resources3.8YRAi-O8.js","/_astro/resources4.Bbfw7BUj.js","/_astro/resources5.hKlzc9UN.js","/_astro/resources6.BmTsiFky.js","/_astro/stegaEncodeSourceMap.DPgp_TsG.js","/_astro/studio-component.BxjUa9IJ.js","/_astro/studio-component.DHs0bJpY.js","/_astro/visual-editing-component.DchqwQu6.js","/about/index.html","/blog/index.html","/rss.xml","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"o6T6opdI/EpAum+tqiGdSQoA67GMK1UIH4V3liQTGrQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
