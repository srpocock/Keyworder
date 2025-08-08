import { GameState, type GameStateType } from "../utils/GameState";

type WordGridProps = { gameState: GameStateType, wordStates: Record<string, number>, selectedWords: string[]; onChecked: (word: string, checked: boolean) => void };
type WordTileProps = { word: string, checked: boolean; wordState: number, disabled: boolean, onChecked: (word: string, checked: boolean) => void  };

function WordTile( { word, checked, wordState, disabled, onChecked } : WordTileProps) {
    
    function getClassName (): string {
        const string = 'word-tile-container';

        if (wordState === -1) {
            return string;
        } else {
            return string + ` pair-${wordState}`; 
        }
           
    }


    return (
        <label className={getClassName()}>
            <div>
                <input type="checkbox" checked={checked} disabled={disabled} onChange={e => onChecked(word, e.target.checked)}/>
                {word}
            </div>
        </label>
    )

}

export default function WordGrid( { gameState, wordStates, selectedWords, onChecked }: WordGridProps ) {

    return (
        <section>
            {Object.keys(wordStates).map((word, index) => (
                <WordTile 
                    key={index} 
                    word={word} 
                    checked={selectedWords.includes(word)}
                    wordState={wordStates[word]}
                    disabled={wordStates[word] !== -1 || gameState !== GameState.GuessingPairs}
                    onChecked={onChecked} 
                    />
            ))}
        </section>
    )
}