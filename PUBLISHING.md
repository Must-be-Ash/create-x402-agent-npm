# Publishing create-x402-agent-app to npm

This guide explains how to publish the CLI package to npm so users can run `npx create-x402-agent-app` or `npx x402-agent-app`.

## Prerequisites

1. **npm account**: Create one at https://www.npmjs.com/signup
2. **npm CLI login**: Run `npm login` and enter your credentials
3. **Package name availability**: Check if the name is available at https://www.npmjs.com/package/create-x402-agent-app

## Package Names Explained

We're creating **two** packages for different command patterns:

### 1. `create-x402-agent-app` (Primary Package)
This is the standard naming convention (like `create-react-app`, `create-next-app`).

Users run:
```bash
npx create-x402-agent-app my-app
```

### 2. `x402-agent-app` (Shorthand Alias - Optional)
A shorter alternative for convenience.

Users can run:
```bash
npx x402-agent-app my-app
```

**How to create the alias:**
- Publish the same package under a different name
- Or create a tiny wrapper package that just calls `create-x402-agent-app`

## Publishing Steps

### Step 1: Verify Package Configuration

From the `create-x402-agent-app` directory:

```bash
cd /path/to/x402-agent-demo/create-x402-agent-app
```

Check `package.json`:
- Name: `create-x402-agent-app`
- Version: Start with `1.0.0`
- Bin: Points to `./dist/index.js`
- Files: Includes `["dist", "template"]`

### Step 2: Build and Prepare Template

```bash
# Install dependencies
npm install

# Prepare template (copies files from parent project)
npm run prepare-template

# Build TypeScript to JavaScript
npm run build
```

This creates:
- `dist/` - Compiled CLI code
- `template/` - Project template files

### Step 3: Test Locally (Recommended)

Before publishing, test with npm link:

```bash
# Create a global symlink
npm link

# Go to a test directory
cd /tmp/test-cli

# Test your command
create-x402-agent-app test-app

# Clean up when done
npm unlink -g create-x402-agent-app
```

Or test directly:
```bash
node dist/index.js test-app -y
```

### Step 4: Publish to npm

```bash
# Dry run (see what will be published)
npm publish --dry-run

# Actually publish
npm publish
```

If the name is taken, you'll need to:
- Choose a different name (e.g., `@yourusername/create-x402-agent-app`)
- Or request the package name if it's abandoned

### Step 5: Test the Published Package

Wait a minute for npm to propagate, then:

```bash
npx create-x402-agent-app@latest test-app
```

## Creating the Shorthand Alias (`x402-agent-app`)

### Option A: Separate Wrapper Package (Recommended)

Create a minimal package that delegates to the main one:

1. Create a new directory: `x402-agent-app/`
2. Add this `package.json`:

```json
{
  "name": "x402-agent-app",
  "version": "1.0.0",
  "description": "Shorthand for create-x402-agent-app",
  "bin": {
    "x402-agent-app": "./index.js"
  },
  "files": ["index.js"],
  "dependencies": {
    "create-x402-agent-app": "^1.0.0"
  }
}
```

3. Add `index.js`:

```javascript
#!/usr/bin/env node
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const args = process.argv.slice(2).join(' ');
execSync(`create-x402-agent-app ${args}`, { stdio: 'inherit' });
```

4. Publish:

```bash
npm publish
```

### Option B: npm Alias (Simpler but Limited)

Users can create their own alias:

```bash
npm config set init-module ~/.npm-init.js
```

## Version Management

### Updating the Package

1. Make your changes
2. Update version:
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```
3. Rebuild and publish:
   ```bash
   npm run prepare-template
   npm run build
   npm publish
   ```

### Version Tags

```bash
# Publish a beta version
npm publish --tag beta

# Users install with
npx create-x402-agent-app@beta my-app
```

## Automation with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: |
          cd create-x402-agent-app
          npm install

      - name: Build
        run: |
          cd create-x402-agent-app
          npm run prepare-template
          npm run build

      - name: Publish
        run: |
          cd create-x402-agent-app
          npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Then publish with:
```bash
git tag v1.0.0
git push origin v1.0.0
```

## Verification Checklist

Before publishing, verify:

- [ ] `npm run prepare-template` runs successfully
- [ ] `npm run build` compiles without errors
- [ ] `template/` directory contains all necessary files
- [ ] `.env` is **not** included in template (security)
- [ ] `node_modules` is **not** included in template
- [ ] Test installation works: `node dist/index.js test-app -y`
- [ ] Created project runs: `cd test-app && npm run dev`
- [ ] README.md has correct usage instructions
- [ ] package.json has correct repository, author, license
- [ ] Keywords in package.json help discoverability

## Troubleshooting

### "Package name already taken"

Use a scoped package:
```json
{
  "name": "@yourusername/create-x402-agent-app"
}
```

Users run: `npx @yourusername/create-x402-agent-app`

### "Permission denied" error

Make sure `dist/index.js` is executable:
```bash
chmod +x dist/index.js
```

Check it has the shebang: `#!/usr/bin/env node`

### Template files missing

Run `npm run prepare-template` before `npm run build`

### Users report outdated version

npm caches packages. Users should run:
```bash
npx clear-npx-cache
npx create-x402-agent-app@latest my-app
```

## After Publishing

1. **Update main repository README** with installation instructions
2. **Tweet/share** the new package
3. **Monitor issues** on GitHub
4. **Update documentation** at https://x402-agent.vercel.app

## Additional Resources

- [npm Publishing Guide](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)
- [create-next-app source code](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) (great reference)
