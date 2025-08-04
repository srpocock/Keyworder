import words from './utils/words.ts';

await words.initialise();
console.log(words.wordList);

function App() {

    return (
        <div>A blank canvas</div>
    )
}

export default App
