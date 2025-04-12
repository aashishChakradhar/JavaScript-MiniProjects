function numberGenerator(){
    const number = Math.floor(Math.random() * 6) + 1;
    return number;
}

function diceRoll() {
    const numberOfDices = document.getElementById("players").value; // gets number of player
    let numberArray = [];
    for (let i = 0; i < numberOfDices; i++) {
        numberArray.push(numberGenerator()); // add number to array until array size is equal to number of player
    }
    const imageElements = document.getElementsByClassName('dice'); // Get image elements
    for (let index = 0; index < numberArray.length; index++) {
        imageElements[index].src = `images/dice${numberArray[index]}.png`; // Update image source
        document.querySelectorAll(".score")[index].textContent = `Score: ${numberArray[index]}`
    }
}

function numberOfPlayers(){
    const player = document.getElementById("players").value;    // gets number of player
    const parent = document.querySelector(".whole");    // Get the parent element
    parent.innerHTML = "";  // Clear previous content
    for (let index = 1; index <= player; index++) {
        let playerDiv = document.createElement("div");
        playerDiv.innerHTML = `
            <div class="single">
                <div class="display-text">Player ${index}</div>
                <img class="dice" src="images/dice1.png" alt="dice">
                <div class="score display-text">Score: 0</div>
            </div>
        `;
        parent.appendChild(playerDiv);
    }
}