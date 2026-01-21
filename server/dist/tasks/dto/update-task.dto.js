"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateTaskDto", {
    enumerable: true,
    get: function() {
        return UpdateTaskDto;
    }
});
const _swagger = require("@nestjs/swagger");
const _createtaskdto = require("./create-task.dto");
const _classvalidator = require("class-validator");
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
let UpdateTaskDto = class UpdateTaskDto extends (0, _swagger.PartialType)(_createtaskdto.CreateTaskDto) {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        enum: _taskstatusenum.TaskStatus,
        description: 'Nouveau statut de la tâche',
        required: false
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_taskstatusenum.TaskStatus),
    _ts_metadata("design:type", typeof _taskstatusenum.TaskStatus === "undefined" ? Object : _taskstatusenum.TaskStatus)
], UpdateTaskDto.prototype, "status", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Réassigner la tâche à un autre ID (Admin seulement)',
        required: false
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], UpdateTaskDto.prototype, "targetUserId", void 0);

//# sourceMappingURL=update-task.dto.js.map