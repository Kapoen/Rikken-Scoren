import type {Player} from "../game/types.ts";
import {type ChangeEvent, type ReactElement, useEffect, useState} from "react";
import PlayerSelect from "./PlayerSelect.tsx";
import type {SelectedPlayerStandard} from "./RoundSelect.tsx";
import {ROUND_TYPES, type RoundTypeOfCategory} from "../game/roundTypes.ts";

const MIN_TRICKS = 0;
const MAX_TRICKS = 13;

type RikRoundSelectProps = {
    players: Player[];
    roundType: RoundTypeOfCategory<"rik" | "troela">;
}

export default function RikRoundSelect({ players, roundType }: RikRoundSelectProps): ReactElement {
    const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayerStandard[]>([]);
    const [tricksWon, setTricksWon] = useState<number>(MIN_TRICKS);

    useEffect(() => {
        setSelectedPlayers([]);
        setTricksWon(ROUND_TYPES[roundType].tricks);
    }, []);

    const handlePlayerSelect = (player: Player, type: SelectedPlayerStandard["type"]) => {
        setSelectedPlayers(prev => {
            const existingPlayer = prev.find(p => p.player.id === player.id);

            if (!existingPlayer) {
                return [
                    ...prev.filter(p => p.type !== type),
                    { kind: "standard", player: player, type: type }
                ];
            }

            if (existingPlayer.type !== type) {
                return [
                    ...prev.filter(p => p.player.id !== player.id && p.type !== type),
                    { kind: "standard", player: player, type: type }
                ];
            }

            return prev.filter(p => p.player.id !== player.id);
        });
    }

    const handleTricksWon = (tricksWon: number) =>
        setTricksWon(Math.min(MAX_TRICKS, Math.max(MIN_TRICKS, tricksWon)));

    return (
        <div>
            RIKKER
            <PlayerSelect
                kind={"standard"}
                players={players}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={(player: Player) => handlePlayerSelect(player, "initiator")}
                type={"initiator"}
            />
            MAAT
            <PlayerSelect
                kind={"standard"}
                players={players}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={(player: Player) => handlePlayerSelect(player, "mate")}
                type={"mate"}
            />
            SLAGEN
            <input type={"number"} min={0} max={13} value={tricksWon}
                   onChange={(event: ChangeEvent<HTMLInputElement>) =>
                       handleTricksWon(parseInt(event.target.value))
                   }
            />
        </div>
    );
}