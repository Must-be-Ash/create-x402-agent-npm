# create-x402-agent-app

Create an x402 AI Agent application with one command.

## Usage

### Interactive Mode

```bash
npx create-x402-agent-app
```

Follow the prompts to configure your project.

### Quick Start

```bash
npx create-x402-agent-app my-agent-app
```

### Skip All Prompts

```bash
npx create-x402-agent-app my-agent-app -y
```

## What's Included

This creates a full-stack AI agent application with:

- **Frontend**: React 18.2 + Vite + TypeScript + Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **AI**: OpenAI GPT-4o-mini with function calling
- **Wallet**: Coinbase Developer Platform (CDP) Embedded Wallets
- **Payments**: x402 micropayments on Base network
- **Styling**: Custom "hand-drawn" sketchy UI theme

## After Installation

1. Navigate to your project:
   ```bash
   cd my-agent-app
   ```

2. Add your API keys to `.env`:
   ```env
   OPENAI_API_KEY=your_key_here
   VITE_CDP_PROJECT_ID=your_project_id
   CDP_API_KEY_ID=your_api_key_id
   CDP_API_KEY_SECRET=your_api_key_secret
   ```

3. Start development server:
   ```bash
   # Install Vercel CLI globally (if not already installed)
   npm install -g vercel

   # Run with serverless functions
   vercel dev
   ```

   Or for frontend-only development:
   ```bash
   npm run dev
   ```

## Getting API Keys

### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and add to `.env`

### Coinbase Developer Platform
1. Go to https://portal.cdp.coinbase.com
2. Create a new project
3. Get your project ID and API credentials
4. Add to `.env`

## Documentation

- [Live Demo](https://x402-agent.vercel.app)
- [GitHub Repository](https://github.com/Must-be-Ash/x402-agent-demo)
- [CDP Embedded Wallets Docs](https://docs.cdp.coinbase.com/embedded-wallets/)
- [x402 Protocol](https://x402.org)

## License

MIT
