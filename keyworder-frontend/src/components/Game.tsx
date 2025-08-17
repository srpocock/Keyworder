import { useState, useEffect } from 'react';
import words from '../utils/words.ts';
import { GameState, type GameStateType } from '../utils/GameState.ts';
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
    const [gameState, setGameState] = useState<GameStateType>(GameState.GuessingPairs);
    const [keywordInput, setKeywordInput] = useState<string>('');
    const [guessedKeywords, setGuessedKeywords] = useState<string[]>([]);

    // Handle what happens when word tiles are selected
    function handleCheck(word: string, checked: boolean): void {
        // Make sure only a maximum of 2 words are checked
        if (checked && selectedWords.length >= 2) {
            return;
        }
        setSelectedWords(prev =>
            checked ? [...prev, word] : prev.filter(w => w !== word)
        );
    };

    function getCurrentKeywordInput(rawValue: string): void {
        const cleanedKeyword = rawValue.replace(/[^a-zA-Z]/g, "");
        setKeywordInput(() => cleanedKeyword.toLowerCase());
    }

    // Handle what happens when submit button is pressed
    function handleSubmit(): void {

        if (gameState === GameState.GuessingPairs) {
            const pairValue = words.isPair(selectedWords);

            if (pairValue === -1) {
                // Returns -1 if not pairs
                setAttemptsRemaining(prev => prev - 1);
            } else {
                // Otherwise store wordStates and reset for more guesses if needed
                setWordStates((prev) => ({
                    ...prev,
                    [selectedWords[0]]: pairValue,
                    [selectedWords[1]]: pairValue
                }));

                setSelectedWords([]);

            }
        } else if (gameState === GameState.GuessingKeyword) {
            // Keyword submit code
            if (guessedKeywords.includes(keywordInput)) {
                // If the keyword has already been guessed, do nothing
                return;
            }

            const isCorrect = words.isKeyword(keywordInput);
            setGuessedKeywords(prev => [...prev, keywordInput]);

            if (isCorrect) {
                // If the guess is correct, update the game state
                setGameState(GameState.Won);
            } else {
                // If the guess is incorrect, update the attempts remaining
                setAttemptsRemaining(prev => prev - 1);
            }
        }

    }

    useEffect(() => {
        if (attemptsRemaining <= 0) {
            setGameState(GameState.Lost);
            setSelectedWords([]);
        }
    }, [attemptsRemaining]);

    useEffect(() => {
        if (Object.values(wordStates).findIndex((val) => val === -1) === -1) {
            setGameState(GameState.GuessingKeyword);
        }
    }, [wordStates]);

    return (
        <article className="game">
            <Instructions gameState={gameState} />
            <WordGrid gameState={gameState} wordStates={wordStates} selectedWords={selectedWords} onChecked={handleCheck} />
            <Attempts attemptsRemaining={attemptsRemaining} />
            <KeywordInput 
                visible={gameState === GameState.GuessingKeyword} 
                disabled={attemptsRemaining <= 0 || gameState !== GameState.GuessingKeyword}
                keyword={keywordInput}
                onChange={getCurrentKeywordInput} />
            <Buttons disabled={(selectedWords.length !== 2 && gameState === GameState.GuessingPairs) || gameState === GameState.Won || gameState === GameState.Lost} onSubmit={handleSubmit} />
            <History visible={gameState !== GameState.GuessingPairs} guessedKeywords={guessedKeywords} />
        </article>
    )
}