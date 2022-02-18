import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Car_brand",
            category_id: "91ad5ca4-d81f-4541-95ef-d6adbc08e72f",
            daily_rate: 110,
            description: "Car description",
            fine_amount: 40,
            license_plate: "GGH-2556",
            name: "CAR1",
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Car_brand_test",
            category_id: "91ad5ca4-d81f-4541-95ef-d6adbc08e72f",
            daily_rate: 110,
            description: "Car description",
            fine_amount: 40,
            license_plate: "GGH-2356",
            name: "CAR2",
        });

        const cars = await listCarsUseCase.execute({
            brand: "Car_brand_test",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Car_brand_test",
            category_id: "91ad5ca4-d81f-4541-95ef-d6adbc08e72f",
            daily_rate: 110,
            description: "Car description",
            fine_amount: 40,
            license_plate: "GGH-2358",
            name: "CAR3",
        });

        const cars = await listCarsUseCase.execute({
            name: "CAR3",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Car_brand_test",
            category_id: "91ad5ca4-d81f-4541-95ef-d6adbc08e72f",
            daily_rate: 110,
            description: "Car description",
            fine_amount: 40,
            license_plate: "GGH-1358",
            name: "CAR4",
        });

        const cars = await listCarsUseCase.execute({
            category_id: "91ad5ca4-d81f-4541-95ef-d6adbc08e72f",
        });

        console.log(cars);

        expect(cars).toEqual([car]);
    });
});
