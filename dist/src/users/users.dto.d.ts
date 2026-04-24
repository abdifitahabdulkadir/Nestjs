export declare class CreateUserDTO {
    name: string;
    email: string;
    role: "admin" | "manager" | "interns" | "engineer";
}
declare const UpdateUserDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDTO>>;
export declare class UpdateUserDTO extends UpdateUserDTO_base {
}
export {};
