"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./../controllers/userController");
const express_1 = require("express");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("", userController_1.userController.authenticate);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
