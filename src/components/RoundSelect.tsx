import {type Dispatch, type ReactElement, type SetStateAction} from "react";
import {ROUND_TYPES, type RoundType, type RoundTypeOfCategory} from "../game/roundTypes.ts";
import type {Player} from "../game/types.ts";
import RikRoundSelect from "./RikRoundSelect.tsx";
import SoloRoundSelect from "./SoloRoundSelect.tsx";
import FixedScoreRoundSelect from "./FixedScoreRoundSelect.tsx";
import SpadeQueenRoundSelect from "./SpadeQueenRoundSelect.tsx";
import type {SelectedPlayers} from "../game/selectedPlayerTypes.ts";

type RoundSelectProps = {
    roundType: RoundType;
    players: Player[];
    selectedPlayers: SelectedPlayers;
    setSelectedPlayers: Dispatch<SetStateAction<SelectedPlayers>>;
    tricks: number | undefined;
    setTricks: Dispatch<SetStateAction<number | undefined>>;
};

export default function RoundSelect({ roundType, players, selectedPlayers, setSelectedPlayers, tricks, setTricks }: RoundSelectProps): ReactElement {
    const category = ROUND_TYPES[roundType].category;

    switch (category) {
        case "troela":
        case "rik":
            return <RikRoundSelect
                players={players}
                roundType={roundType as RoundTypeOfCategory<"troela" | "rik">}
                selectedPlayers={selectedPlayers.standard}
                setSelectedPlayers={players => {
                    setSelectedPlayers(prev => ({
                        ...prev,
                        standard: players
                    }));
                }}
                tricks={tricks ? tricks : 0}
                setTricks={setTricks}
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
                tricks={tricks ? tricks : 0}
                setTricks={setTricks}
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
                isOneOrFive={roundType === "oneOrFive"}
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