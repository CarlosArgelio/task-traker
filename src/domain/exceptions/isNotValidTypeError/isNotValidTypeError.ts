export class IsNotValidTypeError extends Error {
  public readonly isOperational: boolean = true;

  constructor(message: string, isOperational: boolean) {
    super(message);
    this.name = 'IsNotValidTypeError';
    this.isOperational = isOperational;
  }
}
