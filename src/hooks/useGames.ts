import type {Game} from "../game/types.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../db/database.ts";

export function useGames(): Game[] | undefined {
    return useLiveQuery(() => db.games.orderBy("createdAt").reverse().toArray());
}