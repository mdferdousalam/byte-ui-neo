/**
 * hikma init command
 * Initialize HikmaUI in a project
 */

import prompts from 'prompts';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve } from 'path';
import pc from 'picocolors';
import ora from 'ora';

export async function initCommand(options: { yes?: boolean }) {
  console.log(pc.bold(pc.cyan('🎨 Welcome to HikmaUI!')));
  console.log();

  // Check if already initialized
  const configPath = resolve(process.cwd(), 'hikma.config.js');
  if (existsSync(configPath) && !options.yes) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'HikmaUI is already initialized. Overwrite?',
      initial: false,
    });

    if (!overwrite) {
      console.log(pc.yellow('✓ Keeping existing configuration'));
      return;
    }
  }

  // Get configuration preferences
  const answers = options.yes
    ? getDefaultAnswers()
    : await prompts([
        {
          type: 'select',
          name: 'framework',
          message: 'Which framework are you using?',
          choices: [
            { title: 'React', value: 'react' },
            { title: 'Vue', value: 'vue' },
            { title: 'Svelte', value: 'svelte' },
            { title: 'HTML/Vanilla JS', value: 'html' },
            { title: 'Next.js', value: 'nextjs' },
            { title: 'Astro', value: 'astro' },
          ],
          initial: 0,
        },
        {
          type: 'select',
          name: 'styling',
          message: 'How do you want to use HikmaUI?',
          choices: [
            { title: 'Utility-first (like Tailwind)', value: 'utilities' },
            { title: 'Components + Utilities (hybrid)', value: 'hybrid' },
            { title: 'Components only', value: 'components' },
          ],
          initial: 1,
        },
        {
          type: 'multiselect',
          name: 'features',
          message: 'Select features to enable:',
          choices: [
            { title: 'Dark mode', value: 'darkMode', selected: true },
            { title: 'Animations', value: 'animations', selected: true },
            { title: 'Forms', value: 'forms', selected: true },
            { title: 'Icons', value: 'icons', selected: false },
          ],
        },
        {
          type: 'text',
          name: 'componentsDir',
          message: 'Where should we put components?',
          initial: './src/components',
        },
      ]);

  if (!answers.framework) {
    console.log(pc.red('✗ Initialization cancelled'));
    return;
  }

  const spinner = ora('Creating configuration...').start();

  try {
    // Create hikma.config.js
    const config = generateConfig(answers);
    await writeFile(configPath, config, 'utf-8');

    // Create components directory
    const componentsDir = resolve(process.cwd(), answers.componentsDir || './src/components');
    if (!existsSync(componentsDir)) {
      await mkdir(componentsDir, { recursive: true });
    }

    // Create hikma.json for CLI
    const cliConfig = {
      framework: answers.framework,
      styling: answers.styling,
      features: answers.features || [],
      componentsDir: answers.componentsDir || './src/components',
    };
    await writeFile(
      resolve(process.cwd(), 'hikma.json'),
      JSON.stringify(cliConfig, null, 2),
      'utf-8'
    );

    spinner.succeed('Configuration created!');
    console.log();
    console.log(pc.green('✓ HikmaUI initialized successfully!'));
    console.log();
    console.log(pc.bold('Next steps:'));
    console.log(pc.dim('  1. Install dependencies: pnpm install'));
    console.log(pc.dim('  2. Add components: hikma add button card'));
    console.log(pc.dim('  3. Start building! 🚀'));
    console.log();
  } catch (error) {
    spinner.fail('Failed to initialize');
    console.error(pc.red(error instanceof Error ? error.message : 'Unknown error'));
    process.exit(1);
  }
}

function getDefaultAnswers() {
  return {
    framework: 'react',
    styling: 'hybrid',
    features: ['darkMode', 'animations', 'forms'],
    componentsDir: './src/components',
  };
}

function generateConfig(answers: any): string {
  return `/** @type {import('@hikmaui/core').HikmaConfig} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
    './pages/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
    './components/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
  ],

  darkMode: ${answers.features?.includes('darkMode') ? "'class'" : 'false'},

  theme: {
    extend: {
      // Add your custom theme here
    },
  },

  plugins: [
    ${answers.features?.includes('forms') ? "// require('@hikmaui/plugin-forms')" : ''}
  ],
};
`;
}
