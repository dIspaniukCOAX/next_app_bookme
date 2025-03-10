class Logger {
  private static instance: Logger | null = null;

  private logMessages: string[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (Logger.instance === null) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string): void {
    this.logMessages.push(message);
    console.log(`Log: ${message}`);
  }

  public getLogMessages(): string[] {
    return this.logMessages;
  }
}

function SingletonMain() {
  const logger1 = Logger.getInstance();
  logger1.log("First message");

  const logger2 = Logger.getInstance();
  logger2.log("Second message");

  console.log("Are logger1 and logger2 the same instance?", logger1 === logger2); // Should be true

  console.log("Log messages:", logger1.getLogMessages());
}

SingletonMain();
