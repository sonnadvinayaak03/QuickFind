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



// testing for a small dataset
const testData = ["apple", "apricot", "banana", "blueberry", "strawberry", "watermelon"];

//creating tree
const myWordTree = new Trie();
//take test data and put it in the tree
for(let fruit of  testData){
    myWordTree.insert(fruit);
}
//for testing, print in the console log
console.log(myWordTree);


const suggestionsBox = document.getElementById("suggestions");

searchBox.addEventListener("input", function(event) {
    const currentText = event.target.value.toLowerCase(); 
    
    //Erase the old words every time you type a new letter
    suggestionsBox.innerHTML = ""; 
    
    if (currentText === "") {
        return; // If the box is empty, return nothing
    }
    
    let scoreWords=[];

    //If the tree finds NOTHING, check for typos

    for(let fruit of testData){
        // Count the mistakes between what you typed and the fruit
        let mistakes = countTypoMistakes(currentText,fruit);

        if(fruit.startsWith(currentText)){
            mistakes=-1;
        }

        if(mistakes<=2){
            scoreWords.push({name:fruit,score:mistakes});
        }

        scoreWords.sort(function(a,b){return a.score - b.score});
    }
            

    
    
    //Paint the new words onto the screen
    for (let word of scoreWords) {
        // Create a new little block for each word
        const wordBlock = document.createElement("div");
        wordBlock.innerText = word.name;
        
        // designing to make them look like a list
        wordBlock.style.padding = "8px";
        wordBlock.style.borderBottom = "1px solid #eee";
        wordBlock.style.cursor = "pointer"; // Makes the mouse look like a clicking finger
        
        // Drop it into the suggestions box on the screen
        suggestionsBox.appendChild(wordBlock);
    }
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

// Let's test it out! 
console.log("Mistakes between banama and banana:", countTypoMistakes("banama", "banana"));
console.log("Mistakes between apple and watermelon:", countTypoMistakes("apple", "watermelon"));
