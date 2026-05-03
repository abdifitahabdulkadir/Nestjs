import { Prisma } from "@prisma/client";
import { UsersService } from "./users.service.js";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getUsers(role?: "admin" | "maanger" | "interns" | "engineer"): Promise<{
        id: number;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.ROLE;
    }[]>;
    findInterns(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.ROLE;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.ROLE;
    }>;
    updateUser(id: number, user: Prisma.EmployeeUpdateInput): Promise<{
        message: string;
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.ROLE;
        };
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
    createUser(user: Prisma.EmployeeCreateInput): Promise<{
        message: string;
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.ROLE;
        };
    }>;
}
