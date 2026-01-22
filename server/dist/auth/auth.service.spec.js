"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _authservice = require("./auth.service");
const _usersservice = require("../users/users.service");
const _jwt = require("@nestjs/jwt");
describe('AuthService', ()=>{
    let service;
    const mockUsersService = {
        findOne: jest.fn(),
        create: jest.fn()
    };
    const mockJwtService = {
        sign: jest.fn()
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _authservice.AuthService,
                {
                    provide: _usersservice.UsersService,
                    useValue: mockUsersService
                },
                {
                    provide: _jwt.JwtService,
                    useValue: mockJwtService
                }
            ]
        }).compile();
        service = module.get(_authservice.AuthService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=auth.service.spec.js.map