import {type ChangeEvent, type ReactElement, useEffect, useState} from "react";
import PlayerSelect from "./PlayerSelect.tsx";
import type {Player} from "../game/types.ts";
import type {SelectedPlayerStandard} from "./RoundSelect.tsx";
import {ROUND_TYPES, type RoundTypeOfCategory} from "../game/roundTypes.ts";

type SoloRoundSelectProps = {
    players: Player[];
    roundType: RoundTypeOfCategory<"solo">;
    selectedPlayers: SelectedPlayerStandard[];
    setSelectedPlayers: (players: SelectedPlayerStandard[]) => void;
}

const MIN_TRICKS = 0;
const MAX_TRICKS = 13;

export default function SoloRoundSelect({ players, roundType, selectedPlayers, setSelectedPlayers }: SoloRoundSelectProps): ReactElement {
    const [tricksWon, setTricksWon] = useState<number>(MIN_TRICKS);

    useEffect(() => {
        setSelectedPlayers([]);
        setTricksWon(ROUND_TYPES[roundType].tricks);
    }, []);

    const handleTricksWon = (tricksWon: number) =>
        setTricksWon(Math.min(MAX_TRICKS, Math.max(MIN_TRICKS, tricksWon)));

    const handlePlayerSelect = (player: Player) => {
        const existingPlayer = selectedPlayers.find(p => p.player.id === player.id);

        if (!existingPlayer) {
            return setSelectedPlayers([
                { kind: "standard", player: player, type: "solo" }
            ]);
        }

        return setSelectedPlayers(selectedPlayers.filter(p => p.player.id !== player.id));
    }

    return (
        <div>
            Solo
            <PlayerSelect
                kind={"standard"}
                players={players}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={(player: Player) => handlePlayerSelect(player)}
                type={"solo"}
            />
            SLAGEN
            <input type={"number"} min={0} max={13} value={tricksWon}
                   onChange={(event: ChangeEvent<HTMLInputElement>) =>
                       handleTricksWon(parseInt(event.target.value))
                   }
            />
            {tricksWon}
        </div>
    );
}