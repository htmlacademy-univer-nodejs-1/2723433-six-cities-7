import chalk from 'chalk';

export const printHelp = (): void => {
  console.log(chalk.bold('Программа для подготовки данных для REST API сервера.'));
  console.log();
  console.log('Пример: npm run cli -- --<command> [--arguments]');
  console.log();
  console.log(chalk.bold('Команды:'));
  console.log();
  console.log(`  ${chalk.green('--version')}             Выводит номер версии приложения`);
  console.log(`  ${chalk.green('--help')}                Выводит справочную информацию`);
  console.log(`  ${chalk.green('--import <path>')}       Импортирует данные из TSV-файла`);
  console.log(`  ${chalk.yellow('--generate <n> <path> <url>')} Генерирует тестовые данные`);
};
