import {ROUND_TYPES, type RoundType, type RoundTypeOfCategory} from "./roundTypes.ts";
import type {
    SelectedPlayerFixedScore,
    SelectedPlayers,
    SelectedPlayerSpadeQueen,
    SelectedPlayerStandard
} from "./selectedPlayerTypes.ts";
import {getCurrentGame} from "../db/games.ts";
import type {Player} from "./types.ts";
import {addRound} from "../db/rounds.ts";

export async function calculateScore(selectedPlayers: SelectedPlayers, roundType: RoundType, tricks?: number): Promise<void> {
    if (selectedPlayers.standard.length === 0
        && selectedPlayers.fixedScore.length === 0
        && selectedPlayers.spadeQueen.length === 0
    ) {
        throw new Error("Players need to be selected");
    }

    const category = ROUND_TYPES[roundType].category;

    const game = await getCurrentGame();
    if (!game) {
        throw new Error("No game in progress.");
    }

    switch (category) {
        case "troela":
        case "rik":
        case "solo":
            if (tricks === undefined) {
                throw new Error("Tricks need to be defined for troela, rik and solo.")
            }

            await calculateStandardScore(
                game.id,
                game.players,
                selectedPlayers.standard,
                roundType as RoundTypeOfCategory<"troela" | "rik" | "solo">,
                tricks
            );
            break;
        case "fixedScore":
            await calculateFixedScore(
                game.id,
                game.players,
                selectedPlayers.fixedScore,
                roundType as RoundTypeOfCategory<"fixedScore">
            );
            break;
        case "spadeQueen":
            await calculateSpadeQueenScore(
                game.id,
                game.players,
                selectedPlayers.spadeQueen,
                roundType as RoundTypeOfCategory<"spadeQueen">
            )
            break;
        default:
            throw new Error("Unexpected round type.");
    }
}

const POINTS_EXTRA_TRICK = 5;
const MAX_TRICKS = 13;

async function calculateStandardScore(
    gameId: string,
    players: Player[],
    selectedPlayers: SelectedPlayerStandard[],
    roundType: RoundTypeOfCategory<"troela" | "rik" | "solo">,
    tricks: number
) {
    if (ROUND_TYPES[roundType].category === "troela" || ROUND_TYPES[roundType].category === "rik") {
        const initiatorSelected = selectedPlayers.some(p => p.type === "initiator");
        if (!initiatorSelected) {
            throw new Error("Initiator needs to be selected");
        }

        const mateSelected = selectedPlayers.some(p => p.type === "mate");
        if (!mateSelected) {
            throw new Error("Mate needs to be selected");
        }

        if (selectedPlayers.length !== 2) {
            throw new Error("Only two players may be selected");
        }
    }

    if (ROUND_TYPES[roundType].category === "solo") {
        const soloSelected = selectedPlayers.some(p => p.type === "solo");
        if (!soloSelected) {
            throw new Error("Solo player needs to be selected.");
        }

        if (selectedPlayers.length !== 1) {
            throw new Error("Only one player may be selected");
        }
    }

    let points = tricks >= ROUND_TYPES[roundType].tricks
        ? (tricks - ROUND_TYPES[roundType].tricks) * POINTS_EXTRA_TRICK + ROUND_TYPES[roundType].basePoints
        : (tricks - (ROUND_TYPES[roundType].tricks - 1)) * POINTS_EXTRA_TRICK - ROUND_TYPES[roundType].basePoints;

    if (tricks === MAX_TRICKS && (roundType === "troela" || roundType === "rik")) {
        points += ROUND_TYPES[roundType].bonusPoints;
    }

    const scores: Record<string, number> = {};

    players.forEach(p => {
        const selectedPlayer = selectedPlayers.find(sp => sp.player.id === p.id);

        if (!selectedPlayer) {
            scores[p.id] = -1 * points;
            return;
        }

        if (roundType === "rik" && selectedPlayer.type === "mate" && points < 0) {
            scores[p.id] = 0;
            return;
        }

        if (roundType === "rik" && selectedPlayer.type === "initiator" && points < 0) {
            scores[p.id] = 2 * points;
            return;
        }

        if (ROUND_TYPES[roundType].category === "solo" && selectedPlayer.type === "solo") {
            scores[p.id] = (players.length - 1) * points;
            return;
        }

        scores[p.id] = points;
    });

    await addRound(gameId, roundType, scores);
}

async function calculateFixedScore(
    gameId: string,
    players: Player[],
    selectedPlayers: SelectedPlayerFixedScore[],
    roundType: RoundTypeOfCategory<"fixedScore">,
) {
    const points = ROUND_TYPES[roundType].points;

    const scores: Record<string, number> = {};
    players.forEach(p => {
        scores[p.id] = 0;
    });

    selectedPlayers.forEach(sp => {
        const factor = sp.state === "won" ? 1 : -1;

        scores[sp.player.id] += factor * (players.length - 1) * points;

        players.forEach(p => {
            if (sp.player.id === p.id) {
                return;
            }

            scores[p.id] -= factor * points;
        })

    });

    await addRound(gameId, roundType, scores);
}

async function calculateSpadeQueenScore(
    gameId: string,
    players: Player[],
    selectedPlayers: SelectedPlayerSpadeQueen[],
    roundType: RoundTypeOfCategory<"spadeQueen">,
) {
    const spadeQueenSelected = selectedPlayers.some(p => p.trick === "spadeQueen");
    if (!spadeQueenSelected) {
        throw new Error("Spade queen trick winner needs to be selected");
    }

    const lastTrickSelected = selectedPlayers.some(p => p.trick === "last");
    if (!lastTrickSelected) {
        throw new Error("Last trick winner needs to be selected");
    }

    if (selectedPlayers.length !== 2) {
        throw new Error("Only two players may be selected");
    }

    const points = ROUND_TYPES[roundType].points;

    const scores: Record<string, number> = {};
    players.forEach(p => {
        scores[p.id] = 0;
    });

    selectedPlayers.forEach(sp => {
        scores[sp.player.id] -= (players.length - 1) * points;

        players.forEach(p => {
            if (sp.player.id === p.id) {
                return;
            }

            scores[p.id] += points;
        })
    });

    await addRound(gameId, roundType, scores);
}