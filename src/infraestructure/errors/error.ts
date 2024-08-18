export class HandleError extends Error {
  public readonly name: string;
  public readonly isOperational: boolean;

  constructor(name: string, message: string, isOperational: boolean) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class LogError {
  public readonly name: string;
  public readonly message: string;
  public readonly isOperational: boolean;

  constructor(name: string, message: string, isOperational: boolean) {
    this.name = name;
    this.message = message;
    this.isOperational = isOperational;

    this.log();
  }

  log() {
    console.log('Error Generate');
    console.log(
      `Name: ${this.name} \n\n Message: ${this.message} \n\n Is Operational: ${this.isOperational}`,
    );
  }
}
