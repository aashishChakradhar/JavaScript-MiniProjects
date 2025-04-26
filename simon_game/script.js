let debug = false;
let isGameLocked = false;
let score = 0, highscore = 0;
let numList = [];
let userClicks = [];
let difficulty = "easy";
// Generates number list for pattern
function numberGenerator(size) {
    const numberList = [];
    for (let i = 0; i < size; i++) {
        const number = Math.floor(Math.random() * 4) + 1;
        numberList.push(number);
    }
    return numberList;
}

// Converts number list to pattern
function patternGenerator(numberList, speed, gap) {
    for (let i = 0; i < numberList.length; i++) {
        setTimeout(() => {
            const selectedBox = $(".box").eq(numberList[i] - 1);
            $(selectedBox).addClass("highlight");
            setTimeout(() => {
                $(selectedBox).removeClass("highlight");
            }, speed * 100); // Highlight duration
        }, gap * 1000 * i); // Delay between highlights
    }
}

// For getting the selected box
function selectionReader() {
    $(".box").off("click").on("click", function() {
        if (isGameLocked) {
            return; // Ignore clicks while the game is locked
        }
        const selectedBox = this.classList[1];
        if (debug){
            console.log(selectedBox);

        }
        let box = 0;
        switch (selectedBox) {
            case "box1":
                box = 1;
                break;
            case "box2":
                box = 2;
                break;
            case "box3":
                box = 3;
                break;
            case "box4":
                box = 4;
                break;
            default:
                alert("Press the box.");
                break;
        }
        userClicks.push(box);
        if (debug) {
            console.log("Selected box:", box);
            console.log("User clicks so far:", userClicks);
        }
    });
}

// Starts the game
function gameStart() {
    difficulty = $("select#dropdown").val();

    let speed, size, gap;
    switch (difficulty) {
        case "easy":
            speed = 5;
            size = 4;
            gap = 2;
            break;
        case "medium":
            speed = 3;
            size = 6;
            gap = 1;
            break;
        case "hard":
            speed = 2;
            size = 8;
            gap = 0.6;
            break;
        default:
            speed = 5;
            size = 4;
            gap = 2;
    }

    isGameLocked = true; // Lock the game during pattern generation
    $("#startButton").hide();
    $(".load").text("Getting Pattern!");

    numList = numberGenerator(size);    
    patternGenerator(numList, speed, gap);

    if (debug) {
        console.log(difficulty);
        console.log("Generated pattern:", numList);
    }
    
    // Delay patternChecker until patternGenerator completes
    setTimeout(() => {
        $(".load").text("Start");
        $("#submitButton").show();
        isGameLocked = false; // Unlock the game after pattern generation
        selectionReader();
    }, numList.length * gap * 1000); // Total time for patternGenerator to complete
}

function gameSubmit() {
    // Compare user clicks with the generated pattern
    if (userClicks.length !== numList.length) {
        $(".load").text("Game Over!! Incorrect number of clicks.");
        displayScore("out");
        resetGame(false);
        return;
    }

    for (let i = 0; i < numList.length; i++) {
        if (userClicks[i] !== numList[i]) {
            $(".load").text("Game Over!! Incorrect pattern.");
            displayScore("out");
            resetGame(false);
            return;
        }
    }

    $(".load").text("Pattern matched successfully!");
    score += 1; // Increment the score
    displayScore("update");
    resetGame(true); // Reset for the next round
}

// Resets the game state
function resetGame(status) {
    userClicks = []; // Reset user clicks
    $("#submitButton").hide(); // Hide the Done button
    $("#startButton").show(); // Show the Start button
    if (status){
        $("#startButton").text("New Pattern");
    }else{
        $("#startButton").text("Play Again");
    }
}

function displayScore(status) {
    if (status === "reset") {
        score = 0;
        highscore = 0;
    } else if (status === "update") {
        if (score > highscore) {
            highscore = score;
        }
    } else if (status === "out") {
        score = 0;
    }

    $("#highScore").text(highscore);
    $("#currentScore").text(score);
}