"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    users = [
        {
            id: 1,
            name: "Amina Yusuf",
            email: "amina.yusuf@example.com",
            role: "admin",
        },
        {
            id: 2,
            name: "Daniel Kim",
            email: "daniel.kim@example.com",
            role: "engineer",
        },
        {
            id: 3,
            name: "Sophia Martinez",
            email: "sophia.martinez@example.com",
            role: "manager",
        },
        {
            id: 4,
            name: "Omar Hassan",
            email: "omar.hassan@example.com",
            role: "engineer",
        },
        {
            id: 5,
            name: "Priya Nair",
            email: "priya.nair@example.com",
            role: "admin",
        },
        {
            id: 6,
            name: "Ethan Brown",
            email: "ethan.brown@example.com",
            role: "manager",
        },
        {
            id: 7,
            name: "Linh Nguyen",
            email: "linh.nguyen@example.com",
            role: "interns",
        },
        {
            id: 8,
            name: "Grace Okafor",
            email: "grace.okafor@example.com",
            role: "manager",
        },
        {
            id: 9,
            name: "Noah Wilson",
            email: "noah.wilson@example.com",
            role: "interns",
        },
        {
            id: 10,
            name: "Fatima Ali",
            email: "fatima.ali@example.com",
            role: "admin",
        },
    ];
    getAllUsers(role) {
        if (role) {
            const foundUesrs = this.users.filter((eachUser) => eachUser.role === role);
            if (foundUesrs.length !== 0)
                return foundUesrs;
            throw new common_1.NotFoundException("Users with given Role  are not found");
        }
        return this.users;
    }
    findInterns() {
        return this.users.filter((eachUser) => eachUser.role === "interns");
    }
    findOne(id) {
        const user = this.users.find((each) => each.id === id);
        if (!user) {
            throw new common_1.NotFoundException("User with Given Id not found");
        }
        return user;
    }
    delete(id) {
        return this.users.filter((each) => each.id !== id);
    }
    update(id, user) {
        this.users.map((each) => (each.id === id ? { ...each, ...user } : each));
        return {
            message: "updated Successfully",
            user: this.findOne(id),
        };
    }
    createUser(user) {
        this.users.push({
            ...user,
            id: 5,
        });
        console.log(user);
        return {
            message: "Successfully Created A user",
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map