import { Prisma } from "@prisma/client";
import { DatabaseService } from "../database/database.service";
export declare class UsersService {
    private readonly db;
    constructor(db: DatabaseService);
    getAllUsers(role?: "admin" | "maanger" | "interns" | "engineer"): Promise<{
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
    delete(id: number): Promise<{
        message: string;
    }>;
    update(id: number, user: Prisma.EmployeeUpdateInput): Promise<{
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
