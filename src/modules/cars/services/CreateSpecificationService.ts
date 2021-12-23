import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
    name;
    description: string;
}

class CreateSpecificationService {
    constructor(private specificationsRepository: ISpecificationsRepository) {}

    execute({ name, description }: IRequest): void {
        const specificationsAlreadyExists =
            this.specificationsRepository.findByName(name);

        if (specificationsAlreadyExists) {
            throw new Error("Specification already exists!");
        }

        this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationService };
