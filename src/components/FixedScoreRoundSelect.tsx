import {type ReactElement, useEffect} from "react";
import type {Player} from "../game/types.ts";
import PlayerSelect from "./PlayerSelect.tsx";
import type {SelectedPlayerFixedScore} from "./RoundSelect.tsx";

type FixedScoredRoundSelectProps = {
    players: Player[];
    selectedPlayers: SelectedPlayerFixedScore[];
    setSelectedPlayers: (players: SelectedPlayerFixedScore[]) => void;
}

export default function FixedScoreRoundSelect({ players, selectedPlayers, setSelectedPlayers }: FixedScoredRoundSelectProps): ReactElement {
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