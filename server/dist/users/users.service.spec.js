"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _usersservice = require("./users.service");
const _typeorm = require("@nestjs/typeorm");
const _userentity = require("./entities/user.entity");
describe('UsersService', ()=>{
    let service;
    const mockUsersRepository = {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn()
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _usersservice.UsersService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userentity.User),
                    useValue: mockUsersRepository
                }
            ]
        }).compile();
        service = module.get(_usersservice.UsersService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=users.service.spec.js.map