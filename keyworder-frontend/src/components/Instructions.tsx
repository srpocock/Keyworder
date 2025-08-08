import { GameState, type GameStateType } from "../utils/GameState";

export default function Instructions({ gameState }: { gameState: GameStateType }) {

    switch (gameState) {
        case GameState.GuessingPairs:
            return (
                <div>
                    <p>Guess the word pairs!</p>
                    <p>All words are connected to a secret keyword 🗝️</p>
                </div>
            );
        case GameState.GuessingKeyword:
            return (
                <div>
                    <p>You got the word pairs! 🙌</p>
                    <p>All words are connected to a secret keyword - now guess the keyword! 🕵️</p>
                </div>
            );
        case GameState.Lost:
            return (
                <div>
                    <p>Sorry, you ran out of attempts and lost! 😢</p>
                </div>
            );
        case GameState.Won:
            return (
                <div>
                    <p>🏆🏆🏆 Congratulations, you win! 🏆🏆🏆</p>
                </div>
            );
    }

}