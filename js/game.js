let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    // world = new World(canvas, keyboard);   
    // console.log('My Character is', world.character);   
    
}

function bindButtonsPressEvents(){
    document.getElementById("mobileRight").addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
            keyboard.RIGHT = true;
        }
        
    });
    document.getElementById("mobileRight").addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
            keyboard.RIGHT = false;
        }
        
    });
    document.getElementById("mobileLeft").addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
            keyboard.LEFT = true;
        }
        
    });
    document.getElementById("mobileLeft").addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
            keyboard.LEFT = false;
        }
        
    });
    document.getElementById("mobileJump").addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
            keyboard.SPACE = true;
        }
        
    });
    document.getElementById("mobileJump").addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
            keyboard.SPACE = false;
        }
        
    });
    document.getElementById("mobilethrow").addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
            keyboard.D = true;
        }
        
    });
    document.getElementById("mobilethrow").addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
            keyboard.D = false;
        }
        
    });

}



window.addEventListener("keydown", (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38){
        keyboard.UP = true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68){
        keyboard.D = true;
    }
    // console.log(e);
});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38){
        keyboard.UP = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68){
        keyboard.D = false;
    }

    // console.log(e);
});




function start() {
    startgame();
    initLevel();
    this.bindButtonsPressEvents();
    world = new World(canvas, keyboard);
}

function startgame(){
    let startbutton = document.getElementById("btn_start");
    startbutton.classList.add("dnone");
    let startscr = document.getElementById("startscreen");
    startscr.classList.add("dnone");

    let gameoverScreen = document.getElementById("gameover");
    gameoverScreen.classList.add("dnone");

    let restartbutton = document.getElementById("btn_restart");
    restartbutton.classList.add("dnone");
}

let muteActive = true;

function mute() {
    let volumeIcon = document.getElementById("volumeIcon");
    if (muteActive) {
        
        console.log(muteActive);
        volumeIcon.src = "img/10_icons/volumemute.ico";
        muteActive = false;
    } else {
        
        volumeIcon.src = "img/10_icons/volumup.ico";
        console.log(muteActive);
        muteActive = true;
    }
}

// old code not working because of trigger eascape button listener

// let fullscreenONOFF = false;

// trigger ESCAPE in fullscreen not working

// document.addEventListener('keydown', function(e) {
//     if(e.key == "Escape"){
//         fullscreen();
//         fullscreenONOFF = false
//     }
// });

// window.addEventListener("keydown", (e) => {
//     if(e.key === "Escape" && fullscreenONOFF == true){
//         e.preventDefault();
//         fullscreen();
//         fsgame = document.getElementById("game");
//         fsgame.classList.remove("fullscreenmode");
//         // fullscreenONOFF = false;
//         // exitfullscreenmode();
//    };
// });

// function fullscreen(){
//     let fullscreenn = document.getElementById("game");
//     if(fullscreenONOFF == false){
//         enterFullscreen(fullscreenn);
//     } else {
//         exitFullscreen(fullscreenn);
//     } 
// }


// function enterFullscreen(fullscreenn){
//     if (fullscreenn.requestFullscreen) {
//         fullscreenn.requestFullscreen();
        
//     } else if (fullscreenn.msRequestFullscreen){
//         fullscreenn.msRequestFullscreen();
//     } else if (fullscreenn.webkitRequestFullscreen) {
//         fullscreenn.webkitRequestFullscreen();
//     }
//     fullscreenmode();
//     fullscreenONOFF = true;
// }

// function exitFullscreen(fullscreenn) {
//     if (document.exitFullscreen){
//         document.exitFullscreen(fullscreenn);
//     } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//     }
//     exitfullscreenmode();
//     fullscreenONOFF = false;
    
// }

// function fullscreenmode(){
//     game = document.getElementById("game");
//     canvaswindow = document.getElementById("canvas");
//     startscreen = document.getElementById("startscreen");
//     gameoverscreen = document.getElementById("gameover");

//     game.classList.add("fullscreenmode");
//     startscreen.classList.add("fullscreenmode");
//     gameoverscreen.classList.add("fullscreenmode");
//     canvaswindow.classList.add("fullscreenmode");
// }

// function exitfullscreenmode(){
//     game = document.getElementById("game");
//     canvaswindow = document.getElementById("canvas");
//     startscreen = document.getElementById("startscreen");
//     gameoverscreen = document.getElementById("gameover");

//     game.classList.remove("fullscreenmode");
//     startscreen.classList.remove("fullscreenmode");
//     gameoverscreen.classList.remove("fullscreenmode");
//     canvaswindow.classList.remove("fullscreenmode");
// }

function howToPlay(){
    help = document.getElementById("help");
    help.classList.remove("dnone");
}

function closeHelp(){
    help = document.getElementById("help");
    help.classList.add("dnone");
}

function fullscreenActivate() {
    let game = document.getElementById("game");
    let startscreen = document.getElementById("startscreen");
    let gameover = document.getElementById("gameover");

    if (!document.fullscreenElement) {
        enterFullscreen(game, gameover, startscreen);
    } else {
        exitFullscreenMode(game, gameover, startscreen);
    }
}
  
function enterFullscreen(game, gameover, startscreen) {
    game.requestFullscreen();
    canvas.classList.add("fullscreenmode");
    startscreen.classList.add("fullscreenmode");
    gameover.classList.add("fullscreenmode");
}
  
function exitFullscreenMode(gameover, startscreen) {
    document.exitFullscreen();
    canvas.classList.remove("fullscreenmode");
    startscreen.classList.remove("fullscreenmode");
    gameover.classList.remove("fullscreenmode");
}