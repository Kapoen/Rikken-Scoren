import type {Player} from "../../game/types.ts";
import {type Dispatch, type ReactElement, type SetStateAction, useEffect} from "react";
import PlayerSelect from "../PlayerSelect.tsx";
import type {SelectedPlayerStandard} from "../../game/selectedPlayerTypes.ts";
import {ROUND_TYPES, type RoundTypeOfCategory} from "../../game/roundTypes.ts";
import {useTranslation} from "react-i18next";
import TrickSelect from "../TrickSelect.tsx";

const MIN_TRICKS = 0;
const MAX_TRICKS = 13;

type RikRoundSelectProps = {
    players: Player[];
    roundType: RoundTypeOfCategory<"rik" | "troela">;
    selectedPlayers: SelectedPlayerStandard[];
    setSelectedPlayers: (players: SelectedPlayerStandard[]) => void;
    tricks: number;
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

    return (
        <div className="w-full flex flex-col gap-2 mt-2 mb-2">
            <div>
                {t("game.rikker")}
                <PlayerSelect
                    kind={"standard"}
                    players={players}
                    selectedPlayers={selectedPlayers}
                    handlePlayerSelect={(player: Player) => handlePlayerSelect(player, "initiator")}
                    type={"initiator"}
                />
            </div>
            <div>
                {t("game.mate")}
                <PlayerSelect
                    kind={"standard"}
                    players={players}
                    selectedPlayers={selectedPlayers}
                    handlePlayerSelect={(player: Player) => handlePlayerSelect(player, "mate")}
                    type={"mate"}
                />
            </div>
            <TrickSelect
                minTricks={MIN_TRICKS}
                maxTricks={MAX_TRICKS}
                tricks={tricks}
                setTricks={setTricks}
            />
        </div>
    );
}