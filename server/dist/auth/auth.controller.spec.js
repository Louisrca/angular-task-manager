"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _authcontroller = require("./auth.controller");
const _authservice = require("./auth.service");
describe('AuthController', ()=>{
    let controller;
    const mockAuthService = {
        login: jest.fn(),
        register: jest.fn()
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _authcontroller.AuthController
            ],
            providers: [
                {
                    provide: _authservice.AuthService,
                    useValue: mockAuthService
                }
            ]
        }).compile();
        controller = module.get(_authcontroller.AuthController);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
});

//# sourceMappingURL=auth.controller.spec.js.map