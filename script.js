// creating a single branch on tree
class TrieNode {
    constructor() {
        this.child = {}; // The smaller branches connecting the next letters
        this.isEndOfWord = false; // word ends here
    }
}

//the whole tree
class Trie {
    constructor() {
        this.root = new TrieNode(); // new empty node
    }

    //planting our words into the tree, letter by letter
    insert(word) {
        let currentNode = this.root; // Start at the top trunk
        
        // Looking at every single letter in word
        for (let letter of word) {
            // If a branch for this letter doesn't exist yet, grow one!
            if (!currentNode.child[letter]) {
                currentNode.child[letter] = new TrieNode();
            }
            // go down in the  branch
            currentNode = currentNode.child[letter];
        }
        
        //the last letter of word
        currentNode.isEndOfWord = true; 
    }

    collectWords(node,currentWord,foundWords){
        if(node.isEndOfWord){
            foundWords.push(currentWord);
        }
        for(let letter in node.child){
            this.collectWords(node.child[letter], currentWord + letter, foundWords);
        }
    }
    find(prefix){
        let currentNode=this.root;
        //go down the letters used typed
        for(let letter of prefix){
            if(!currentNode.child[letter]){
                return []; //if the branch does not exist , return nothing
            }
            currentNode=currentNode.child[letter];
        }
        let results=[];
        this.collectWords(currentNode,prefix,results);
        return results
    }
}



// testing for a large dataset
let testData=[];
const searchBox= document.getElementById("searchBox");
searchBox.disabled = true;
searchBox.placeholder = "Loading dictionary...";
fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt')
    .then(function(response) {
        return response.text();
    })
    .then(function(text) {
        // making the text into individual words
        testData = text.split('\n'); 

        for(let word of testData){
            if(word.length>0){
                myWordTree.insert(word);
            }
        }
        
        // Turn the search box back on
        searchBox.disabled = false;
        searchBox.placeholder = "Type a word...";
        console.log("Dictionary loaded and Tree Planted!");
    });


//creating tree
const myWordTree = new Trie();
//take test data and put it in the tree
for(let fruit of  testData){
    myWordTree.insert(fruit);
}
//for testing, print in the console log
console.log(myWordTree);


const suggestionsBox = document.getElementById("suggestions");
const stopwatch = document.getElementById("stopwatch"); //new timer
let typingPause; // pause button

searchBox.addEventListener("input", function(event) {
    const currentText = event.target.value.toLowerCase(); 
    
    //Erase the old words every time you type a new letter
    suggestionsBox.innerHTML = ""; 
    stopwatch.innerText = ""; // Clear the old time
    clearTimeout(typingPause);
    
    if (currentText === "") {
        return; // If the box is empty, return nothing
    }

    typingPause = setTimeout(function() {
        
        // START THE STOPWATCH
        const startTime = performance.now(); 
        
        let scoredWords = [];
        const firstLetter = currentText[0];
        const wordsToCheck = myWordTree.find(firstLetter);
        for (let word of wordsToCheck) {
            let mistakes = countTypoMistakes(currentText, word);
            if (word.startsWith(currentText)) {
                mistakes = -1; 
            }
            if (mistakes <= 2) {
                scoredWords.push({ name: word, score: mistakes });
            }
        }
        scoredWords.sort(function(a, b) {return a.score - b.score;});
            
        //Paint the new words onto the screen
        for (let word of scoredWords) {
            // Create a new little block for each word
            const wordBlock = document.createElement("div");
            const glowingWord = highlightLetters(word.name,currentText)
            wordBlock.innerHTML=glowingWord;
        
            // designing to make them look like a list
            wordBlock.style.padding = "8px";
            wordBlock.style.borderBottom = "1px solid #eee";
            wordBlock.style.cursor = "pointer"; // Makes the mouse look like a clicking finger
        
            // Drop it into the suggestions box on the screen
            suggestionsBox.appendChild(wordBlock);
        }
        // STOP THE STOPWATCH!
        const endTime = performance.now(); 
        const timeTaken = (endTime - startTime).toFixed(2); // Round the number
        
        // Paint the time on the screen
        stopwatch.innerText = "Found in " + timeTaken + " milliseconds!";}, 300);
});

//count how many typos exist between two words
function countTypoMistakes(word1, word2) {
    const grid = [];
    
    for (let i = 0; i <= word1.length; i++) {
        const row = [i];
        for (let j = 1; j <= word2.length; j++) {
            row.push(i === 0 ? j : 0);
        }
        grid.push(row);
    }

    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                grid[i][j] = grid[i - 1][j - 1]; // Letters match, no mistake!
            } else {
                grid[i][j] = 1 + Math.min(
                    grid[i - 1][j - 1], // Swap a letter
                    grid[i][j - 1],     // Add a letter
                    grid[i - 1][j]      // Remove a letter
                ); // Find the easiest way to fix the typo
            }
        }
    }
    
    return grid[word1.length][word2.length]; // Returns the final number of mistakes
}

// Highlighter
function highlightLetters(word, typedText) {
    let highlightedWord = "";
    let typedIndex = 0; // Keep track of which letter we are looking for

    // Look at every single letter in the suggested word
    for (let i = 0; i < word.length; i++) {
        // If this letter matches the next letter we typed...
        if (typedIndex < typedText.length && word[i] === typedText[typedIndex]) {
            // Put <b> and </b> around it to make it bold
            highlightedWord += "<b>" + word[i] + "</b>";
            typedIndex++; // Move on to the next letter we typed
        } else {
            // Otherwise, just leave the letter normal
            highlightedWord += word[i];
        }
    }
    
    return highlightedWord; // Return the glowing word
}
