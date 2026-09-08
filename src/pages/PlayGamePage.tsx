import {type ChangeEvent, type ReactElement, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import type {Game, Player, Round} from "../game/types.ts";
import {getCurrentGame, getPlayerScores} from "../db/games.ts";
import {Navigate} from "react-router";
import {useRounds} from "../hooks/useRounds.ts";
import {ROUND_TYPES, type RoundType} from "../game/roundTypes.ts";
import {calculateScore} from "../game/calculateScore.ts";
import type {SelectedPlayers} from "../game/selectedPlayerTypes.ts";
import RoundSelect from "../components/RoundSelect.tsx";

export default function PlayGamePage(): ReactElement {
    const { t } = useTranslation();

    const [currentGame, setCurrentGame] = useState<Game | undefined | null>(null);
    const [selectedRoundType, setSelectedRoundType] = useState<RoundType | null>(null);
    const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayers>({
        standard: [],
        fixedScore: [],
        spadeQueen: []
    });
    const [tricks, setTricks] = useState<number | undefined>();
    const [scores, setScores] = useState<Record<string, number>>();
    const rounds: Round[] | undefined = useRounds(currentGame?.id);

    const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (value === "selectRoundType") {
            setSelectedRoundType(null);
        } else {
            setSelectedRoundType(value as RoundType);
        }
    }

    useEffect(() => {
        async function fetchCurrentGame() {
            try {
                const game: Game | undefined = await getCurrentGame();

                setCurrentGame(game)
            } catch (err) {
                console.error(err);
            }
        }

        void fetchCurrentGame();
    }, []);

    useEffect(() => {
        async function fetchScores() {
            try {
                if (!currentGame) {
                    return;
                }

                const playerScores: Record<string, number> = await getPlayerScores(currentGame.id);
                setScores(playerScores);
            } catch (err) {
                console.error(err);
            }
        }

        void fetchScores();
    }, [rounds.length]);

    if (currentGame === null) {
        return <div>{t("game.loading")}</div>;
    }

    if (currentGame === undefined) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <main className="flex items-center justify-center w-full">
            <div className="w-5/6 flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col items-center justify-center w-full gap-2">
                    <span className="w-full text-center">{t("menu.currentScores")}</span>
                    <div className="flex flex-row items-center justify-center gap-2 flex-wrap w-full">
                    {
                        currentGame.players.map((player: Player) => (
                            <div key={player.id} className="flex flex-col items-center justify-center border rounded-lg w-1/5 min-w-48 min-h-36">
                                <span className="w-full text-center h-1/4">{player.name}</span>
                                <span className="w-full text-center text-6xl font-bold h-3/4">{scores ? scores[player.id] : 0}</span>
                            </div>
                        ))
                    }
                    </div>
                </div>

                <div className="flex flex-col w-full items-center justify-center">
                    <span className="flex flex-row w-full gap-2 items-center justify-center">
                        <b className="min-w-fit">{t("game.addRound")}</b>
                        <select className="w-full border rounded-lg p-2" onChange={onSelect}>
                            <option value="selectRoundType">{t("game.selectGametype")}</option>
                            {
                                (Object.keys(ROUND_TYPES) as RoundType[]).map((roundType) => (
                                    <option key={roundType} value={roundType}>
                                        {t(`roundTypes.${roundType}`)}
                                    </option>
                                ))
                            }
                        </select>
                    </span>
                    {
                        selectedRoundType === null ? <></> : (
                            <div>
                                <RoundSelect
                                    roundType={selectedRoundType}
                                    players={currentGame.players}
                                    selectedPlayers={selectedPlayers}
                                    setSelectedPlayers={setSelectedPlayers}
                                    tricks={tricks}
                                    setTricks={setTricks}
                                />
                                <button
                                    className="border rounded-lg bg-blue-400 w-full p-2"
                                    onClick={() => calculateScore(selectedPlayers, selectedRoundType, tricks)}
                                >
                                    {t("game.submit")}
                                </button>
                            </div>
                        )
                    }
                </div>

                {
                    rounds.length === 0 ? <></> : (
                        <div className="flex flex-col items-center justify-center w-full gap-2 p-2">
                           <span className="flex flex-row w-full gap-2">
                               <p className="min-w-fit">{t("game.rounds")} ({rounds.length})</p>
                               <button className="w-full border rounded-lg bg-blue-400">{t("game.showGraph")}</button>
                           </span>
                            <div className="border rounded-lg w-full">
                                {
                                    rounds.map((round: Round) => (
                                        <div key={round.id}>
                                            {round.type}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </main>
    )
}