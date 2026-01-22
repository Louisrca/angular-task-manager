"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoginResponseDto", {
    enumerable: true,
    get: function() {
        return LoginResponseDto;
    }
});
const _swagger = require("@nestjs/swagger");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LoginResponseDto = class LoginResponseDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Le token JWT à utiliser pour les prochaines requêtes (Bearer Token)',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoyLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NTcyODkzMDQsImV4cCI6MTY1NzI5MjkwNH0.TOKEN_SIGNATURE'
    }),
    _ts_metadata("design:type", String)
], LoginResponseDto.prototype, "access_token", void 0);

//# sourceMappingURL=login-response.dto.js.map