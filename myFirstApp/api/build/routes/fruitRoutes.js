"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fruitController_1 = require("./../controllers/fruitController");
const express_1 = require("express");
class FruitRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("", fruitController_1.fruitController.getFruits);
        this.router.get("/:id", fruitController_1.fruitController.getFruit);
        this.router.put("/:id", fruitController_1.fruitController.putFruit);
    }
}
const fruitRoutes = new FruitRoutes();
exports.default = fruitRoutes.router;
