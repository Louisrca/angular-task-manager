"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TasksService", {
    enumerable: true,
    get: function() {
        return TasksService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _taskentity = require("./entities/task.entity");
const _roleenum = require("../users/entities/role.enum");
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
let TasksService = class TasksService {
    async create(createTaskDto, user) {
        let targetId = user.userId;
        // Si l'utilisateur est ADMIN et qu'il spécifie un ID cible, on utilise cet ID
        if (user.role === _roleenum.UserRole.ADMIN && createTaskDto.targetUserId) {
            targetId = createTaskDto.targetUserId;
        }
        // On crée la tâche en l'associant à l'ID déterminé
        const { targetUserId, ...taskData } = createTaskDto; // On retire targetUserId des données de la tâche
        const task = this.tasksRepository.create({
            ...taskData,
            user: {
                id: targetId
            }
        });
        const savedTask = await this.tasksRepository.save(task);
        const { user: owner, ...result } = savedTask;
        return result;
    }
    async findAll(user) {
        if (user.role === _roleenum.UserRole.ADMIN) {
            return this.tasksRepository.find({
                order: {
                    id: 'DESC'
                },
                relations: [
                    'user'
                ]
            });
        }
        // Si User, seulement les siennes
        return this.tasksRepository.find({
            where: {
                user: {
                    id: user.userId
                }
            },
            order: {
                id: 'DESC'
            },
            relations: [
                'user'
            ]
        });
    }
    async findOne(id, user) {
        const task = await this.tasksRepository.findOne({
            where: {
                id
            },
            relations: [
                'user'
            ]
        });
        if (!task) throw new _common.NotFoundException(`Task #${id} not found`);
        if (user.role !== _roleenum.UserRole.ADMIN && task.user?.id !== user.userId) {
            throw new _common.ForbiddenException('You do not have permission to access this task');
        }
        return task;
    }
    async update(id, updateTaskDto, user) {
        const task = await this.findOne(id, user); // Vérifie l'existence et les droits
        const { targetUserId, ...updateData } = updateTaskDto;
        // Gestion de la réassignation (Admin seulement)
        if (targetUserId && user.role === _roleenum.UserRole.ADMIN) {
            task.user = {
                id: targetUserId
            };
        }
        this.tasksRepository.merge(task, updateData);
        return this.tasksRepository.save(task);
    }
    async remove(id, user) {
        const task = await this.findOne(id, user); // Vérifie l'existence et les droits
        return this.tasksRepository.remove(task);
    }
    constructor(tasksRepository){
        this.tasksRepository = tasksRepository;
    }
};
TasksService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_taskentity.Task)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], TasksService);

//# sourceMappingURL=tasks.service.js.map