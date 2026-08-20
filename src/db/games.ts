import {db} from "./database.ts";
import type {Player} from "../game/types.ts";

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