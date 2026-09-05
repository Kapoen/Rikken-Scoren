import type {Player} from "../game/types.ts";
import {type ReactElement, useEffect, useState} from "react";
import PlayerSelect from "./PlayerSelect.tsx";
import type {SelectedPlayerSpadeQueen} from "./RoundSelect.tsx";

type SpadeQueenRoundSelectType = {
    players: Player[];
}

export default function SpadeQueenRoundSelect({ players }: SpadeQueenRoundSelectType): ReactElement {
    const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayerSpadeQueen[]>([]);

    useEffect(() => {
        setSelectedPlayers([]);
    }, []);

    const handlePlayerSelect = (player: Player, trick: SelectedPlayerSpadeQueen["trick"]) => {
        setSelectedPlayers(prev => {
           const playerExists = prev.some(p => p.player.id === player.id && p.trick === trick);

           if (!playerExists) {
               return [
                   ...prev.filter(p => p.trick !== trick),
                   { kind: "spadeQueen", player: player, trick: trick }
               ];
           }

           return prev.filter(p => !(p.player.id === player.id && p.trick === trick));
        });
    }

    return (
        <div>
            Schoppen mie
            <PlayerSelect
                kind={"spadeQueen"}
                players={players}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={(player: Player) => handlePlayerSelect(player, "spadeQueen")}
                trick={"spadeQueen"}
            />
            Laatste slag
            <PlayerSelect
                kind={"spadeQueen"}
                players={players}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={(player: Player) => handlePlayerSelect(player, "last")}
                trick={"last"}
            />
        </div>
    );
}