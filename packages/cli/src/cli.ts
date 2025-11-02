#!/usr/bin/env node

/**
 * HikmaUI CLI
 * Command-line interface for HikmaUI
 */

import { program } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { themeCommand } from './commands/theme';

const packageJson = require('../package.json');

program
  .name('hikma')
  .description('CLI tool for HikmaUI - The modern CSS framework')
  .version(packageJson.version);

// hikma init
program
  .command('init')
  .description('Initialize HikmaUI in your project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(initCommand);

// hikma add
program
  .command('add [components...]')
  .description('Add components to your project')
  .option('--all', 'Add all components')
  .option('--overwrite', 'Overwrite existing components')
  .action(addCommand);

// hikma theme
program
  .command('theme')
  .description('Create or modify theme')
  .option('--create', 'Create new theme')
  .option('--name <name>', 'Theme name')
  .action(themeCommand);

// hikma doctor
program
  .command('doctor')
  .description('Check HikmaUI configuration')
  .action(async () => {
    console.log('🔍 Running HikmaUI diagnostics...');
    // TODO: Implement doctor command
  });

// Parse arguments
program.parse();
