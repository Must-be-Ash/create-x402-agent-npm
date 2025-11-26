#!/usr/bin/env node

/**
 * This script prepares the template directory by copying files from the parent project.
 * Run this before publishing to npm.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..', '..');
const templateDir = path.join(__dirname, '..', 'template');

// Files and directories to exclude from template
const EXCLUDE = [
  'node_modules',
  'dist',
  '.git',
  '.vercel',
  '.DS_Store',
  '.env',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  'create-x402-agent-app', // Don't copy the CLI package itself
  '.claude'
];

// Files to include (everything else will be copied)
const INCLUDE_PATTERNS = [
  'client/**/*',
  'api/**/*',
  'shared/**/*',
  'public/**/*',
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'vercel.json',
  'postcss.config.js',
  'components.json',
  'drizzle.config.ts',
  'vite-plugin-meta-images.ts',
  'x402-endpoints.json',
  'README.md',
  'CLAUDE.md',
  '.gitignore'
];

function shouldExclude(filePath) {
  const relativePath = path.relative(projectRoot, filePath);
  return EXCLUDE.some(pattern => {
    return relativePath.startsWith(pattern) || relativePath.includes(`/${pattern}`);
  });
}

function copyRecursive(src, dest) {
  if (shouldExclude(src)) {
    return;
  }

  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const files = fs.readdirSync(src);
    for (const file of files) {
      copyRecursive(
        path.join(src, file),
        path.join(dest, file)
      );
    }
  } else if (stat.isFile()) {
    fs.copyFileSync(src, dest);
  }
}

console.log('🔧 Preparing template directory...\n');

// Clean template directory
if (fs.existsSync(templateDir)) {
  fs.rmSync(templateDir, { recursive: true });
}
fs.mkdirSync(templateDir, { recursive: true });

// Copy project files to template
console.log('📦 Copying project files...');
copyRecursive(projectRoot, templateDir);

// Create .gitignore in template if it doesn't exist
const gitignorePath = path.join(templateDir, '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  const gitignoreContent = `node_modules
dist
.DS_Store
server/public
vite.config.ts.*
*.tar.gz
.vercel
.env
`;
  fs.writeFileSync(gitignorePath, gitignoreContent);
}

console.log('✅ Template prepared successfully!\n');
console.log(`Template location: ${templateDir}\n`);
