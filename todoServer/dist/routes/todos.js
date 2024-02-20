var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { Todo } from "../db/models.js";
import { userAuth } from "../middlewares/auth.js";
import bodyParser from "body-parser";
export const router = express.Router();
router.use(bodyParser.json());
router.post("/", userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = new Todo(Object.assign(Object.assign({}, req.body), { userId: req.headers.userId }));
    const resp = yield todo.save();
    console.log(resp);
    res.status(201).json({ msg: "Todo created!!", todo: resp });
}));
router.get("/", userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield Todo.find({ userId: req.headers.userId });
    res.status(201).json(todos);
}));
router.get("/:todoId", userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield Todo.find({ _id: req.params.todoId, userId: req.headers.userId });
    if (todo) {
        res.status(201).json(todo);
    }
    else {
        res.status(403).json({ msg: "Todo doesn't exists!!" });
    }
}));
router.put("/:todoId", userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield Todo.findOneAndUpdate({ _id: req.params.todoId, userId: req.headers.userId }, req.body, {
        returnDocument: "after"
    });
    console.log(updated);
    if (updated) {
        res.status(201).json({ msg: 'todo updated!!', updatedTodo: updated });
    }
    else {
        res.status(403).json({ msg: 'Todo not updated!!' });
    }
}));
router.delete("/:todoId", userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteStatus = yield Todo.findOneAndDelete({ _id: req.params.todoId, userId: req.headers.userId });
    // await Todo.findByIdAndDelete(req.params.todoId);
    if (deleteStatus) {
        res.status(201).json({ msg: "Todo deleted!!" });
    }
    else {
        res.status(403).json({ msg: "Todo not deleted!!" });
    }
}));
