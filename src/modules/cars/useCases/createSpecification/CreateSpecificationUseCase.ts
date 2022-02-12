import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/App.Error";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
    name;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationsAlreadyExists =
            await this.specificationsRepository.findByName(name);

        if (specificationsAlreadyExists) {
            throw new AppError("Specification already exists!");
        }

        await this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
