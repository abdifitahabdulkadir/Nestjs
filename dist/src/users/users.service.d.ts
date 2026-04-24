import { CreateUserDTO, UpdateUserDTO } from "./users.dto";
export declare class UsersService {
    private users;
    getAllUsers(role?: "admin" | "maanger" | "interns" | "engineer"): {
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
    delete(id: number): {
        id: number;
        name: string;
        email: string;
        role: string;
    }[];
    update(id: number, user: UpdateUserDTO): {
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    createUser(user: CreateUserDTO): {
        message: string;
    };
}
