if (!self.define) {
  let e,
    a = {};
  const s = (s, c) => (
    (s = new URL(s + ".js", c).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[n]) return;
    let t = {};
    const o = (e) => s(e, n),
      r = { module: { uri: n }, exports: t, require: o };
    a[n] = Promise.all(c.map((e) => r[e] || o(e))).then((e) => (i(...e), t));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "f84bd229f35f1d6caeb3867f252d2e47",
        },
        {
          url: "/_next/static/chunks/104-20ebf8f2fbcd5a14.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/13-213cf3ee2c54675f.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/2-6c31655701eaf2c8.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/200-76f34a2b4fb77f45.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/233-d7eefb9ee582d3d8.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/290-bf58bbb20dc9f27b.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/30-0fea56f4c6d1fc1c.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/352-4261a1ea2b889543.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/406-28a64e142c2d0caa.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/408-a10533dc79d7acd4.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/497-7b25555cebfd86c9.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/4bd1b696-af87a556c75a7f4e.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/613-4ae8b6ed2546b2cc.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/684-43d5571cc2c5b9fe.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/723-cdf6106a52c71743.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-afd1200dc6a25822.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/activity/page-cd0ac9c2605fed7e.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/analysis/%5Bid%5D/page-ea95eb4fe4fea5a2.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/analysis/page-3d848809c2ae3895.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/dashboard/add-meal/page-4c64a978e7635cfd.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/dashboard/add/page-f1cf58bfd501c912.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/dashboard/page-adad9ca4b5d29ec2.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/goals/page-021fae4e64d284f4.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/layout-e9aa8ac64aeddd3e.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/onboarding/page-8ee8f44d8a278743.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/page-86292da1d428ff20.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/app/profile/page-03aa596c9e9962bc.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/framework-75d8b6119e7601c4.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/main-3b42bdcd78516e4a.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/main-app-b0ea03d47a967d3e.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/pages/_app-504ee161b4ca9b9a.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/pages/_error-fb8d4d72397b68f5.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-ac55ac32853c339c.js",
          revision: "yo1l8cgYlPaLcvgSE_09K",
        },
        {
          url: "/_next/static/css/4d42ef37f8b33601.css",
          revision: "4d42ef37f8b33601",
        },
        {
          url: "/_next/static/media/26a46d62cd723877-s.woff2",
          revision: "befd9c0fdfa3d8a645d5f95717ed6420",
        },
        {
          url: "/_next/static/media/55c55f0601d81cf3-s.woff2",
          revision: "43828e14271c77b87e3ed582dbff9f74",
        },
        {
          url: "/_next/static/media/581909926a08bbc8-s.woff2",
          revision: "f0b86e7c24f455280b8df606b89af891",
        },
        {
          url: "/_next/static/media/6d93bde91c0c2823-s.woff2",
          revision: "621a07228c8ccbfd647918f1021b4868",
        },
        {
          url: "/_next/static/media/97e0cb1ae144a2a9-s.woff2",
          revision: "e360c61c5bd8d90639fd4503c829c2dc",
        },
        {
          url: "/_next/static/media/a34f9d1faa5f3315-s.p.woff2",
          revision: "d4fe31e6a2aebc06b8d6e558c9141119",
        },
        {
          url: "/_next/static/media/df0a9ae256c0569c-s.woff2",
          revision: "d54db44de5ccb18886ece2fda72bdfe0",
        },
        {
          url: "/_next/static/yo1l8cgYlPaLcvgSE_09K/_buildManifest.js",
          revision: "b64cdc4473d103e11e8a1881b7b9688c",
        },
        {
          url: "/_next/static/yo1l8cgYlPaLcvgSE_09K/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/images/article-1.jpg",
          revision: "8bd0420bc50c3a9c1ddc12d54085383a",
        },
        {
          url: "/images/article-2.jpg",
          revision: "96e211617a62e4b61f5823f51082ed23",
        },
        {
          url: "/images/article-3.jpg",
          revision: "9efbe31c45a298d6a52e5aecf01e0b8d",
        },
        {
          url: "/images/challenges.jpg",
          revision: "179baaf9e72f6f435cc0d91706eaf0da",
        },
        {
          url: "/images/daily-goals.jpg",
          revision: "cbc624f7241f16d33068012b4de45d30",
        },
        {
          url: "/images/dietician-1.jpg",
          revision: "d77756efbb0de642c9e4e5176ec75f54",
        },
        {
          url: "/images/dietician-2.jpg",
          revision: "d77756efbb0de642c9e4e5176ec75f54",
        },
        {
          url: "/images/food-1.jpg",
          revision: "8bd0420bc50c3a9c1ddc12d54085383a",
        },
        {
          url: "/images/food-2.jpg",
          revision: "8aecfb5bab29edd51abbde3a6552e3c0",
        },
        {
          url: "/images/hero-fitness.jpg",
          revision: "f5a362eae17eba0a2536f3ae814cd826",
        },
        {
          url: "/images/onboarding-1.jpg",
          revision: "99610ba0c67c1b5ac7607b25b05ef01d",
        },
        {
          url: "/images/onboarding-2.jpg",
          revision: "2ba35ce1313ff2ff90ebddde7267e76e",
        },
        {
          url: "/images/onboarding-3.jpg",
          revision: "68aec2fccea1d0f755b537b033f22d95",
        },
        {
          url: "/images/onboarding-4.jpg",
          revision: "9b48f53d7c5d5e607450de1d9e5866f1",
        },
        {
          url: "/images/onboarding-5.jpg",
          revision: "a2fa688f9dc488b5c8ed6756728d3a0b",
        },
        {
          url: "/images/recent-activity.jpg",
          revision: "c7eae9bf8e710064bc50ff3953bee310",
        },
        {
          url: "/images/tip-1.jpg",
          revision: "0aedd199f1e56827894d2e01ff777104",
        },
        {
          url: "/images/tip-2.jpg",
          revision: "dcff256422fbf42fe1512f6eff4695c6",
        },
        {
          url: "/images/tip-3.jpg",
          revision: "d57321aa747bbb7c901af63f473b9c62",
        },
        { url: "/manifest.json", revision: "b49f3c69449cab5cbd14cafc20880c91" },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: a,
              event: s,
              state: c,
            }) =>
              a && "opaqueredirect" === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: "OK",
                    headers: a.headers,
                  })
                : a,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith("/api/auth/") && !!a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
