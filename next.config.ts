import type { NextConfig } from "next";

/**
 * Static export, deliberately.
 *
 * Every page is pre-rendered to plain HTML at build time, which means the same
 * `out/` directory deploys unchanged to GitHub Pages, Cloudflare Pages, Netlify
 * and Vercel. No server, nothing to patch, no host lock-in — so moving the site
 * later costs one DNS change.
 *
 * Trade-offs accepted: no API routes, no ISR, no on-demand image optimization.
 * A content site needs none of them. If that ever changes, deleting the
 * `output` line turns this back into a full server-rendered Next app.
 */
const nextConfig: NextConfig = {
  output: "export",

  // Static hosts resolve /writing/ to /writing/index.html far more reliably
  // than they resolve /writing.
  trailingSlash: true,

  // Required by `output: "export"` — the optimizer needs a running server.
  images: { unoptimized: true },

  // Only needed if this is ever served from a repo subpath
  // (e.g. user.github.io/personal-site). Empty for a custom domain.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
};

export default nextConfig;
