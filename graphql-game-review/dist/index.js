var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { resolvers } from './resolvers.js';
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.js";
dotenv.config();
const Server = new ApolloServer({
    typeDefs,
    resolvers
});
const port = Number(process.env.PORT) || 3001;
function connectserver() {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = yield startStandaloneServer(Server, {
            listen: { port: port }
        });
        console.log("server is runnig at 3001");
    });
}
connectserver();
