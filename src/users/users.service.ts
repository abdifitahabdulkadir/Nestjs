import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO, UpdateUserDTO } from "./users.dto";

@Injectable()
export class UsersService {
  private users = [
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

  getAllUsers(role?: "admin" | "maanger" | "interns" | "engineer") {
    if (role) {
      const foundUesrs = this.users.filter(
        (eachUser) => eachUser.role === role,
      );
      if (foundUesrs.length !== 0) return foundUesrs;
      throw new NotFoundException("Users with given Role  are not found");
    }
    return this.users;
  }

  findInterns() {
    return this.users.filter((eachUser) => eachUser.role === "interns");
  }

  findOne(id: number) {
    const user = this.users.find((each) => each.id === id);

    if (!user) {
      throw new NotFoundException("User with Given Id not found");
    }
    return user;
  }

  delete(id: number) {
    return this.users.filter((each) => each.id !== id);
  }

  update(id: number, user: UpdateUserDTO) {
    this.users.map((each) => (each.id === id ? { ...each, ...user } : each));
    return {
      message: "updated Successfully",
      user: this.findOne(id),
    };
  }

  createUser(user: CreateUserDTO) {
    this.users.push({
      ...user,
      id: 5,
    });
    console.log(user);
    return {
      message: "Successfully Created A user",
    };
  }
}
