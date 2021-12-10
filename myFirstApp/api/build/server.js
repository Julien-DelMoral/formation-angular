"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("./helpers/logger");
const environment_1 = __importDefault(require("./environments/environment"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// Routes Imports
const fruitRoutes_1 = __importDefault(require("./routes/fruitRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const socket_1 = require("./helpers/socket");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.logger = logger_1.Logger.getInstance();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || environment_1.default.app.port);
        this.logger.config();
        this.app.use((0, morgan_1.default)('custom', {
            skip: function (req, res) {
                if (req.method == 'OPTIONS')
                    return true;
                return false;
            }
        }));
        this.app.use((0, cors_1.default)({
            origin: [environment_1.default.app.frontUrl],
            credentials: true
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    }
    routes() {
        this.app.use('/api/fruits/', fruitRoutes_1.default);
        this.app.use('/api/login/', userRoutes_1.default);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            var server = http_1.default.createServer(this.app);
            server.listen(this.app.get('port'), () => __awaiter(this, void 0, void 0, function* () {
                this.logger.printLog(logger_1.LogStyle.succes, 'Server listening on port ' + this.app.get('port'));
            }));
            var socket = yield socket_1.Socket.getInstance();
            socket.generate(server);
        });
    }
}
const server = new Server();
server.start();
