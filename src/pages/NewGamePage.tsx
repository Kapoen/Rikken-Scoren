import {type ChangeEvent, type ReactElement, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {createGame} from "../db/games.ts";

export default function NewGamePage(): ReactElement {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [playerNames, setPlayerNames] = useState<string[]>(Array(4).fill(""));
    const [error, setError] = useState<string | null>(null);

    const handleChange = (index: number, value: string) => {
        setPlayerNames((prev: string[]) => {
            const updated: string[] = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const startGame = async () => {
        try {
            await createGame(playerNames);
        } catch (err: any) {
            setError(err.message);
            return;
        }

        navigate("/playGame");
    }

    return (
        <main className="flex flex-col items-center justify-center gap-4 min-h-screen">
            <h1>{t("menu.enterPlayerNames")}</h1>
            <div className="flex flex-col items-center justify-center gap-2 p-2 border rounded-lg w-3/4 max-w-xl">
                {playerNames.map((name, index) => (
                    <input
                        className="border rounded-lg w-full p-2"
                        key={index}
                        type="text"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                        placeholder={`${t("menu.player")} ${index}`}
                    />
                ))}
                <button
                    className="border rounded-lg bg-blue-400 w-full p-2"
                    onClick={startGame}
                >
                    {t("menu.startGame")}
                </button>
                <button
                    className="border rounded-lg bg-blue-400 w-full p-2"
                    onClick={() => navigate("/")}
                >
                    {t("menu.back")}
                </button>
                {error ? (
                    <span>{error}</span>
                ) : <></>}
            </div>
        </main>
    )
}