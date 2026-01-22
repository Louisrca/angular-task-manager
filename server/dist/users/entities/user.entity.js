"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "User", {
    enumerable: true,
    get: function() {
        return User;
    }
});
const _typeorm = require("typeorm");
const _swagger = require("@nestjs/swagger");
const _roleenum = require("./role.enum");
const _taskentity = require("../../tasks/entities/task.entity");
const _classtransformer = require("class-transformer");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let User = class User {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    (0, _swagger.ApiProperty)({
        example: 1,
        description: 'ID unique'
    }),
    _ts_metadata("design:type", Number)
], User.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true
    }),
    (0, _swagger.ApiProperty)({
        example: 'john_doe',
        description: 'Nom d\'utilisateur unique'
    }),
    _ts_metadata("design:type", String)
], User.prototype, "username", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    (0, _classtransformer.Exclude)(),
    _ts_metadata("design:type", String)
], User.prototype, "password", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _roleenum.UserRole,
        default: _roleenum.UserRole.USER
    }),
    (0, _swagger.ApiProperty)({
        enum: _roleenum.UserRole,
        description: 'Rôle de l\'utilisateur'
    }),
    _ts_metadata("design:type", typeof _roleenum.UserRole === "undefined" ? Object : _roleenum.UserRole)
], User.prototype, "role", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_taskentity.Task, (task)=>task.user),
    _ts_metadata("design:type", Array)
], User.prototype, "tasks", void 0);
User = _ts_decorate([
    (0, _typeorm.Entity)()
], User);

//# sourceMappingURL=user.entity.js.map