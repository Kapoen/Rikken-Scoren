import {db} from "./database.ts";
import type {Game, Player} from "../game/types.ts";

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

export async function getCurrentGame(): Promise<Game | undefined> {
    return db.games.filter(game => !game.finished).first();
}