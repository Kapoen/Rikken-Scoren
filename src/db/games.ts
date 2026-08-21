import {db} from "./database.ts";
import type {Game, Player} from "../game/types.ts";

export async function createGame(players: string[]) {
    if (players.length !== 4) {
        throw new Error("You need 4 players.");
    }

    const hasDuplicates: boolean = new Set(players).size !== players.length;
    if (hasDuplicates) {
        throw Error("All player names need to be unique.");
    }

    const currentGame: Game | undefined = await getCurrentGame();
    if (currentGame) {
        await db.games.update(currentGame.id, {
            finished: true,
        });
    }

    await db.games.add({
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        finished: false,
        players: players.map((player: string): Player => { return { id: crypto.randomUUID(), name: player } }),
        rounds: [],
    });
}

export async function getCurrentGame(): Promise<Game | undefined> {
    return db.games.filter(game => !game.finished).first();
}