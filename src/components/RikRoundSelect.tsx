import type {Player} from "../game/types.ts";
import {type ChangeEvent, type Dispatch, type ReactElement, type SetStateAction, useEffect} from "react";
import PlayerSelect from "./PlayerSelect.tsx";
import type {SelectedPlayerStandard} from "../game/selectedPlayerTypes.ts";
import {ROUND_TYPES, type RoundTypeOfCategory} from "../game/roundTypes.ts";
import {useTranslation} from "react-i18next";

const MIN_TRICKS = 0;
const MAX_TRICKS = 13;

type RikRoundSelectProps = {
    players: Player[];
    roundType: RoundTypeOfCategory<"rik" | "troela">;
    selectedPlayers: SelectedPlayerStandard[];
    setSelectedPlayers: (players: SelectedPlayerStandard[]) => void;
    tricks: number | undefined;
    setTricks: Dispatch<SetStateAction<number | undefined>>;
}

export default function RikRoundSelect({ players, roundType, selectedPlayers, setSelectedPlayers, tricks, setTricks }: RikRoundSelectProps): ReactElement {
    const { t } = useTranslation();

    useEffect(() => {
        setSelectedPlayers([]);
        setTricks(ROUND_TYPES[roundType].tricks);
    }, []);

    const handlePlayerSelect = (player: Player, type: SelectedPlayerStandard["type"]) => {
        const existingPlayer = selectedPlayers.find(p => p.player.id === player.id);

        if (!existingPlayer) {
            return setSelectedPlayers([
                ...selectedPlayers.filter(p => p.type !== type),
                { kind: "standard", player: player, type: type }
            ]);
        }

        if (existingPlayer.type !== type) {
            return setSelectedPlayers([
                ...selectedPlayers.filter(p => p.player.id !== player.id && p.type !== type),
                { kind: "standard", player: player, type: type }
            ]);
        }

        return setSelectedPlayers(selectedPlayers.filter(p => p.player.id !== player.id));
    }

    const handleTricksWon = (tricksWon: number) =>
        setTricks(Math.min(MAX_TRICKS, Math.max(MIN_TRICKS, tricksWon)));

    return (
        <div>
            {t("game.rikker")}
            <PlayerSelect
                kind={"standard"}
                players={players}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={(player: Player) => handlePlayerSelect(player, "initiator")}
                type={"initiator"}
            />
            {t("game.mate")}
            <PlayerSelect
                kind={"standard"}
                players={players}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={(player: Player) => handlePlayerSelect(player, "mate")}
                type={"mate"}
            />
            {t("game.tricks")}
            <input type={"number"} min={0} max={13} value={tricks}
                   onChange={(event: ChangeEvent<HTMLInputElement>) =>
                       handleTricksWon(parseInt(event.target.value))
                   }
            />
        </div>
    );
}