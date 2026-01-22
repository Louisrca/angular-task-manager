"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _tasksservice = require("./tasks.service");
const _typeorm = require("@nestjs/typeorm");
const _taskentity = require("./entities/task.entity");
const _roleenum = require("../users/entities/role.enum");
describe('TasksService', ()=>{
    let service;
    const mockTaskRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        merge: jest.fn(),
        remove: jest.fn()
    };
    const mockUser = {
        userId: 1,
        role: _roleenum.UserRole.USER
    };
    const mockAdmin = {
        userId: 2,
        role: _roleenum.UserRole.ADMIN
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _tasksservice.TasksService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_taskentity.Task),
                    useValue: mockTaskRepository
                }
            ]
        }).compile();
        service = module.get(_tasksservice.TasksService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=tasks.service.spec.js.map