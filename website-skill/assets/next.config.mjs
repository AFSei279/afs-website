/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — required for GitHub Pages, since GH Pages serves no server code.
  output: "export",

  // Static export means the built-in next/image optimizer cannot run on demand.
  // Every <Image> still works, but receives the original file unprocessed.
  // Always provide width/height (or fill) on every <Image> as a result.
  images: {
    unoptimized: true,
  },

  // Produce /foo/index.html instead of /foo.html so that direct visits and
  // page refreshes resolve cleanly under static hosting.
  trailingSlash: true,

  // If the site is deployed to a project page like <user>.github.io/<repo>/
  // instead of a root-level custom domain, set basePath here:
  //   basePath: "/repo-name",
  //   assetPrefix: "/repo-name/",
  // For afs-ta.com at the apex, leave both unset.

  reactStrictMode: true,
};

export default nextConfig;
