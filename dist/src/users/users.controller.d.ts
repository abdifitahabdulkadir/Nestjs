import { CreateUserDTO, UpdateUserDTO } from "./users.dto";
import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getUsers(role?: "admin" | "maanger" | "interns" | "engineer"): {
        id: number;
        name: string;
        email: string;
        role: string;
    }[];
    findInterns(): {
        id: number;
        name: string;
        email: string;
        role: string;
    }[];
    findOne(id: number): {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    updateUser(id: number, user: UpdateUserDTO): {
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    delete(id: number): {
        id: number;
        name: string;
        email: string;
        role: string;
    }[];
    createUser(user: CreateUserDTO): {
        message: string;
    };
}
