import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://manuelaklenke.com';

const ROUTES = [
  '/about',
  '/portfolio',
  '/events',
  '/contact',
  '/privacy',
  '/imprint',
];

const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

for (const route of ROUTES) {
  const routeHtml = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${BASE_URL}${route}$2`
  );

  const dir = path.join(distDir, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), routeHtml);
  console.log(`✓ ${route}/index.html → canonical: ${BASE_URL}${route}`);
}

console.log('Canonical injection complete.');
