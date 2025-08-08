type WordGridProps = { wordStates: Record<string, number>, selectedWords: string[]; onChecked: (word: string, checked: boolean) => void };
type WordTileProps = { word: string, checked: boolean; wordState: number, onChecked: (word: string, checked: boolean) => void  };

function WordTile( { word, checked, wordState, onChecked } : WordTileProps) {
    
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
                <input type="checkbox" checked={checked && wordState === -1} disabled={wordState !== -1} onChange={e => onChecked(word, e.target.checked)}/>
                {word}
            </div>
        </label>
    )

}

export default function WordGrid( { wordStates, selectedWords, onChecked }: WordGridProps ) {

    return (
        <section>
            {Object.keys(wordStates).map((word, index) => (
                <WordTile 
                    key={index} 
                    word={word} 
                    checked={selectedWords.includes(word)}
                    wordState={wordStates[word]}
                    onChecked={onChecked} 
                    />
            ))}
        </section>
    )
}