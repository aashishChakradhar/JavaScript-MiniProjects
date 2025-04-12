let buttonList = ['a','s','d','f','j','k','l'];
// button press through mouse
let keys = document.querySelectorAll(".drum-button");
for (let index = 0; index < keys.length; index++) {
    keys[index].addEventListener("click", function () {
        var key = this.innerHTML.trim();
        if (buttonList.includes(key)){
            makeSound(key);
            highlight(key);
        }
        
    });
}

// keyboard press
document.addEventListener('keypress', function(event){
    if(buttonList.includes(event.key)){
        makeSound(event.key);
        highlight(event.key);
    }
});

function highlight(key){
    document.querySelector("."+key+"-button").classList.add("pressed");
    setTimeout(function(){
        document.querySelector("."+key+"-button").classList.remove("pressed");
    },200);
}

// for playing sound
function makeSound(key){
    switch (key) {
        case "a":
            new Audio('sounds/crash.mp3').play();   
            break;
        case 's':
            new Audio('sounds/kick-bass.mp3').play();
            break;
        case 'd':
            new Audio('sounds/snare.mp3').play();
            break;
        case 'f':
            new Audio('sounds/tom-1.mp3').play();
            break;
        case 'j':
            new Audio('sounds/tom-2.mp3').play();
            break;
        case 'k':
            new Audio('sounds/tom-3.mp3').play();
            break;
        case 'l':
            new Audio('sounds/tom-4.mp3').play();
            break;          
        default:
            alert("Press the Assigned button");
            break;
    }
}
