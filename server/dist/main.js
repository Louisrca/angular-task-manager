"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _swagger = require("@nestjs/swagger");
const _common = require("@nestjs/common");
const _httpexceptionfilter = require("./common/filters/http-exception.filter");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    app.useGlobalPipes(new _common.ValidationPipe());
    app.useGlobalInterceptors(new _common.ClassSerializerInterceptor(app.get(_core.Reflector)));
    app.useGlobalFilters(new _httpexceptionfilter.AllExceptionsFilter());
    app.enableCors();
    // 3. Config Swagger
    const config = new _swagger.DocumentBuilder().setTitle('Task API').setDescription('API de gestion des tâches').setVersion('1.0').build();
    const document = _swagger.SwaggerModule.createDocument(app, config);
    _swagger.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();

//# sourceMappingURL=main.js.map