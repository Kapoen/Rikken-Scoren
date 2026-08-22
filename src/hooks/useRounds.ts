import type {Round} from "../game/types.ts";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../db/database.ts";

export function useRounds(gameId: string | undefined): Round[] {
    return useLiveQuery(() => gameId === undefined ? [] :  db.rounds.where("gameId").equals(gameId).toArray(), [gameId], []);
}