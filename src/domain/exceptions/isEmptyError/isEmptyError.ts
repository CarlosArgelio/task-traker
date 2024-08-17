export class IsEmptyError extends Error {
  public readonly isOperational: boolean = true;

  constructor(message: string, isOperational: boolean) {
    super(message);
    this.isOperational = isOperational;

    this.name = 'IsEmptyError';
    Error.captureStackTrace(this);
  }
}