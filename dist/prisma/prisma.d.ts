import { PrismaClient } from "./generated/client";
declare global {
    var __prisma: PrismaClient | undefined;
}
export declare const prisma: PrismaClient<import("prisma/generated").Prisma.PrismaClientOptions, never, import("prisma/generated/runtime/client").DefaultArgs>;
