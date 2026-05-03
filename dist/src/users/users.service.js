"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let UsersService = class UsersService {
    db;
    constructor(db) {
        this.db = db;
    }
    async getAllUsers(role) {
        const foundUesrs = await this.db.employee.findMany({
            where: {
                ...(role && { role: role }),
                role: role,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
        if (foundUesrs.length !== 0)
            return foundUesrs;
        throw new common_1.NotFoundException("Users with given Role  are not found");
    }
    async findInterns() {
        const foundUesrs = await this.db.employee.findMany({
            where: {
                role: "interns",
            },
        });
        if (foundUesrs.length !== 0)
            return foundUesrs;
        throw new common_1.NotFoundException("Users with given Role  are not found");
    }
    async findOne(id) {
        const user = await this.db.employee.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException("User with Given Id not found");
        }
        return user;
    }
    async delete(id) {
        const foundUser = await this.findOne(id);
        if (!foundUser) {
            throw new common_1.NotFoundException("User with Given Id not found");
        }
        await this.db.employee.delete({
            where: {
                id,
            },
        });
        return {
            message: "User deleted successfully",
        };
    }
    async update(id, user) {
        await this.db.employee.update({
            where: {
                id,
            },
            data: user,
        });
        return {
            message: "updated Successfully",
            user: await this.findOne(id),
        };
    }
    async createUser(user) {
        const result = await this.db.employee.create({
            data: user,
        });
        return {
            message: "User created successfully",
            user: await this.findOne(result.id),
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersService);
//# sourceMappingURL=users.service.js.map