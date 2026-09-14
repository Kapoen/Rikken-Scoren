import {type Dispatch, type ReactElement, type SetStateAction, useEffect} from "react";
import PlayerSelect from "../PlayerSelect.tsx";
import type {Player} from "../../game/types.ts";
import type {SelectedPlayerStandard} from "../../game/selectedPlayerTypes.ts";
import {ROUND_TYPES, type RoundTypeOfCategory} from "../../game/roundTypes.ts";
import TrickSelect from "../TrickSelect.tsx";

type SoloRoundSelectProps = {
    players: Player[];
    roundType: RoundTypeOfCategory<"solo">;
    selectedPlayers: SelectedPlayerStandard[];
    setSelectedPlayers: (players: SelectedPlayerStandard[]) => void;
    tricks: number;
    setTricks: Dispatch<SetStateAction<number | undefined>>;
}

const MIN_TRICKS = 0;
const MAX_TRICKS = 13;

export default function SoloRoundSelect({ players, roundType, selectedPlayers, setSelectedPlayers, tricks, setTricks }: SoloRoundSelectProps): ReactElement {
    useEffect(() => {
        setSelectedPlayers([]);
        setTricks(ROUND_TYPES[roundType].tricks);
    }, []);

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
        <div className="w-full flex flex-col gap-2 mt-2 mb-2">
            <PlayerSelect
                kind={"standard"}
                players={players}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={(player: Player) => handlePlayerSelect(player)}
                type={"solo"}
            />
            <TrickSelect
                minTricks={MIN_TRICKS}
                maxTricks={MAX_TRICKS}
                tricks={tricks}
                setTricks={setTricks}
            />
        </div>
    );
}