// GameState enum
const GameState = {
    GuessingPairs: "guessing-pairs",
    GuessingKeyword: "guessing-keyword",
    Lost: "lost",
    Won: "won"
} as const
type GameStateType = typeof GameState[keyof typeof GameState];

export { GameState, type GameStateType };