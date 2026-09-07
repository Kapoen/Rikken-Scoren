import type {Player} from "./types.ts";

export type SelectedPlayerStandard = {
    kind: "standard";
    player: Player;
    type: "initiator" | "mate" | "solo";
}

export type SelectedPlayerFixedScore = {
    kind: "fixedScore";
    player: Player;
    state: "won" | "lost";
};

export type SelectedPlayerSpadeQueen = {
    kind: "spadeQueen";
    player: Player;
    trick: "spadeQueen" | "last";
}

export type SelectedPlayers = {
    standard: SelectedPlayerStandard[];
    fixedScore: SelectedPlayerFixedScore[];
    spadeQueen: SelectedPlayerSpadeQueen[];
}