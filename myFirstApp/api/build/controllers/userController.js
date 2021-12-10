"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const guid_typescript_1 = require("guid-typescript");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    authenticate(req, res) {
        let payload = {
            sub: guid_typescript_1.Guid.create().toString(),
            name: "Toto",
            update: true
        };
        res.send({
            id: guid_typescript_1.Guid.create().toString(),
            n: "Toto",
            t: jsonwebtoken_1.default.sign(payload, 'my_secret')
        });
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
