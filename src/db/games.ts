import {db} from "./database.ts";
import type {Game, Player} from "../game/types.ts";
import {useLiveQuery} from "dexie-react-hooks";

export function getGames(): Game[] | undefined {
    return useLiveQuery(() => db.games.orderBy("createdAt").reverse().toArray());
}

export async function createGame(players: string[]) {
    if (players.length !== 4) {
        throw new Error("You need 4 players.");
    }

    await db.games.add({
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        finished: false,
        players: players.map((player: string): Player => { return { id: crypto.randomUUID(), name: player } }),
        rounds: [],
    })
}