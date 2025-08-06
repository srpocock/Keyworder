type WordGridProps = { wordList: string[], checkedWords: string[]; onChecked: (word: string, checked: boolean) => void };
type WordTileProps = { word: string, checked: boolean; onChecked: (word: string, checked: boolean) => void  };

function WordTile( { word, checked, onChecked } : WordTileProps) {
    
    return (
        <label className="word-tile-container">
            <div>
                <input type="checkbox" checked={checked} onChange={e => onChecked(word, e.target.checked)}/>
                {word}
            </div>
        </label>
    )

}

export default function WordGrid( { wordList, checkedWords, onChecked}: WordGridProps ) {

    return (
        <section>
            {wordList.map((word, index) => (
                <WordTile 
                    key={index} 
                    word={word} 
                    checked={checkedWords.includes(word)}
                    onChecked={onChecked} 
                    />
            ))}
        </section>
    )
}