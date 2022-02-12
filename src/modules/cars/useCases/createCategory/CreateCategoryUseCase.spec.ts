import { AppError } from "@errors/App.Error";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("Should be able to create a new category", async () => {
        const cateogory = {
            name: "Category test",
            description: "Category description test",
        };
        await createCategoryUseCase.execute({
            name: cateogory.name,
            description: cateogory.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            cateogory.name
        );
        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new category with repeated name", async () => {
        expect(async () => {
            const cateogory = {
                name: "Category test",
                description: "Category description test",
            };
            await createCategoryUseCase.execute({
                name: cateogory.name,
                description: cateogory.description,
            });

            await createCategoryUseCase.execute({
                name: cateogory.name,
                description: cateogory.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
