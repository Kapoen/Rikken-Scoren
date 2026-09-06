import {type Dispatch, type ReactElement, type SetStateAction} from "react";
import {ROUND_TYPES, type RoundType, type RoundTypeOfCategory} from "../game/roundTypes.ts";
import type {Player} from "../game/types.ts";
import RikRoundSelect from "./RikRoundSelect.tsx";
import SoloRoundSelect from "./SoloRoundSelect.tsx";
import FixedScoreRoundSelect from "./FixedScoreRoundSelect.tsx";
import SpadeQueenRoundSelect from "./SpadeQueenRoundSelect.tsx";


type RoundSelectProps = {
    roundType: RoundType;
    players: Player[];
    selectedPlayers: SelectedPlayers;
    setSelectedPlayers: Dispatch<SetStateAction<SelectedPlayers>>;
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

export type SelectedPlayers = {
    standard: SelectedPlayerStandard[];
    fixedScore: SelectedPlayerFixedScore[];
    spadeQueen: SelectedPlayerSpadeQueen[];
}

export default function RoundSelect({ roundType, players, selectedPlayers, setSelectedPlayers }: RoundSelectProps): ReactElement {
    const category = ROUND_TYPES[roundType].category;

    switch (category) {
        case "troela":
        case "rik":
            return <RikRoundSelect
                players={players}
                roundType={roundType as RoundTypeOfCategory<"troela" | "rik">}
                selectedPlayers={selectedPlayers.standard}
                setSelectedPlayers={players => {
                    console.log(players)
                    setSelectedPlayers(prev => ({
                        ...prev,
                        standard: players
                    }));
                }}
            />;
        case "solo":
            return <SoloRoundSelect
                players={players}
                roundType={roundType as RoundTypeOfCategory<"solo">}
                selectedPlayers={selectedPlayers.standard}
                setSelectedPlayers={players => {
                    setSelectedPlayers(prev => ({
                        ...prev,
                        standard: players
                    }));
                }}
            />;
        case "fixedScore":
            return <FixedScoreRoundSelect
                players={players}
                selectedPlayers={selectedPlayers.fixedScore}
                setSelectedPlayers={players => {
                    setSelectedPlayers(prev => ({
                        ...prev,
                        fixedScore: players
                    }));
                }}
            />;
        case "spadeQueen":
            return <SpadeQueenRoundSelect
                players={players}
                selectedPlayers={selectedPlayers.spadeQueen}
                setSelectedPlayers={players => {
                    setSelectedPlayers(prev => ({
                        ...prev,
                        spadeQueen: players
                    }));
                }}
            />;
        default:
            return <div>Unknown round type</div>;
    }
}