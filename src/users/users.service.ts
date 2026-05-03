import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async getAllUsers(role?: "admin" | "maanger" | "interns" | "engineer") {
    const foundUesrs = await this.db.employee.findMany({
      where: {
        ...(role && { role: role as Prisma.EmployeeCreateInput["role"] }),
        role: role as Prisma.EmployeeCreateInput["role"],
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    if (foundUesrs.length !== 0) return foundUesrs;
    throw new NotFoundException("Users with given Role  are not found");
  }

  async findInterns() {
    const foundUesrs = await this.db.employee.findMany({
      where: {
        role: "interns" as Prisma.EmployeeCreateInput["role"],
      },
    });
    if (foundUesrs.length !== 0) return foundUesrs;
    throw new NotFoundException("Users with given Role  are not found");
  }

  async findOne(id: number) {
    const user = await this.db.employee.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException("User with Given Id not found");
    }
    return user;
  }

  async delete(id: number) {
    const foundUser = await this.findOne(id);
    if (!foundUser) {
      throw new NotFoundException("User with Given Id not found");
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

  async update(id: number, user: Prisma.EmployeeUpdateInput) {
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

  async createUser(user: Prisma.EmployeeCreateInput) {
    const result = await this.db.employee.create({
      data: user,
    });
    return {
      message: "User created successfully",
      user: await this.findOne(result.id),
    };
  }
}
