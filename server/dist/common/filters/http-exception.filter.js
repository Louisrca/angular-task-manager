"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AllExceptionsFilter", {
    enumerable: true,
    get: function() {
        return AllExceptionsFilter;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = _common.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error = 'Internal Server Error';
        if (exception instanceof _common.HttpException) {
            status = exception.getStatus();
            const responseBody = exception.getResponse();
            message = responseBody.message || exception.message;
            error = responseBody.error || 'Http Exception';
        } else if (exception instanceof _typeorm.QueryFailedError) {
            // Gestion spécifique des erreurs TypeORM / Postgres
            const err = exception;
            // Code 23505 = Unique Violation (Doublon)
            if (err.code === '23505') {
                status = _common.HttpStatus.CONFLICT;
                message = 'Username already exists';
                error = 'Conflict';
            } else {
                // Autres erreurs SQL
                this.logger.error(`Database Error: ${err.message}`, err.stack);
            }
        } else {
            // Autres erreurs inconnues
            if (exception instanceof Error) {
                this.logger.error(`Unexpected Error: ${exception.message}`, exception.stack);
            } else {
                this.logger.error(`Unexpected Error: ${exception}`);
            }
        }
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: error,
            message: message
        });
    }
    constructor(){
        this.logger = new _common.Logger(AllExceptionsFilter.name);
    }
};
AllExceptionsFilter = _ts_decorate([
    (0, _common.Catch)()
], AllExceptionsFilter);

//# sourceMappingURL=http-exception.filter.js.map