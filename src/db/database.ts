import Dexie, {type EntityTable} from "dexie";
import type {Game, Round} from "../game/types.ts";

const db = new Dexie("gameDatabase") as Dexie & {
    games: EntityTable<Game, "id">;
    rounds: EntityTable<Round, "id">;
};

db.version(1).stores({
    games: "++id, createdAt, finished",
    rounds: "++id, gameId, number"
});

export { db }