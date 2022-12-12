let input = document.getElementById("test");

window.addEventListener("keydown", function(event) {
    let str;
    switch(event.code){
        case "ArrowDown":
            str = "Flèche bas"
            break;
        case "ArrowUp":
            str = "Flèche haut"
            break;
        case "ArrowLeft":
            str = "Flèche gauche"
            break;
        case "ArrowRight":
            str = "Flèche droite"
            break;
    }
    input.textContent = str
}, true);

function move_right(){
    
}

function move_left(){
    
}