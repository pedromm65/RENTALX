import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/App.Error";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;
describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("Should not be able to add a new specification to an non-existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "1234",
            fine_amount: 40,
            brand: "Brand Car",
            category_id: "category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "teste",
        });

        const specifications_id = [specification.id];
        const specificationsCar = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCar).toHaveProperty("specifications");
        expect(specificationsCar.specifications.length).toBe(1);
    });
});
