/** @type {import('next').NextConfig} */
const nextConfig = {
  // Statischer Export — Pflicht für GitHub Pages.
  output: "export",

  // Auf GitHub Pages läuft kein Image-Optimizer; Bilder werden 1:1 ausgeliefert.
  // Daher müssen alle <Image>-Komponenten width/height (oder fill) tragen.
  images: {
    unoptimized: true,
  },

  // Erzeugt /foo/index.html statt /foo.html, damit Direktaufrufe und Refreshs
  // unter statischem Hosting sauber auflösen.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
