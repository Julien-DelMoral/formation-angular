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
exports.fruitController = exports.FruitController = void 0;
const guid_typescript_1 = require("guid-typescript");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var data = [
    { id: guid_typescript_1.Guid.create().toString(), n: "Banane", em: true, p: 2, c: "jaune", dc: new Date(2021, 11, 9), d: "description méga trop long" },
    { id: guid_typescript_1.Guid.create().toString(), n: "Pomme", em: false, p: 0.5, c: "jaune" },
    { id: guid_typescript_1.Guid.create().toString(), n: "Kiwi", em: true, p: 0.2, c: "rouge" },
];
class FruitController {
    getFruit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var id = req.params.id;
            var dto = data.find(c => c.id == id);
            res.send(dto);
        });
    }
    getFruits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(data.map((e) => ({ id: e.id, l: e.n, d: e.p + " Kg" })));
        });
    }
    putFruit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({ error: 'unauthorized' });
            }
            jsonwebtoken_1.default.verify(token, "my_secret", function (err, decoded) {
                if (err) {
                    console.log('Invalid token');
                    return res.status(401).json(err);
                }
            });
            var id = req.params.id;
            var newFruit = req.body;
            var fruit = data.find(fruit => fruit.id == id);
            if (fruit) {
                Object.assign(fruit, newFruit);
                res.send(fruit);
            }
            else {
                res.status(500).json({ error: "Ce fruit n'existe pas" });
            }
        });
    }
}
exports.FruitController = FruitController;
exports.fruitController = new FruitController();
