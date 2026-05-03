import { ConsoleLogger } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import "dotenv/config";
import { AppModule } from "./app.module";
import { ALLExceptionFilter } from "./exception.fitler";

function parseAllowedOrigins(): string[] {
  const raw = "localhost:3000, localhost:3001";
  return raw
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: "API",
      json: true,
      colors: true,
      compact: true,
    }),
  });
  app.setGlobalPrefix("api");
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ALLExceptionFilter(httpAdapter));

  const allowedOrigins = parseAllowedOrigins();
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        // allow all origins without an error
        callback(null, true);
        return;
      }

      if (allowedOrigins.length === 0) {
        callback(
          new Error(
            "CORS: set CORS_ORIGINS (comma-separated) to allow browser origins",
          ),
        );
        return;
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin not allowed: ${origin}`));
      }
    },
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
