import type {Player} from "../game/types.ts";
import {type ReactElement, useEffect} from "react";
import PlayerSelect from "./PlayerSelect.tsx";
import type {SelectedPlayerSpadeQueen} from "../game/selectedPlayerTypes.ts";
import {useTranslation} from "react-i18next";

type SpadeQueenRoundSelectType = {
    players: Player[];
    selectedPlayers: SelectedPlayerSpadeQueen[];
    setSelectedPlayers: (players: SelectedPlayerSpadeQueen[]) => void;
}

export default function SpadeQueenRoundSelect({ players, selectedPlayers, setSelectedPlayers }: SpadeQueenRoundSelectType): ReactElement {
    const { t } = useTranslation();

    useEffect(() => {
        setSelectedPlayers([]);
    }, []);

    const handlePlayerSelect = (player: Player, trick: SelectedPlayerSpadeQueen["trick"]) => {
       const playerExists = selectedPlayers.some(p => p.player.id === player.id && p.trick === trick);

       if (!playerExists) {
           return setSelectedPlayers([
               ...selectedPlayers.filter(p => p.trick !== trick),
               { kind: "spadeQueen", player: player, trick: trick }
           ]);
       }

       return setSelectedPlayers(selectedPlayers.filter(p => !(p.player.id === player.id && p.trick === trick)));
    }

    return (
        <div>
            {t("game.spadeQueen")}
            <PlayerSelect
                kind={"spadeQueen"}
                players={players}
                selectedPlayers={selectedPlayers}
                handlePlayerSelect={(player: Player) => handlePlayerSelect(player, "spadeQueen")}
                trick={"spadeQueen"}
            />
            {t("game.lastTrick")}
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