import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';

type PackageInfo = {
  version: string;
};

const getPackageInfo = (): PackageInfo => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const packagePath = resolve(currentDir, '../../../package.json');

  return JSON.parse(readFileSync(packagePath, 'utf-8')) as PackageInfo;
};

export const printVersion = (): void => {
  const { version } = getPackageInfo();

  console.log(chalk.green(version));
};
