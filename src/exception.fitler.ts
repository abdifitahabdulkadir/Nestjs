import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { Request, Response } from "express";

type ResponseObect = {
  statusCode: number;
  timestamp: string;
  response: string | object;
  path: string;
};

@Catch()
export class ALLExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let myResponseObject: ResponseObect = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      response: "Internal Server Error",
      path: request.url,
    };

    // if exception is a HttpException
    if (exception instanceof HttpException) {
      console.log("HttpException");
      myResponseObject.statusCode = exception.getStatus();
      myResponseObject.response = exception.getResponse();
    }

    // if exception is a PrismaClientValidationError
    else if (exception instanceof PrismaClientValidationError) {
      console.log("PrismaClientValidationError");
      myResponseObject.statusCode = 422;
      myResponseObject.response = exception.message.replace(/\n/g, "");
    }

    // if exception is a unknown error
    else {
      myResponseObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObject.response = "Internal Server Error";
    }

    // send the response to the client
    response.status(myResponseObject.statusCode).json(myResponseObject);
    super.catch(exception, host);
  }
}
