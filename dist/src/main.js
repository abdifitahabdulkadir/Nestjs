"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
require("dotenv/config");
const app_module_1 = require("./app.module");
const exception_fitler_1 = require("./exception.fitler");
function parseAllowedOrigins() {
    const raw = "localhost:3000, localhost:3001";
    return raw
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new common_1.ConsoleLogger({
            prefix: "API",
            json: true,
            colors: true,
            compact: true,
        }),
    });
    app.setGlobalPrefix("api");
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new exception_fitler_1.ALLExceptionFilter(httpAdapter));
    const allowedOrigins = parseAllowedOrigins();
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin) {
                callback(null, true);
                return;
            }
            if (allowedOrigins.length === 0) {
                callback(new Error("CORS: set CORS_ORIGINS (comma-separated) to allow browser origins"));
                return;
            }
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error(`CORS: origin not allowed: ${origin}`));
            }
        },
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map