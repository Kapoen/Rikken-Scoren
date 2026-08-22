import {type ReactElement, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import type {Game, Player, Round} from "../game/types.ts";
import {getCurrentGame} from "../db/games.ts";
import {Navigate} from "react-router";
import {useRounds} from "../hooks/useRounds.ts";
import {addRound} from "../db/rounds.ts";

export default function PlayGamePage(): ReactElement {
    const { t } = useTranslation();

    const [currentGame, setCurrentGame] = useState<Game | undefined | null>(null);
    const rounds: Round[] | undefined = useRounds(currentGame?.id);

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

    if (currentGame === null) {
        return <div>Loading...</div>;
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
                                <span className="w-full text-center text-6xl font-bold h-3/4">{rounds.length === 0 ? 0 : rounds.at(-1)!.scores[player.id]}</span>
                            </div>
                        ))
                    }
                    </div>
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
                                        <div>
                                            {round.type}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                <div className="w-full">
                    <span>
                        <button className="border rounded-lg bg-blue-400" onClick={() => addRound(currentGame.id)}>ADD TEST ROUND</button>
                    </span>
                </div>
            </div>
        </main>
    )
}