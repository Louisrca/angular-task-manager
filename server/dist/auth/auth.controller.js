"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _common = require("@nestjs/common");
const _authservice = require("./auth.service");
const _passport = require("@nestjs/passport");
const _authdto = require("./dto/auth.dto");
const _swagger = require("@nestjs/swagger");
const _loginresponsedto = require("./dto/login-response.dto");
const _userentity = require("../users/entities/user.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AuthController = class AuthController {
    async login(req) {
        return this.authService.login(req.user);
    }
    async register(authDto) {
        return this.authService.register(authDto);
    }
    constructor(authService){
        this.authService = authService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)((0, _passport.AuthGuard)('local')),
    (0, _common.Post)('login'),
    (0, _swagger.ApiBody)({
        type: _authdto.AuthDto
    }),
    (0, _swagger.ApiOperation)({
        summary: 'Se connecter (Obtenir un Token JWT)'
    }),
    (0, _swagger.ApiResponse)({
        status: 201,
        description: 'Connexion réussie.',
        type: _loginresponsedto.LoginResponseDto
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        description: 'Identifiants incorrects.'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
_ts_decorate([
    (0, _common.Post)('register'),
    (0, _swagger.ApiOperation)({
        summary: "S'inscrire (Créer un nouveau compte)"
    }),
    (0, _swagger.ApiResponse)({
        status: 201,
        description: 'Utilisateur créé avec succès.',
        type: _userentity.User
    }),
    (0, _swagger.ApiResponse)({
        status: 400,
        description: 'Données invalides (mot de passe trop court, etc.).'
    }),
    (0, _swagger.ApiResponse)({
        status: 409,
        description: "Nom d'utilisateur déjà pris."
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authdto.AuthDto === "undefined" ? Object : _authdto.AuthDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = _ts_decorate([
    (0, _swagger.ApiTags)('Authentification'),
    (0, _common.Controller)('auth'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService
    ])
], AuthController);

//# sourceMappingURL=auth.controller.js.map