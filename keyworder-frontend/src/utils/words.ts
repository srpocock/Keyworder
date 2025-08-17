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

function isKeyword(word: string): boolean {

    if (!_initialised) {
        throw new Error(`Words module not yet initialised - you must await words.initialise() first!`);
    }

    return word === _wordInfo.keyword;
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

const NODE_API: string = "https://api.conceptnet.io/c/en/";
const RELATEDNESS_API: string = "https://api.conceptnet.io/relatedness?";

async function _checkIsWord(word: string): Promise<boolean> {

    if (!_initialised) {
        throw new Error(`Words module not yet initialised - you must await words.initialise() first!`);
    }

    const urlNode = `${NODE_API}${word}`;
    const responseNode = await fetch(urlNode);
    const dataNode = await responseNode.json();

    if (dataNode !== undefined && dataNode.error !== undefined) {
        return false;
    } else {
        return true;
    }
}

/**
 * Fetch the relatedness score between two words using the ConceptNet Numberbatch API.
 * @param word1 First word to compare
 * @param word2 Second word to compare
 * @returns Promise<number> - The relatedness score between the two words
 * @throws Error if the relatedness data is not found 
 */
async function _fetchRelatedness(word1: string, word2: string): Promise<number> {

    const urlRelatedness = `${RELATEDNESS_API}node1=/c/en/${word1}&node2=/c/en/${word2}`;
    const responseRelatedness = await fetch(urlRelatedness);
    const dataRelatedness = await responseRelatedness.json();

    if (dataRelatedness !== undefined && dataRelatedness.value !== undefined) {
        return dataRelatedness.value;
    } else {
        return -1;
    }

}

async function getRelatednessScore(word: string): Promise<number> {

    if (!_initialised) {
        throw new Error(`Words module not yet initialised - you must await words.initialise() first!`);
    }

    // First check if the word is a node
    if (!(await _checkIsWord(word))) {
        return -1;
    } else {
        return _fetchRelatedness(word, _wordInfo.keyword);
    }

}

export default {
    initialise,
    get initialWordStates() {
        return getInitialWordStates();
    },
    isPair,
    isKeyword,
    getRelatednessScore
}

