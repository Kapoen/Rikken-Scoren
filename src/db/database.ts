import Dexie, {type EntityTable} from "dexie";
import type {Game} from "../game/types.ts";

const db = new Dexie("gameDatabase") as Dexie & {
    games: EntityTable<Game, "id">
};

db.version(1).stores({
    games: "++id, createdAt"
});

export { db }