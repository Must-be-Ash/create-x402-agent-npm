#!/usr/bin/env node

import { program } from 'commander';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ProjectOptions {
  projectName: string;
  packageManager: 'npm' | 'pnpm' | 'yarn';
  installDeps: boolean;
  initGit: boolean;
}

async function main() {
  console.log(chalk.bold.cyan('\n🤖 Create x402 Agent App\n'));
  console.log(chalk.gray('The missing payment layer for AI agents\n'));

  program
    .name('create-x402-agent-app')
    .description('Create a new x402 AI Agent application')
    .argument('[project-name]', 'Name of your project')
    .option('-y, --yes', 'Skip prompts and use defaults')
    .parse(process.argv);

  const args = program.args;
  const options = program.opts();

  let projectName = args[0];
  let packageManager: 'npm' | 'pnpm' | 'yarn' = 'npm';
  let installDeps = true;
  let initGit = true;

  if (!options.yes) {
    const responses = await prompts([
      {
        type: projectName ? null : 'text',
        name: 'projectName',
        message: 'What is your project named?',
        initial: 'my-x402-agent',
        validate: (value: string) => {
          if (!value) return 'Project name is required';
          if (!/^[a-z0-9-_]+$/.test(value)) {
            return 'Project name can only contain lowercase letters, numbers, hyphens, and underscores';
          }
          return true;
        }
      },
      {
        type: 'select',
        name: 'packageManager',
        message: 'Which package manager do you want to use?',
        choices: [
          { title: 'npm', value: 'npm' },
          { title: 'pnpm', value: 'pnpm' },
          { title: 'yarn', value: 'yarn' }
        ],
        initial: 0
      },
      {
        type: 'confirm',
        name: 'installDeps',
        message: 'Install dependencies?',
        initial: true
      },
      {
        type: 'confirm',
        name: 'initGit',
        message: 'Initialize git repository?',
        initial: true
      }
    ]);

    if (!responses.projectName && !projectName) {
      console.log(chalk.red('\n✖ Project creation cancelled\n'));
      process.exit(1);
    }

    projectName = projectName || responses.projectName;
    packageManager = responses.packageManager || packageManager;
    installDeps = responses.installDeps ?? installDeps;
    initGit = responses.initGit ?? initGit;
  } else {
    projectName = projectName || 'my-x402-agent';
  }

  const projectOptions: ProjectOptions = {
    projectName,
    packageManager,
    installDeps,
    initGit
  };

  await createProject(projectOptions);
}

async function createProject(options: ProjectOptions) {
  const { projectName, packageManager, installDeps, initGit } = options;
  const projectPath = path.join(process.cwd(), projectName);

  // Check if directory already exists
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`\n✖ Directory "${projectName}" already exists\n`));
    process.exit(1);
  }

  const spinner = ora('Creating project directory...').start();

  try {
    // Create project directory
    fs.mkdirSync(projectPath, { recursive: true });
    spinner.succeed('Project directory created');

    // Copy template files
    spinner.start('Copying template files...');
    const templatePath = path.join(__dirname, '..', 'template');
    copyDirectory(templatePath, projectPath);
    spinner.succeed('Template files copied');

    // Update package.json with project name
    spinner.start('Configuring package.json...');
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    spinner.succeed('package.json configured');

    // Create .env file
    spinner.start('Creating environment file...');
    const envContent = `# OpenAI
OPENAI_API_KEY=

# Coinbase Developer Platform
VITE_CDP_PROJECT_ID=
CDP_API_KEY_ID=
CDP_API_KEY_SECRET=

# x402 Network Configuration (defaults for Base network)
VITE_FACILITATOR_URL=https://x402.org/facilitator
VITE_NETWORK=base
VITE_USDC_CONTRACT_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
`;
    fs.writeFileSync(path.join(projectPath, '.env'), envContent);
    spinner.succeed('Environment file created');

    // Install dependencies
    if (installDeps) {
      spinner.start(`Installing dependencies with ${packageManager}...`);
      try {
        execSync(`${packageManager} install`, {
          cwd: projectPath,
          stdio: 'ignore'
        });
        spinner.succeed('Dependencies installed');
      } catch (error) {
        spinner.warn('Failed to install dependencies. You can install them manually.');
      }
    }

    // Initialize git
    if (initGit) {
      spinner.start('Initializing git repository...');
      try {
        execSync('git init', { cwd: projectPath, stdio: 'ignore' });
        execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
        execSync('git commit -m "Initial commit from create-x402-agent-app"', {
          cwd: projectPath,
          stdio: 'ignore'
        });
        spinner.succeed('Git repository initialized');
      } catch (error) {
        spinner.warn('Failed to initialize git. You can do this manually.');
      }
    }

    // Success message
    console.log(chalk.green.bold('\n✓ Project created successfully!\n'));
    console.log(chalk.cyan('Next steps:\n'));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white(`  # Add your API keys to .env file`));

    if (!installDeps) {
      console.log(chalk.white(`  ${packageManager} install`));
    }

    console.log(chalk.white(`  ${packageManager === 'npm' ? 'npx' : packageManager} vercel dev`));
    console.log(chalk.gray('\n  Or for frontend-only development:'));
    console.log(chalk.white(`  ${packageManager} run dev\n`));

    console.log(chalk.gray('Documentation:'));
    console.log(chalk.white('  https://x402-agent.vercel.app'));
    console.log(chalk.white('  https://docs.cdp.coinbase.com/embedded-wallets/\n'));

  } catch (error) {
    spinner.fail('Failed to create project');
    console.error(chalk.red('\nError:'), error);
    process.exit(1);
  }
}

function copyDirectory(src: string, dest: string) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read all files/folders in source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy directories
      copyDirectory(srcPath, destPath);
    } else {
      // Copy files
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

main().catch((error) => {
  console.error(chalk.red('\nUnexpected error:'), error);
  process.exit(1);
});
