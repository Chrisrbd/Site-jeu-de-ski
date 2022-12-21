let input = document.getElementById("input_name");
let skier = document.getElementById("skier");

let pressed_key = "";
let timeout = null;

window.addEventListener("keydown", function(event) {
    let str;
    switch(event.key){
        case "ArrowDown":
            str = "Flèche bas";
            break;
        case "ArrowUp":
            str = "Flèche haut";
            break;
        case "ArrowLeft":
            str = "Flèche gauche";
            pressed_key = "ArrowLeft";
            if (timeout !== null){
                this.clearTimeout(timeout);
            }
            move_left();
            break;
        case "ArrowRight":
            str = "Flèche droite";
            pressed_key = "ArrowRight";
            if (timeout !== null){
                this.clearTimeout(timeout);
            }
            move_right();
            break;
        default:
            str = event.key;
    }
    input.textContent = str
}, true);

window.addEventListener("keyup", function(event) {
    pressed_key = "";
    timeout = this.setTimeout(function(){
        if ((event.key == "ArrowRight" || event.key == "ArrowLeft") && pressed_key == ""){
            skier.src = "../images/skier.png";
        }
    }, 300)
}, true);

function move_right(){
    skier.src = "../images/skier_right.png";
}

function move_left(){
    skier.src = "../images/skier_left.png";
}