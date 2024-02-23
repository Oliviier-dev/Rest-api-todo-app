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
const todo_1 = __importDefault(require("../models/todo"));
const router = express_1.default.Router();
// Get a list of todos from the db
router.get('/todos', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find({});
        res.send(todos);
    }
    catch (err) {
        next(err);
    }
}));
// Add a new todo to the db
router.post('/todos', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todo_1.default.create(req.body);
        res.send(todo);
    }
    catch (err) {
        next(err);
    }
}));
// Update a todo in the db
router.put('/todos/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todo_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body);
        const updatedTodo = yield todo_1.default.findOne({ _id: req.params.id });
        res.send(updatedTodo);
    }
    catch (err) {
        next(err);
    }
}));
// Delete a todo from the db
router.delete('/todos/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo_1.default.findByIdAndDelete({ _id: req.params.id });
        res.send(deletedTodo);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
