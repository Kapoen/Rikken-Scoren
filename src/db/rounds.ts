import {db} from "./database.ts";

export async function addRound(gameId: string) {
    await db.rounds.add({
        id: crypto.randomUUID(),
        gameId: gameId,
        number: -1,
        type: "rik",
        scores: {},
    })
}