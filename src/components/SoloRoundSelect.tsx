import {type ChangeEvent, type Dispatch, type ReactElement, type SetStateAction, useEffect} from "react";
import PlayerSelect from "./PlayerSelect.tsx";
import type {Player} from "../game/types.ts";
import type {SelectedPlayerStandard} from "../game/selectedPlayerTypes.ts";
import {ROUND_TYPES, type RoundTypeOfCategory} from "../game/roundTypes.ts";
import {useTranslation} from "react-i18next";

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
    const { t } = useTranslation();

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
        <div className="w-full flex flex-col gap-2 mt-2 mb-2">
            <PlayerSelect
                kind={"standard"}
                players={players}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={(player: Player) => handlePlayerSelect(player)}
                type={"solo"}
            />
            <span className="w-full flex flex-row items-center justify-center gap-2">
                {t("game.tricks")}
                <input type={"text"} inputMode={"numeric"} min={MIN_TRICKS} max={MAX_TRICKS} value={tricks}
                       className="w-full border rounded-lg p-2"
                       onChange={(event: ChangeEvent<HTMLInputElement>) =>
                           handleTricksWon(parseInt(event.target.value))
                       }
                />
                <button className="w-10 h-10 border rounded-lg" onClick={() => handleTricksWon(tricks + 1)}>+</button>
                <button className="w-10 h-10 border rounded-lg" onClick={() => handleTricksWon(tricks - 1)}>-</button>
            </span>
        </div>
    );
}