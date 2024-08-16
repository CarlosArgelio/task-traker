import { ICreateTask } from "../../interfaces";
import { ITaskTrackerRepositoryAsync } from "../../repositories";

export class TaskTrackerService {
    private readonly repository: ITaskTrackerRepositoryAsync;

    constructor( repository: ITaskTrackerRepositoryAsync ) {
        this.repository = repository;
    }

    async findAll() {
        return await this.repository.findAll();
    }

    async create( data: ICreateTask ) {
        return await this.repository.save( data );
    }
}