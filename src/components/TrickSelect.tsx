import type {ChangeEvent, Dispatch, ReactElement, SetStateAction} from "react";
import {useTranslation} from "react-i18next";

type TrickSelectProps = {
    minTricks: number;
    maxTricks: number;
    tricks: number;
    setTricks: Dispatch<SetStateAction<number | undefined>>;
}

export default function TrickSelect({ minTricks, maxTricks, tricks, setTricks }: TrickSelectProps): ReactElement {
    const { t } = useTranslation();

    const handleTricksWon = (tricksWon: number) => {
        setTricks(Math.min(maxTricks, Math.max(minTricks, tricksWon)));
    }

    return (
        <div className="w-full flex flex-row items-center justify-center gap-2 text-center">
            <text>{t("game.tricks")}</text>
            <input type={"text"} inputMode={"numeric"} min={minTricks} max={maxTricks} value={tricks}
                   className="w-full border rounded-lg p-2"
                   onChange={(event: ChangeEvent<HTMLInputElement>) =>
                       handleTricksWon(parseInt(event.target.value))
                   }
            />
            <button className="w-10 h-10 border rounded-lg text-center" onClick={() => handleTricksWon(tricks + 1)}>+</button>
            <button className="w-10 h-10 border rounded-lg text-center" onClick={() => handleTricksWon(tricks - 1)}>-</button>
        </div>
    );
}