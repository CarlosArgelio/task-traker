export class NotFoundError extends Error {
  public readonly isOperational: boolean = true;

  constructor(message: string, isOperational: boolean) {
    super(message);
    this.isOperational = isOperational;

    this.name = 'NotFoundError';
    Error.captureStackTrace(this);
  }
}
