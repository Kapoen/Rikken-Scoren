import {db} from "./database.ts";
import type {Game, Player, Round} from "../game/types.ts";

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
    });
}

export async function getCurrentGame(): Promise<Game | undefined> {
    return db.games.filter(game => !game.finished).first();
}

export async function getPlayerScores(gameId: string): Promise<Record<string, number>> {
    const game: Game | undefined = await db.games.filter(game => game.id === gameId).first();
    if (!game) {
        throw new Error("Game is not found.")
    }

    const rounds: Round[] = await db.rounds.filter(round => round.gameId === gameId).toArray();

    const scores: Record<string, number> = {};
    game.players.forEach(p => {
        scores[p.id] = 0;
    });

    rounds.forEach(round => {
        const roundScores = round.scores;
        game.players.forEach(p => {
            scores[p.id] += roundScores[p.id];
        });
    });

    return scores;
}