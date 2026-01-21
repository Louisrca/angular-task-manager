"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _taskscontroller = require("./tasks.controller");
const _tasksservice = require("./tasks.service");
describe('TasksController', ()=>{
    let controller;
    const mockTasksService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn()
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _taskscontroller.TasksController
            ],
            providers: [
                {
                    provide: _tasksservice.TasksService,
                    useValue: mockTasksService
                }
            ]
        }).compile();
        controller = module.get(_taskscontroller.TasksController);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
});

//# sourceMappingURL=tasks.controller.spec.js.map