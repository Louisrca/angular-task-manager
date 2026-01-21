"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TasksController", {
    enumerable: true,
    get: function() {
        return TasksController;
    }
});
const _common = require("@nestjs/common");
const _tasksservice = require("./tasks.service");
const _createtaskdto = require("./dto/create-task.dto");
const _updatetaskdto = require("./dto/update-task.dto");
const _swagger = require("@nestjs/swagger");
const _jwtauthguard = require("../auth/jwt-auth.guard");
const _rolesguard = require("../auth/roles.guard");
const _taskentity = require("./entities/task.entity");
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
let TasksController = class TasksController {
    create(createTaskDto, req) {
        return this.tasksService.create(createTaskDto, req.user);
    }
    findAll(req) {
        return this.tasksService.findAll(req.user);
    }
    findOne(id, req) {
        return this.tasksService.findOne(id, req.user);
    }
    update(id, updateTaskDto, req) {
        return this.tasksService.update(id, updateTaskDto, req.user);
    }
    remove(id, req) {
        return this.tasksService.remove(id, req.user);
    }
    constructor(tasksService){
        this.tasksService = tasksService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _swagger.ApiOperation)({
        summary: 'Créer une tâche'
    }),
    (0, _swagger.ApiResponse)({
        status: 201,
        description: 'La tâche a été créée avec succès.',
        type: _taskentity.Task
    }),
    (0, _swagger.ApiResponse)({
        status: 400,
        description: 'Données invalides.'
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        description: 'Non authentifié.'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createtaskdto.CreateTaskDto === "undefined" ? Object : _createtaskdto.CreateTaskDto,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], TasksController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    (0, _swagger.ApiOperation)({
        summary: 'Récupérer toutes les tâches visibles'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Liste des tâches (filtrées selon le rôle).',
        type: [
            _taskentity.Task
        ]
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        description: 'Non authentifié.'
    }),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], TasksController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    (0, _swagger.ApiOperation)({
        summary: 'Récupérer une tâche par son ID'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'La tâche demandée.',
        type: _taskentity.Task
    }),
    (0, _swagger.ApiResponse)({
        status: 403,
        description: 'Accès interdit (cette tâche ne vous appartient pas).'
    }),
    (0, _swagger.ApiResponse)({
        status: 404,
        description: 'Tâche non trouvée.'
    }),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], TasksController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    (0, _swagger.ApiOperation)({
        summary: 'Mettre à jour une tâche'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'La tâche mise à jour.',
        type: _taskentity.Task
    }),
    (0, _swagger.ApiResponse)({
        status: 403,
        description: 'Accès interdit.'
    }),
    (0, _swagger.ApiResponse)({
        status: 404,
        description: 'Tâche non trouvée.'
    }),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof _updatetaskdto.UpdateTaskDto === "undefined" ? Object : _updatetaskdto.UpdateTaskDto,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], TasksController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _swagger.ApiOperation)({
        summary: 'Supprimer une tâche'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Tâche supprimée avec succès.'
    }),
    (0, _swagger.ApiResponse)({
        status: 403,
        description: 'Accès interdit.'
    }),
    (0, _swagger.ApiResponse)({
        status: 404,
        description: 'Tâche non trouvée.'
    }),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        void 0
    ]),
    _ts_metadata("design:returntype", void 0)
], TasksController.prototype, "remove", null);
TasksController = _ts_decorate([
    (0, _swagger.ApiTags)('Tâches'),
    (0, _swagger.ApiBearerAuth)(),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard, _rolesguard.RolesGuard),
    (0, _common.Controller)('tasks'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _tasksservice.TasksService === "undefined" ? Object : _tasksservice.TasksService
    ])
], TasksController);

//# sourceMappingURL=tasks.controller.js.map