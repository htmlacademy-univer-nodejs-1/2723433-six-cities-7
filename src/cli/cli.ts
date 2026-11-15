#!/usr/bin/env node

import chalk from 'chalk';

import { printHelp } from './commands/help.js';
import { printVersion } from './commands/version.js';
import { importOffers } from './commands/import.js';
import { generateOffers } from '../offers/generate-offers.js';

const run = async (): Promise<void> => {
  const [command, ...args] = process.argv.slice(2);

  try {
    switch (command) {
      case undefined:
      case '--help':
        printHelp();
        break;

      case '--version':
        printVersion();
        break;

      case '--import': {
        const [filePath] = args;

        if (!filePath || args.length !== 1) {
          throw new Error('Укажите путь к TSV-файлу: --import <path>');
        }

        await importOffers(filePath);
        break;
      }

      case '--generate': {
        const [countArg, filepath, url] = args;
        const count = Number(countArg);

        if (
          args.length !== 3 ||
          !Number.isSafeInteger(count) ||
          count < 1 ||
          !filepath ||
          !url
        ) {
          throw new Error(
            'Использование: --generate <n> <filepath> <url>'
          );
        }

        await generateOffers(count, filepath, url);
        console.log(`Сгенерировано предложений: ${count}`);
        break;
      }

      default:
        console.error(chalk.red(`Неизвестная команда: ${command}`));
        printHelp();
        process.exitCode = 1;
    }
  } catch (error) {
    console.error(
      chalk.red(error instanceof Error ? error.message : String(error))
    );
    process.exitCode = 1;
  }
};

void run();
