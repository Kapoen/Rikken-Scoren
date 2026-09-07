import {db} from "./database.ts";
import type {RoundType} from "../game/roundTypes.ts";
import type {Round} from "../game/types.ts";

export async function addRound(gameId: string, type: RoundType, scores: Record<string, number>) {
    await db.rounds.add({
        id: crypto.randomUUID(),
        gameId: gameId,
        number: await getRoundNumber(gameId),
        type: type,
        scores: scores,
    });
}

async function getRoundNumber(gameId: string): Promise<number> {
    const rounds: Round[] = await db.rounds.filter(round => round.gameId === gameId).toArray();

    return rounds.length + 1;
}