# Quick Start: Publishing Your CLI Installer

## TL;DR

```bash
# 1. Prepare and build
cd create-x402-agent-app
npm install
npm run prepare-template
npm run build

# 2. Test locally
node dist/index.js ../test-project -y

# 3. Publish to npm
npm login
npm publish

# 4. Users can now run
npx create-x402-agent-app my-app
```

## Before First Publish

### Check Package Name Availability
```bash
npm info create-x402-agent-app
# If it shows 404, the name is available!
```

### Update package.json (if needed)
- Change `name` if the package name is taken
- Set correct `repository` URL
- Set `author` to your name/org
- Verify `version` (start with 1.0.0)

### Test Installation
```bash
# Build everything
npm run prepare-template && npm run build

# Test it creates a working project
cd /tmp
node /path/to/create-x402-agent-app/dist/index.js test-app -y
cd test-app
npm run dev  # Should work!
```

## Publishing to npm

### First Time Setup
```bash
# Create npm account at https://www.npmjs.com/signup
npm login
# Enter username, password, email
```

### Publish
```bash
npm publish
```

### Verify
```bash
# Check it's published
npm info create-x402-agent-app

# Test with npx (wait ~1 minute for npm to propagate)
cd /tmp
npx create-x402-agent-app@latest my-test -y
```

## Updating After Changes

```bash
# Make changes to the main project...

# Then rebuild CLI
cd create-x402-agent-app
npm run prepare-template  # Sync latest changes
npm run build             # Compile TypeScript

# Bump version and publish
npm version patch   # 1.0.0 -> 1.0.1
npm publish
```

## Troubleshooting

### "Package name already taken"
Use a scoped package:
```json
{
  "name": "@yourusername/create-x402-agent-app"
}
```
Users run: `npx @yourusername/create-x402-agent-app`

### "Permission denied"
```bash
npm login
# Re-enter credentials
```

### Template files missing
```bash
npm run prepare-template
# Check template/ directory exists
ls -la template/
```

### Build errors
```bash
npm install  # Make sure deps are installed
npm run build -- --verbose  # See detailed errors
```

## What Gets Published

Only these files/folders (defined in package.json `files`):
- `dist/` - Compiled CLI code
- `template/` - Full project template
- `package.json`
- `README.md`

**Not published:**
- `src/` - TypeScript source (users don't need it)
- `node_modules/` - Auto-excluded
- `.git/` - Auto-excluded

## After Publishing

### Update Main README
Add to `x402-agent-demo/README.md`:
```markdown
## Quick Start

npx create-x402-agent-app my-agent-app
```

### Share It
- Tweet about it
- Add to GitHub README
- Update documentation site

### Monitor
- Check npm download stats: https://www.npmjs.com/package/create-x402-agent-app
- Watch for GitHub issues
- Monitor npm deprecation warnings

## Common Commands

```bash
# Build for development
npm run build

# Watch mode
npm run dev

# Sync template from parent project
npm run prepare-template

# Test locally
npm link
create-x402-agent-app test-app
npm unlink -g create-x402-agent-app

# Version bumps
npm version patch  # Bug fixes: 1.0.0 -> 1.0.1
npm version minor  # New features: 1.0.0 -> 1.1.0
npm version major  # Breaking changes: 1.0.0 -> 2.0.0

# Publish
npm publish

# Unpublish (within 72 hours only!)
npm unpublish create-x402-agent-app@1.0.0
```

## Support

- **Documentation**: See PUBLISHING.md for detailed guide
- **Issues**: https://github.com/Must-be-Ash/x402-agent-demo/issues
- **npm Package**: https://www.npmjs.com/package/create-x402-agent-app (after publishing)
