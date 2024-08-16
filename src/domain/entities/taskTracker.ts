import { ID, Description, Status } from '../valueObject';

export class EntityTaskTracker {
  public id: ID;
  public description: Description;
  public status: Status;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: ID,
    description: Description,
    status: Status,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
