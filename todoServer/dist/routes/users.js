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
import { User } from "../db/models.js";
import jwt from "jsonwebtoken";
import { userAuth, userSecret } from "../middlewares/auth.js";
import bodyParser from "body-parser";
// import {ObjectId} from "mongoose/types/schematypes.js";
export const router = express.Router();
router.use(bodyParser.json());
function generateJwtToken(payload) {
    // function generateJwtToken(payload:{id:ObjectId}){
    return jwt.sign(payload, userSecret);
}
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userExists = yield User.findOne({ username });
    if (userExists) {
        const token = generateJwtToken({ id: userExists._id });
        res.status(403).json({ msg: "User already exists!!", token });
    }
    else {
        const user = new User(req.body);
        yield user.save();
        const token = generateJwtToken({ id: user._id });
        res.status(201).json({ msg: "User created!!", token });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userExists = yield User.findOne({ username, password });
    if (userExists) {
        const token = generateJwtToken({ id: userExists._id });
        res.status(201).json({ msg: 'Login success!!', token });
    }
    else {
        res.status(403).json({ msg: "User login failed!!" });
    }
}));
router.get("/me", userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById(req.headers.userId);
    if (user) {
        res.status(201).json({ username: user.username });
    }
    else {
        res.status(403).json({ msg: "User not logged in!!" });
    }
}));
