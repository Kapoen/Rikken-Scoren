import type {ReactElement} from "react";
import type {Player} from "../game/types.ts";
import type {
    SelectedPlayerFixedScore,
    SelectedPlayerSpadeQueen,
    SelectedPlayerStandard
} from "./RoundSelect.tsx";

type PlayerSelectCommonProps = {
    players: Player[];
    handlePlayerSelect: (selectedPlayer: Player) => void;
};

type PlayerSelectProps = PlayerSelectCommonProps & (
    | { kind: "fixedScore"; selectedPlayers: SelectedPlayerFixedScore[]; type?: undefined; trick?: undefined; }
    | { kind: "standard"; selectedPlayers: SelectedPlayerStandard[]; type: SelectedPlayerStandard["type"]; trick?: undefined; }
    | { kind: "spadeQueen"; selectedPlayers: SelectedPlayerSpadeQueen[]; type?: undefined; trick: SelectedPlayerSpadeQueen["trick"]; }
);

const DEFAULT_PLAYER_BACKGROUND = "bg-gray-300";

export default function PlayerSelect({ players, selectedPlayers, handlePlayerSelect, type, trick, kind }: PlayerSelectProps): ReactElement {
    const playerBackground = (player: Player): string => {
        switch (kind) {
            case "standard": {
                const selected = selectedPlayers.find(p => p.player.id === player.id);
                if (!selected) {
                    return DEFAULT_PLAYER_BACKGROUND;
                }

                return selected.type === type ? "bg-blue-500" : DEFAULT_PLAYER_BACKGROUND;
            }
            case "fixedScore": {
                const selected = selectedPlayers.find(p => p.player.id === player.id);
                if (!selected) {
                    return DEFAULT_PLAYER_BACKGROUND;
                }

                return selected.state === "won" ? "bg-green-500" : "bg-red-500";
            }
            case "spadeQueen": {
                const selected = selectedPlayers.find(p => p.player.id === player.id);
                if (!selected) {
                    return DEFAULT_PLAYER_BACKGROUND;
                }

                return selected.trick === trick ? "bg-blue-500" : DEFAULT_PLAYER_BACKGROUND;
            }
            default: return DEFAULT_PLAYER_BACKGROUND;
        }

    }

    return (
        <div className="flex flex-col items-center justify-center w-full gap-2">
            <div className="flex flex-row items-center justify-center gap-2 flex-wrap w-full">
                {
                    players.map((player: Player) => (
                        <button
                            key={player.id}
                            className={`
                                flex flex-col items-center justify-center 
                                border rounded-lg w-1/5 min-w-48 min-h-36
                                ${playerBackground(player)} 
                            `}
                            onClick={() => handlePlayerSelect(player)}
                        >
                            <span className="w-full text-center h-1/4">{player.name}</span>
                        </button>
                    ))
                }
            </div>
        </div>
    );
}