let _initialised: boolean = false;
let _wordInfo: { pairs: [string, string][], keyword: string } = {
    pairs: [],
    keyword: ""
};

const _wordList: string[] = [];

/**
 * Load words object containing word pairs and keyword
 * @returns words object Promise<{ pairs: string[][], keyword: string }> 
 */
async function _loadWords(): Promise<{ pairs: [string, string][], keyword: string }> {

    try {
        const response = await fetch('../public/words.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();

    } catch (error) {
        console.error("Could not fetch the words array:", error);
        return { pairs: [], keyword: "" };
    }
}

/**
 * Utility function for shuffling arrays
 * @param array array to shuffle
 */
function _shuffle<T> (array: T[]): void {
    // Fisher-Yates shuffle - mutates array in place
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap
    }
}

/**
 * Initialisation function for words module, 
 * must be called before anything in module
 * @returns Promise<void> to allow for await
 */
async function initialise(): Promise<void> {

    if (_initialised) return;

    // Load word info from file
    _wordInfo = await _loadWords();

    // Process into randomly ordered list
    _wordInfo.pairs.forEach((wordPair) => {
        _wordList.push(...wordPair);
    })
    _shuffle(_wordList);

    _initialised = true;
}

/**
 * Test if two given test words is part of a pair
 * @param testWords
 * @returns true if the two words are in a pair
 * @throws error if initialise has not yet been awaited
 */
function isPair( firstWord: string, secondWord: string): boolean {

    if (!_initialised) {
        throw new Error(`Words module not yet initialised - you must await words.initialise() first!`);
    }

    return _wordInfo.pairs.findIndex((pair) => {
        return pair.includes(firstWord) && pair.includes(secondWord);
    }) != -1;
}

/**
 * Get the randomly ordered word list
 * @returns randomly ordered word list
 * @throws error if initialise has not yet been awaited
 */
function getWordList () : string[] {

    if (!_initialised) {
        throw new Error(`Words module not yet initialised - you must await words.initialise() first!`);
    }

    return _wordList;
}

export default {
    initialise,
    get wordList() { 
        return getWordList();
    },
    isPair
}

