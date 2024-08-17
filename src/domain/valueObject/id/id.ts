import { IsNotValidTypeError, IsEmptyError } from './../../exceptions';

export class ID {
  public id: number;

  constructor(id: number) {
    this.id = id;

    this.validate();
  }

  isNumber() {
    return Number.isInteger(this.id);
  }

  isNotEmpty() {
    return this.id !== null && this.id !== undefined;
  }

  validate() {
    if (!this.isNotEmpty()) {
      throw new IsEmptyError('ID cannot be empty', true);
    }
    if (this.id < 0) {
      throw new IsNotValidTypeError('ID cannot be negative', true);
    }
    if (this.id === 0) {
      throw new IsNotValidTypeError('ID cannot be zero', true);
    }
    if (!this.isNumber()) {
      throw new IsNotValidTypeError('ID must be an integer', true);
    }
  }
}
