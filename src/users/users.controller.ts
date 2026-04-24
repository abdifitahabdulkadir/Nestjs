import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserDTO, UpdateUserDTO } from "./users.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(@Query("role") role?: "admin" | "maanger" | "interns" | "engineer") {
    return this.userService.getAllUsers(role);
  }

  @Get("interns")
  findInterns() {
    return this.userService.findInterns();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe)
    user: UpdateUserDTO,
  ) {
    return this.userService.update(id, user);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @Post()
  createUser(
    @Body(ValidationPipe)
    user: CreateUserDTO,
  ) {
    return this.userService.createUser(user);
  }
}
