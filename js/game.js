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

let fullscreenONOFF = false;

function fullscreen(){
    let fullscreen = document.getElementById("game");
    if(fullscreenONOFF == false){
        enterFullscreen(fullscreen);
    } else {
        exitFullscreen(fullscreen);
    } 
}

function enterFullscreen(fullscreen){
    if (fullscreen.requestFullscreen) {
        fullscreen.requestFullscreen();
        
    } else if (fullscreen.msRequestFullscreen){
        fullscreen.msRequestFullscreen();
    } else if (fullscreen.webkitRequestFullscreen) {
        fullscreen.webkitRequestFullscreen();
    }
    fullscreenmode();
    fullscreenONOFF = true;
}

function exitFullscreen(fullscreen) {
    if (document.exitFullscreen){
        document.exitFullscreen(fullscreen);
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    exitfullscreenmode();
    fullscreenONOFF = false;
    
}

function fullscreenmode(){
    game = document.getElementById("game");
    canvaswindow = document.getElementById("canvas");
    startscreen = document.getElementById("startscreen");
    gameoverscreen = document.getElementById("gameover");

    game.classList.add("fullscreenmode");
    startscreen.classList.add("fullscreenmode");
    gameoverscreen.classList.add("fullscreenmode");
    canvaswindow.classList.add("fullscreenmode");


}

function exitfullscreenmode(){
    game = document.getElementById("game");
    canvaswindow = document.getElementById("canvas");
    startscreen = document.getElementById("startscreen");
    gameoverscreen = document.getElementById("gameover");

    game.classList.remove("fullscreenmode");
    startscreen.classList.remove("fullscreenmode");
    gameoverscreen.classList.remove("fullscreenmode");
    canvaswindow.classList.remove("fullscreenmode");
}

function howToPlay(){
    help = document.getElementById("help");
    help.classList.remove("dnone");
}

function closeHelp(){
    help = document.getElementById("help");
    help.classList.add("dnone");
}

// function soundplay(){
//     var myAudio = document.getElementById('game');
//     myAudio.muted = !myAudio.muted;
// }

