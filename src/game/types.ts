import type {RoundType} from "./roundTypes.ts";

export type Player = {
    id: string;
    name: string;
}

export type Round = {
    id: string;
    gameId: string;
    number: number;
    type: RoundType;
    scores: Record<string, number>;
}

export type Game = {
    id: string;
    createdAt: number;
    finished: boolean;
    players: Player[];
}