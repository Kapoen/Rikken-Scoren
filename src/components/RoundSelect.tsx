import {type ReactElement} from "react";
import {ROUND_TYPES, type RoundType, type RoundTypeOfCategory} from "../game/roundTypes.ts";
import type {Player} from "../game/types.ts";
import RikRoundSelect from "./RikRoundSelect.tsx";
import SoloRoundSelect from "./SoloRoundSelect.tsx";
import FixedScoreRoundSelect from "./FixedScoreRoundSelect.tsx";
import SpadeQueenRoundSelect from "./SpadeQueenRoundSelect.tsx";


type RoundSelectProps = {
    roundType: RoundType;
    players: Player[];
};

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

export type SelectedPlayer = SelectedPlayerStandard | SelectedPlayerFixedScore | SelectedPlayerSpadeQueen;

export default function RoundSelect({ roundType, players }: RoundSelectProps): ReactElement {
    const category = ROUND_TYPES[roundType].category;

    switch (category) {
        case "troela":
        case "rik":
            return <RikRoundSelect players={players} roundType={roundType as RoundTypeOfCategory<"troela" | "rik">} />;
        case "solo":
            return <SoloRoundSelect players={players} roundType={roundType as RoundTypeOfCategory<"solo">} />;
        case "fixedScore":
            return <FixedScoreRoundSelect players={players} />;
        case "spadeQueen":
            return <SpadeQueenRoundSelect players={players} />;
        default:
            return <div>Unknown round type</div>;
    }
}