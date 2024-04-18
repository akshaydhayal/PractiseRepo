import { Games, Authors, Reviews } from "./db.js";
export const resolvers = {
    Query: {
        games() {
            return Games;
        },
        authors() {
            return Authors;
        },
        reviews() {
            return Reviews;
        }
    }
};
