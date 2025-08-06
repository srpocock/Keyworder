import { useState } from 'react'; 
import words from '../utils/words.ts';
import Instructions from './Instructions.tsx';
import WordGrid from './WordGrid.tsx';
import Attempts from './Attempts.tsx';
import KeywordInput from './KeywordInput.tsx';
import Buttons from './Buttons.tsx';
import History from './History.tsx';

// Initialise words

await words.initialise();

export default function Game() {

    const [checkedWords, setCheckedWords] = useState<string[]>([]);

    function handleCheck (word: string, checked: boolean): void {
        // Make sure only a maximum of 2 words are checked
        if (checked && checkedWords.length >= 2) {
            return;
        }
        setCheckedWords(prev =>
            checked ? [...prev, word] : prev.filter(w => w !== word)
        );
    };

    function handleSubmit (): void {
        
        if (words.isPair(checkedWords) === -1) {

        }

    }

    return (
        <article className="game">
            <Instructions />
            <WordGrid wordList={words.wordList} checkedWords={checkedWords} onChecked={handleCheck}/>
            <Attempts />
            <KeywordInput />
            <Buttons numCheckedWords={checkedWords.length} onSubmit={handleSubmit}/>
            <History />
        </article>
    )
}