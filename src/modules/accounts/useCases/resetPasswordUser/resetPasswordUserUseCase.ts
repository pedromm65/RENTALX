import { injectable } from "tsyringe";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    async execute() {
        //
    }
}

export { ResetPasswordUserUseCase };
