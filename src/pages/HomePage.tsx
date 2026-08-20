import {createGame, getGames} from "../db/games.ts";
import type {ReactElement} from "react";

export default function HomePage(): ReactElement {
    const games= getGames();

    return (
        <main>
            <button onClick={async () => await createGame(["a", "b", "c", "d"])}>NEW</button>

            {!games ? (
                <p>Loading...</p>
            ) : games.length === 0 ? (
                <p>No games yet.</p>
            ) : (
                <ul>
                    {games.map((game) => (
                        <li key={game.id}>
                            {game.players.map((player) => player.name).join(' vs ')}
                            {' — '}
                            {new Date(game.createdAt).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}