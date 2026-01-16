const fs = require('fs');
const path = require('path');

const apiBaseUrl = process.env.API_BASE_URL || '';
const baseDir = path.join(__dirname, '..', 'dist', 'fusion-angular-tailwind-starter');
const candidatePaths = [
  path.join(baseDir, 'browser', 'env.js'),
  path.join(baseDir, 'env.js'),
];
const outputPath = candidatePaths.find((candidate) => fs.existsSync(candidate));

if (!outputPath) {
  console.error(`env.js not found at ${candidatePaths.join(' or ')}`);
  process.exit(1);
}

const contents = fs.readFileSync(outputPath, 'utf8');
const updated = contents.replace('__API_BASE_URL__', apiBaseUrl);
fs.writeFileSync(outputPath, updated, 'utf8');
