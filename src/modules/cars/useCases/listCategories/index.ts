import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./listCategoriesControllers";
import { ListCategoriesUseCase } from "./listCategoriesUseCase";

const categoriesRepository = new CategoriesRepository();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
);

export { listCategoriesController };
