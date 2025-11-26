import { useState } from "react";
import { SketchyButton, SketchyCard } from "@/components/ui/sketchy-ui";
import { Link } from "wouter";
import { Terminal, Wallet, Zap, ArrowRight, Code, CheckCircle2, ExternalLink, Github } from "lucide-react";

export default function Landing() {
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = async () => {
    const command = "npm install @x402-agent/mcp-server";
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center p-4 relative overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
      
      <div className="max-w-4xl w-full space-y-20 py-20 z-10">
        
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="relative inline-block">
            <button
              onClick={handleCopyCommand}
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <span className="font-mono text-sm">$ npm install @x402-agent/mcp-server</span>
            </button>
            {copied && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 font-heading font-bold text-sm text-green-600 rotate-[-5deg] whitespace-nowrap">
                Copied!
              </div>
            )}
          </div>
          
          <h1 className="text-6xl md:text-7xl font-heading font-bold tracking-tight">
            The Missing Payment Layer<br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10">for AI Agents</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-accent/60 -rotate-1 z-0" />
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Give your LLM agents a wallet. Automatically handle x402 micropayments for paid APIs without writing a single line of payment logic.
          </p>

          <div className="flex flex-col gap-4 justify-center items-center pt-4">
            <Link href="/chat">
              <SketchyButton className="text-xl px-8 py-4 flex items-center gap-3 group bg-foreground text-background hover:bg-foreground/90">
                Try the Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </SketchyButton>
            </Link>
            <a href="https://www.npmjs.com/package/x402-agent" target="_blank" rel="noreferrer">
              <SketchyButton variant="secondary" className="text-xl px-8 py-4">
                View on NPM
              </SketchyButton>
            </a>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SketchyCard className="bg-[#f8fff8] rotate-1">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 border-2 border-current">
              <Wallet className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3">Auto x402 Payments</h3>
            <p className="font-body text-lg leading-relaxed">
              Handles all USDC payments on Base network automatically when your agent hits a paid 402 endpoint.
            </p>
          </SketchyCard>

          <SketchyCard className="bg-[#fff8ff] -rotate-1">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 border-2 border-current">
              <Terminal className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3">Plug & Play</h3>
            <p className="font-body text-lg leading-relaxed">
              Works with Claude Desktop, custom Node.js apps, or any MCP client. Just configure your endpoints JSON and go.
            </p>
          </SketchyCard>

          <SketchyCard className="bg-[#fffdf5] rotate-2">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 border-2 border-current">
              <Zap className="w-6 h-6 text-yellow-700" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-3">Zero Logic Required</h3>
            <p className="font-body text-lg leading-relaxed">
              No wallet management or transaction code. We handle the blockchain complexity so you can build agents.
            </p>
          </SketchyCard>
        </div>

        {/* How it works */}
        <div className="bg-card sketchy-border p-8 md:p-12 relative">
          <div className="absolute -top-4 -left-4 bg-accent px-4 py-1 font-heading font-bold text-xl rotate-[-5deg] border-2 border-current shadow-[2px_2px_0px_0px_black]">
            How it works
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-heading text-xl font-bold">Install & Configure</h4>
                  <p className="font-body text-lg mt-1">Install the package and set your private key env var.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-heading text-xl font-bold">Define Endpoints</h4>
                  <p className="font-body text-lg mt-1">Create an <code className="bg-muted px-1 rounded">endpoints.json</code> file listing the paid APIs.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h4 className="font-heading text-xl font-bold">Let Agent Run</h4>
                  <p className="font-body text-lg mt-1">Your agent calls endpoints autonomously. We handle the payment negotiation and execution.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1e1e1e] p-4 md:p-6 rounded-lg sketchy-border text-white font-mono text-[10px] md:text-xs overflow-x-auto shadow-2xl">
              <div className="flex gap-2 mb-4 opacity-50">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <pre className="text-green-400 text-[10px] md:text-xs leading-relaxed">
{`{
  "endpoints": [
    {
      "url": "https://example.com/metadata",
      "cost": "0.01 USDC",
      "name": "metadata_fetcher"
    },
    {
      "url": "https://example.com/qr-code",
      "cost": "0.01 USDC",
      "name": "qr_generator"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center gap-4">
            <img 
              src="/dood.jpg" 
              alt="Profile" 
              className="w-24 h-24 rounded-full sketchy-border-sm object-cover"
            />
            <div className="space-y-3">
              <p className="font-heading text-2xl font-bold">Built by @must_be_ash</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a 
                  href="https://x.com/must_be_ash" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white sketchy-border-sm font-body font-bold text-lg hover:-rotate-2 transition-transform"
                >
                  <span>@must_be_ash</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a 
                  href="https://github.com/Must-be-Ash/x402-agent-demo" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white sketchy-border-sm font-body font-bold text-lg hover:-rotate-2 transition-transform"
                >
                  <Github className="w-5 h-5" />
                  Fork on GitHub
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
