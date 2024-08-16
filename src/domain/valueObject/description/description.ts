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
    if (!this.isString() || !this.isNotEmpty()) {
      throw new Error('Invalid Description');
    }

    return true;
  }
}
