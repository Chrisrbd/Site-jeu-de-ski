let input = document.getElementById("input_name");
let skier = document.getElementById("skier");

window.addEventListener("keydown", function(event) {
    let str;
    switch(event.key){
        case "ArrowDown":
            str = "Flèche bas"
            break;
        case "ArrowUp":
            str = "Flèche haut"
            break;
        case "ArrowLeft":
            str = "Flèche gauche"
            move_left();
            break;
        case "ArrowRight":
            str = "Flèche droite"
            move_right();
            break;
        default:
            str= event.key
    }
    input.textContent = str
}, true);

window.addEventListener("keyup", function(event) {
    if (event.key == "ArrowRight" || event.key == "ArrowLeft"){
        skier.src = "../images/skier.png";
    }
}, true);

function move_right(){
    skier.src = "../images/skier_right.png";
}

function move_left(){
    skier.src = "../images/skier_left.png";
}