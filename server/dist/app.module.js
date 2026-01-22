"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _appcontroller = require("./app.controller");
const _appservice = require("./app.service");
const _tasksmodule = require("./tasks/tasks.module");
const _config = require("@nestjs/config");
const _typeorm = require("@nestjs/typeorm");
const _taskentity = require("./tasks/entities/task.entity");
const _usersmodule = require("./users/users.module");
const _userentity = require("./users/entities/user.entity");
const _authmodule = require("./auth/auth.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _config.ConfigModule.forRoot(),
            _typeorm.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'localhost',
                port: 5432,
                username: 'admin',
                password: 'password123',
                database: 'taskdb',
                entities: [
                    _taskentity.Task,
                    _userentity.User
                ],
                synchronize: true
            }),
            _tasksmodule.TasksModule,
            _usersmodule.UsersModule,
            _authmodule.AuthModule
        ],
        controllers: [
            _appcontroller.AppController
        ],
        providers: [
            _appservice.AppService
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map