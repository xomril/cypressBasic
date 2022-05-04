import chalk from 'chalk';

class Logger {
  info(message: string): void {
    console.log(chalk.green(message));
  }
  error(message: string): void {
    console.log(chalk.red(message));
  }
  warning(message: string): void {
    console.log(chalk.hex('#FFA500')(message));
  }
  action(message: string): void {
    console.log(chalk.hex('#9C12FF')(message));
  }
}

export const logger = new Logger();
