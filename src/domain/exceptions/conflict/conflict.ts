export class ConflitError extends Error {
  public readonly isOperational: boolean = false;

  constructor(message: string) {
    super(message);

    this.name = 'ConflitError';
    Error.captureStackTrace(this);
  }
}
