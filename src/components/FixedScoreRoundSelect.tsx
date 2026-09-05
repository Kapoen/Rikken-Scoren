import {type ReactElement, useEffect, useState} from "react";
import type {Player} from "../game/types.ts";
import PlayerSelect from "./PlayerSelect.tsx";
import type {SelectedPlayerFixedScore} from "./RoundSelect.tsx";

type FixedScoredRoundSelectProps = {
    players: Player[];
}

export default function FixedScoreRoundSelect({ players }: FixedScoredRoundSelectProps): ReactElement {
    const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayerFixedScore[]>([]);

    useEffect(() => {
        setSelectedPlayers([]);
    }, []);

    const handlePlayerSelect = (player: Player) => {
        setSelectedPlayers(prev => {
            const existingPlayer = prev.find(p => p.player.id === player.id);

            if (!existingPlayer) {
                return [
                    ...prev,
                    { kind: "fixedScore", player: player, state: "won" }
                ];
            }

            if (existingPlayer.state === "won") {
                return [
                    ...prev.filter(p => p.player.id !== player.id),
                    { kind: "fixedScore", player: player, state: "lost" }
                ];
            }

            return prev.filter(p => p.player.id !== player.id);
        });
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