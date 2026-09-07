import {type ChangeEvent, type Dispatch, type ReactElement, type SetStateAction, useEffect} from "react";
import PlayerSelect from "./PlayerSelect.tsx";
import type {Player} from "../game/types.ts";
import type {SelectedPlayerStandard} from "../game/selectedPlayerTypes.ts";
import {ROUND_TYPES, type RoundTypeOfCategory} from "../game/roundTypes.ts";

type SoloRoundSelectProps = {
    players: Player[];
    roundType: RoundTypeOfCategory<"solo">;
    selectedPlayers: SelectedPlayerStandard[];
    setSelectedPlayers: (players: SelectedPlayerStandard[]) => void;
    tricks: number | undefined;
    setTricks: Dispatch<SetStateAction<number | undefined>>;
}

const MIN_TRICKS = 0;
const MAX_TRICKS = 13;

export default function SoloRoundSelect({ players, roundType, selectedPlayers, setSelectedPlayers, tricks, setTricks }: SoloRoundSelectProps): ReactElement {
    useEffect(() => {
        setSelectedPlayers([]);
        setTricks(ROUND_TYPES[roundType].tricks);
    }, []);

    const handleTricksWon = (tricksWon: number) =>
        setTricks(Math.min(MAX_TRICKS, Math.max(MIN_TRICKS, tricksWon)));

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
            <input type={"number"} min={0} max={13} value={tricks}
                   onChange={(event: ChangeEvent<HTMLInputElement>) =>
                       handleTricksWon(parseInt(event.target.value))
                   }
            />
        </div>
    );
}