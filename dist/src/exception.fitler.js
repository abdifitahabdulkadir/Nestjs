"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const client_1 = require("@prisma/client/runtime/client");
let ALLExceptionFilter = class ALLExceptionFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        let myResponseObject = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            response: "Internal Server Error",
            path: request.url,
        };
        if (exception instanceof common_1.HttpException) {
            console.log("HttpException");
            myResponseObject.statusCode = exception.getStatus();
            myResponseObject.response = exception.getResponse();
        }
        else if (exception instanceof client_1.PrismaClientValidationError) {
            console.log("PrismaClientValidationError");
            myResponseObject.statusCode = 422;
            myResponseObject.response = exception.message.replace(/\n/g, "");
        }
        else {
            myResponseObject.statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            myResponseObject.response = "Internal Server Error";
        }
        response.status(myResponseObject.statusCode).json(myResponseObject);
        super.catch(exception, host);
    }
};
exports.ALLExceptionFilter = ALLExceptionFilter;
exports.ALLExceptionFilter = ALLExceptionFilter = __decorate([
    (0, common_1.Catch)()
], ALLExceptionFilter);
//# sourceMappingURL=exception.fitler.js.map