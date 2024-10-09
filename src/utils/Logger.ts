import chalk from 'chalk';

export default class Logger {
    public static log = (args: any) => this.info(args);
    public static info = (args: any) => console.log(chalk.blue(`[${new Date().toLocaleString()}] 🔷 [INFO]`), typeof args === 'string' ? chalk.blueBright(args) : args);
    public static success = (args: any) => console.log(chalk.green(`[${new Date().toLocaleString()}] 🔷 [INFO]`), typeof args === 'string' ? chalk.greenBright(args) : args);
    public static warn = (args: any) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] 🟠 [WARNING]`), typeof args === 'string' ? chalk.yellowBright(args) : args);
    public static error = (args: any) => console.log(chalk.red(`[${new Date().toLocaleString()}] ❌ [ERROR]`), typeof args === 'string' ? chalk.redBright(args) : args);
}