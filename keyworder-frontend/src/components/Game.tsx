import words from '../utils/words.ts';
import Instructions from './Instructions.tsx';
import WordTiles from './WordTiles.tsx';
import Attempts from './Attempts.tsx';
import KeywordInput from './KeywordInput.tsx';
import Buttons from './Buttons.tsx';
import History from './History.tsx';

// Initialise words

await words.initialise();


export default function Game() {

    return (
        <section className="game">
            <Instructions />
            <WordTiles />
            <Attempts />
            <KeywordInput />
            <Buttons />
            <History />
        </section>
    )
}