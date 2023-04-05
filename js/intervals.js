let intervalIds = [];

function stopInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}
function gameStop(){
    intervalIds.forEach(clearInterval);
}

  
