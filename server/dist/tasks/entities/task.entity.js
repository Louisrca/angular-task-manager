"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Task", {
    enumerable: true,
    get: function() {
        return Task;
    }
});
const _typeorm = require("typeorm");
const _swagger = require("@nestjs/swagger");
const _userentity = require("../../users/entities/user.entity");
const _taskstatusenum = require("./task-status.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let Task = class Task {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)(),
    (0, _swagger.ApiProperty)({
        example: 1,
        description: 'ID unique'
    }),
    _ts_metadata("design:type", Number)
], Task.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    (0, _swagger.ApiProperty)({
        example: 'Faire les courses',
        description: 'Titre de la tâche'
    }),
    _ts_metadata("design:type", String)
], Task.prototype, "title", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    (0, _swagger.ApiProperty)({
        example: 'Acheter du lait',
        description: 'Détails'
    }),
    _ts_metadata("design:type", String)
], Task.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _taskstatusenum.TaskStatus,
        default: _taskstatusenum.TaskStatus.PENDING
    }),
    (0, _swagger.ApiProperty)({
        enum: _taskstatusenum.TaskStatus,
        description: 'Statut de la tâche'
    }),
    _ts_metadata("design:type", typeof _taskstatusenum.TaskStatus === "undefined" ? Object : _taskstatusenum.TaskStatus)
], Task.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)(),
    (0, _swagger.ApiProperty)({
        example: '2024-01-15T12:00:00Z',
        description: 'Date de création'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Task.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)(),
    (0, _swagger.ApiProperty)({
        example: '2024-01-15T12:30:00Z',
        description: 'Dernière modification'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Task.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User, (user)=>user.tasks, {
        eager: false
    }),
    (0, _swagger.ApiProperty)({
        type: ()=>_userentity.User,
        description: 'L\'utilisateur assigné à la tâche'
    }),
    _ts_metadata("design:type", typeof _userentity.User === "undefined" ? Object : _userentity.User)
], Task.prototype, "user", void 0);
Task = _ts_decorate([
    (0, _typeorm.Entity)()
], Task);

//# sourceMappingURL=task.entity.js.map