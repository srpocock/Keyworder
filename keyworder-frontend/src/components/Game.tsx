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

    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [attemptsRemaining, setAttemptsRemaining] = useState<number>(4);
    const [wordStates, setWordStates] = useState<Record<string, number>>(words.initialWordStates);

    // Handle what happens when word tiles are selected
    function handleCheck (word: string, checked: boolean): void {
        // Make sure only a maximum of 2 words are checked
        if (checked && selectedWords.length >= 2) {
            return;
        }
        setSelectedWords(prev =>
            checked ? [...prev, word] : prev.filter(w => w !== word)
        );
    };

    // Handle what happens when submit button is pressed
    function handleSubmit (): void {

        const pairValue = words.isPair(selectedWords);
    
        if (pairValue === -1) {
            // Returns -1 if not pairs
            setAttemptsRemaining(prev => prev - 1);
        } else {
            // Otherwise store wordStates and reset for more guesses if needed
            setWordStates((prev) => ({...prev,
                [selectedWords[0]]: pairValue,
                [selectedWords[1]]: pairValue
            }));

            setSelectedWords([]);
        }
    }

    return (
        <article className="game">
            <Instructions />
            <WordGrid wordStates={wordStates} selectedWords={selectedWords} onChecked={handleCheck}/>
            <Attempts attemptsRemaining={attemptsRemaining}/>
            <KeywordInput />
            <Buttons numSelectedWords={selectedWords.length} onSubmit={handleSubmit}/>
            <History />
        </article>
    )
}