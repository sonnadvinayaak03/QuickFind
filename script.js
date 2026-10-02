// testing for a small dataset
const testData = ["apple", "apricot", "banana", "blueberry", "strawberry", "watermelon"];

// taking input
const searchBox = document.getElementById("searchBox");


searchBox.addEventListener("input", function(event) {
    //getting letters from the box
    const currentText = event.target.value;
    
    // printing it in console for testing
    console.log("Typing detected: ", currentText);
});