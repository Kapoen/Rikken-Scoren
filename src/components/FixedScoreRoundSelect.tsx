import {type ReactElement, useEffect} from "react";
import type {Player} from "../game/types.ts";
import PlayerSelect from "./PlayerSelect.tsx";
import type {SelectedPlayerFixedScore} from "../game/selectedPlayerTypes.ts";

type FixedScoredRoundSelectProps = {
    players: Player[];
    selectedPlayers: SelectedPlayerFixedScore[];
    setSelectedPlayers: (players: SelectedPlayerFixedScore[]) => void;
    isOneOrFive?: boolean
}

export default function FixedScoreRoundSelect({ players, selectedPlayers, setSelectedPlayers, isOneOrFive }: FixedScoredRoundSelectProps): ReactElement {
    useEffect(() => {
        setSelectedPlayers([]);
    }, []);

    const handlePlayerSelect = (player: Player) => {
        const existingPlayer = selectedPlayers.find(p => p.player.id === player.id);

        if (!existingPlayer) {
            return setSelectedPlayers([
                ...selectedPlayers,
                { kind: "fixedScore", player: player, state: "won" }
            ]);
        }

        if (existingPlayer.state === "won") {
            if (isOneOrFive) {
                return setSelectedPlayers(selectedPlayers.filter(p => p.player.id !== player.id));
            }

            return setSelectedPlayers([
                ...selectedPlayers.filter(p => p.player.id !== player.id),
                { kind: "fixedScore", player: player, state: "lost" }
            ]);
        }

        return setSelectedPlayers(selectedPlayers.filter(p => p.player.id !== player.id));
    }

    return (
        <div>
            <PlayerSelect
                kind={"fixedScore"}
                players={players}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={handlePlayerSelect}
            />
        </div>
    );
}