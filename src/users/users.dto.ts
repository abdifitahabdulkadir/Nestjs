import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsEnum, IsString } from "class-validator";

export class CreateUserDTO {
  @IsString({
    message: "Please provide Good Name",
  })
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(["admin", "manager", "interns", "engineer"], {
    message: "Valid ROle is Ruquired",
  })
  role: "admin" | "manager" | "interns" | "engineer";
}
export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
