var gamegrid = document.getElementById("game_grid");

let pressed_key = "";
let timeout = null;

const OBSTACLE_GENERATION_PROBABILITY = 50; //chance of obstacle spawn in percent
const OBSTACLE_GENERATION_DENSITY = 50; //maximum percentage of obstacles per row

const OBSTACLES_IMG_HEIGHT = 94;
const GRID_WIDTH = 11;
const GRID_LENGTH = Math.ceil(window.innerHeight / OBSTACLES_IMG_HEIGHT) + 1; //fill the screen height with rows + 1 outside the screen

let skier_pos = Math.floor(GRID_WIDTH / 2);

generate_grid();
var skier = generate_skier_character();

generate_obstacle_row(gamegrid.lastChild);

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
}, true);

window.addEventListener("keyup", function(event) {
    pressed_key = "";
    timeout = this.setTimeout(function(){
        if ((event.key === "ArrowRight" || event.key === "ArrowLeft") && pressed_key === ""){
            skier.src = "../images/skier.png";
        }
    }, 200)
}, true);

function move_right(){
    if (skier_pos + 1 < GRID_WIDTH - 1){
        skier.src = "../images/skier_right.png";
        move_skier_character(skier_pos + 1);
        skier_pos++;
    }
}

function move_left(){
    if (skier_pos - 1 > 0){
        skier.src = "../images/skier_left.png";
        move_skier_character(skier_pos - 1);
        skier_pos--;
    }
}

function move_skier_character(position){
    let row = gamegrid.querySelector("tr").children;
    row[position].appendChild(skier);
}

function generate_obstacle_row(row){
    let max_obstacle_number = Math.round(Math.random() * (OBSTACLE_GENERATION_DENSITY / 100 * GRID_WIDTH)); //number of obstacle per row
    let obstacle_positions = [];
    //generate a random position for each obstacle
    for (let i = 0; i < max_obstacle_number; i++){
        let pos;
        do {
            pos = Math.floor(Math.random() * (GRID_WIDTH - 2)) + 1 //random number between 1 and GRID_WIDTH - 2
        } while (obstacle_positions.includes(pos));
        obstacle_positions.push(pos);
    }
    //place an obstacle to the computed positions
    for (const pos of obstacle_positions) {
        let obstacle = document.createElement("img");
        obstacle.src = "../images/clashofclans_sapin_2018_resized(10x8).png";
        obstacle.className = "obstacle_img";
        row.children[pos].appendChild(obstacle);
    }
}

function generate_grid(){
    for (let i = 0; i < GRID_LENGTH; i++){
        let row = document.createElement("tr");
        for (let i = 0; i < GRID_WIDTH; i++){
            let cell = document.createElement("td");
            cell.style.width = (100 / GRID_WIDTH).toFixed(3).toString() + "%";
            row.appendChild(cell);
        }
        let left_decoration_obstacle = document.createElement("img");
        let right_decoration_obstacle = document.createElement("img");
        left_decoration_obstacle.src = "../images/clashofclans_sapin_2018_resized(10x8).png";
        right_decoration_obstacle.src = "../images/clashofclans_sapin_2018_resized(10x8).png";
        left_decoration_obstacle.className = "obstacle_img";
        right_decoration_obstacle.className = "obstacle_img";
        row.firstChild.appendChild(left_decoration_obstacle);
        row.lastChild.appendChild(right_decoration_obstacle);
        gamegrid.appendChild(row);
    }
}

function generate_skier_character(){
    let skier_img = document.createElement("img");
    skier_img.src = "../images/skier.png";
    skier_img.id = "skier";
    gamegrid.querySelector("tr").children[skier_pos].appendChild(skier_img);
    return skier_img;
}