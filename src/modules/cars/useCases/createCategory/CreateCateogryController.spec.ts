import { hash } from "bcryptjs";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

describe("Create Category Controller", () => {
    beforeEach(async () => {
        const connection = await createConnection();

        const id = uuid();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
                values ('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXXX')
            `
        );
    });

    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        console.log(responseToken.body);

        const response = await request(app).get("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest",
        });

        expect(response.status).toBe(201);
    });
});
