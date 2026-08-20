export type Player = {
    id: string;
    name: string;
}

export type Round = {
    id: string;
    type: string;
}

export type Game = {
    id: string;
    createdAt: number;
    finished: boolean;
    players: Player[];
    rounds: Round[];
}