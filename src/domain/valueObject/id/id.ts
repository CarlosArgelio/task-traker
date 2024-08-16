export class ID {
  public id: number;

  constructor(id: number) {
    this.id = id;

    this.validate();
  }

  isNumber() {
    return typeof this.id === 'number';
  }

  isNotEmpty() {
    return this.id !== null && this.id !== undefined;
  }

  validate() {
    if (!this.isNumber() || !this.isNotEmpty()) {
      throw new Error('Invalid ID');
    }

    return true;
  }
}
