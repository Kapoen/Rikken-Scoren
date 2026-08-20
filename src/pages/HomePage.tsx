import {getCurrentGame} from "../db/games.ts";
import {type ReactElement, useEffect, useState} from "react";
import type {Game} from "../game/types.ts";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";

export default function HomePage(): ReactElement {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [currentGame, setCurrentGame] = useState<Game | undefined>(undefined);

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

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-3 w-5/6 border-2 rounded-lg items-center justify-center p-4">
                <button onClick={() => navigate("/newGame")} className="bg-blue-300 disabled:bg-blue-700 border-2 rounded-lg w-11/12">
                    {t("menu.newGame")}
                </button>
                <button onClick={() => navigate("/playGame")} className="bg-blue-300 disabled:bg-blue-700 border-2 rounded-lg w-11/12" disabled={currentGame === undefined}>
                    {t("menu.continue")}
                </button>
                <button onClick={() => navigate("/gameHistory")} className="bg-blue-300 disabled:bg-blue-700 border-2 rounded-lg w-11/12">
                    {t("menu.gameHistory")}
                </button>
            </div>
        </main>
    )
}