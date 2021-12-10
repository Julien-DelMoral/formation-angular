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
exports.Socket = void 0;
const moment_1 = __importDefault(require("moment"));
const logger_1 = require("./helpers/logger");
const environment_1 = __importDefault(require("./environments/environment"));
var logger = logger_1.Logger.getInstance();
moment_1.default.locale('fr');
class Socket {
    constructor() { }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Socket.instance) {
                Socket.instance = new Socket;
            }
            return Socket.instance;
        });
    }
    generate(server) {
        this.socket = require('socket.io')(server, {
            cors: {
                origin: environment_1.default.app.frontUrl
            }
        });
        this.socket.on('connection', (socket) => {
            logger.printLog(logger_1.LogStyle.succes, 'Clients connected');
            socket.on('disconnect', function () {
                logger.printLog(logger_1.LogStyle.succes, 'Clients disconnected');
            });
            socket.on('end', function () {
                socket.disconnect(0);
            });
        });
    }
}
exports.Socket = Socket;
