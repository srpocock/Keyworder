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
function _shuffle<T>(array: T[]): void {
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
 * @returns 0,1,2,3 if one of the pairs - use this to decide colour. Returns -1 if no pair
 * @throws error if initialise has not yet been awaited
 */
function isPair(words: string[]): number {

    if (!_initialised) {
        throw new Error(`Words module not yet initialised - you must await words.initialise() first!`);
    }

    if (words.length != 2) return -1;

    return _wordInfo.pairs.findIndex((pair) => {
        return pair.includes(words[0]) && pair.includes(words[1]);
    });
}

/**
 * Get the randomly ordered word list
 * @returns randomly ordered word list
 * @throws error if initialise has not yet been awaited
 */
function getInitialWordStates(): Record<string, number> {

    if (!_initialised) {
        throw new Error(`Words module not yet initialised - you must await words.initialise() first!`);
    }

    const initialWordStates: Record<string, number> = _wordList.reduce((acc, key) => {
        acc[key] = -1;
        return acc;
    }, {} as Record<string, number>);

    return initialWordStates;
}

export default {
    initialise,
    get initialWordStates() {
        return getInitialWordStates();
    },
    isPair
}

