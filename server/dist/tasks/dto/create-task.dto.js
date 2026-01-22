"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateTaskDto", {
    enumerable: true,
    get: function() {
        return CreateTaskDto;
    }
});
const _classvalidator = require("class-validator");
const _swagger = require("@nestjs/swagger");
const _taskstatusenum = require("../entities/task-status.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateTaskDto = class CreateTaskDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Le titre de la tâche',
        example: 'Apprendre NestJS'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateTaskDto.prototype, "title", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Une description optionnelle',
        example: 'Lire la documentation officielle',
        required: false
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateTaskDto.prototype, "description", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        enum: _taskstatusenum.TaskStatus,
        description: 'Statut initial de la tâche',
        example: _taskstatusenum.TaskStatus.PENDING,
        required: false
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_taskstatusenum.TaskStatus),
    _ts_metadata("design:type", typeof _taskstatusenum.TaskStatus === "undefined" ? Object : _taskstatusenum.TaskStatus)
], CreateTaskDto.prototype, "status", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'ID de l\'utilisateur cible (Optionnel - Réservé aux Admins)',
        example: 2,
        required: false
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreateTaskDto.prototype, "targetUserId", void 0);

//# sourceMappingURL=create-task.dto.js.map