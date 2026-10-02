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
