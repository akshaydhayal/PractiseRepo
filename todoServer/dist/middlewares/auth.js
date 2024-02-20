var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
export const userSecret = "user";
export const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.token) {
        return res.status(403);
    }
    const token = req.headers.token;
    const decoded = yield jwt.verify(token, userSecret);
    console.log("decoded: " + JSON.stringify(decoded));
    if (decoded && typeof (decoded) != "string") {
        req.headers.userId = decoded.id; //trick to store id in headers, ts will not complain this
        // req.userId=decoded.id;
        next();
    }
    else {
        res.status(403).json({ msg: "Usera uth failed!!" });
    }
});
