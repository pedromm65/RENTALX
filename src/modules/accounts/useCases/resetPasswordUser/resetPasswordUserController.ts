import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./resetPasswordUserUseCase";

class ResetPasswordUserController {
    async handle(request: Request, response: Response) {
        const resetPasswordUserUseCase = container.resolve(
            ResetPasswordUserUseCase
        );
    }
}

export { ResetPasswordUserController };
