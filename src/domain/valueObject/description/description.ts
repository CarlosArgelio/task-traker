import { IsNotValidTypeError } from './../../exceptions';

export class Description {
  public description: string;

  constructor(description: string) {
    this.description = description;
    this.validate();
  }

  isNotEmpty() {
    return this.description.length > 0;
  }

  isString() {
    return typeof this.description === 'string';
  }

  validate() {
    if (!this.isString()) {
      throw new IsNotValidTypeError('Description must be a string', true);
    }
    if (!this.isNotEmpty()) {
      throw new Error('Description cannot be empty');
    }
  }
}
