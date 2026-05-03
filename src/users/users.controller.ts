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

import { SkipThrottle, Throttle } from "@nestjs/throttler";
import { Prisma } from "@prisma/client";
import { UsersService } from "./users.service.js";

// this skips the default throttling for this controller ( and all its routes)
@SkipThrottle()
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // becasue w disabled it in controller level.( default:true)
  // so we need to enable it for this route.
  @SkipThrottle({ default: false })
  @Get()
  getUsers(@Query("role") role?: "admin" | "maanger" | "interns" | "engineer") {
    return this.userService.getAllUsers(role);
  }

  @Get("interns")
  findInterns() {
    return this.userService.findInterns();
  }

  // overwrite this route for defined throllers we have set in the global.
  @Throttle({
    short: {
      limit: 2,
      ttl: 1000, // 1 second
    },
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe)
    user: Prisma.EmployeeUpdateInput,
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
    user: Prisma.EmployeeCreateInput,
  ) {
    return this.userService.createUser(user);
  }
}
