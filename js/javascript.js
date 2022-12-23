const gamegrid = document.getElementById("game_grid");

let pressed_key = "";
let skier_timeout = null;
let game_timeout = null;

let obstacle_movement_speed = 1;
const OBSTACLE_GENERATION_DENSITY = 30; //maximum percentage of obstacles per row

const OBSTACLES_IMG_HEIGHT = 94;
const GRID_WIDTH = 11;
const GRID_LENGTH = Math.ceil(window.innerHeight / OBSTACLES_IMG_HEIGHT) + 1; //fill the screen height with rows + 1 outside the screen

let skier_pos = Math.floor(GRID_WIDTH / 2);

generate_grid();
let skier = generate_skier_character();
move_obstacles();

function defeat(){}

function victory(){}

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
            if (skier_timeout !== null){
                this.clearTimeout(skier_timeout);
            }
            move_left();
            break;
        case "ArrowRight":
            str = "Flèche droite";
            pressed_key = "ArrowRight";
            if (skier_timeout !== null){
                this.clearTimeout(skier_timeout);
            }
            move_right();
            break;
        default:
            str = event.key;
    }
}, true);

window.addEventListener("keyup", function(event) {
    pressed_key = "";
    skier_timeout = this.setTimeout(function(){
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
        check_collision();
    }
}

function move_left(){
    if (skier_pos - 1 > 0){
        skier.src = "../images/skier_left.png";
        move_skier_character(skier_pos - 1);
        skier_pos--;
        check_collision();
    }
}

function move_skier_character(position){
    let row = gamegrid.querySelector("tr").children;
    row[position].insertAdjacentElement("afterbegin", skier);
}

function move_obstacles(){
    //add a new row
    let row = generate_row();
    generate_obstacle_row(row);
    gamegrid.appendChild(row);
    //delete the first row
    gamegrid.removeChild(gamegrid.firstChild);
    //re-place the skier on the first row
    skier = generate_skier_character();
    check_collision();
    game_timeout = this.setTimeout(function(){move_obstacles()}, 1000 / obstacle_movement_speed);
}

function check_collision(){
    let skier_grid_cell = gamegrid.querySelector("tr").children[skier_pos];
    console.log(gamegrid);
    console.log(skier_grid_cell);
    for (const element of skier_grid_cell.children){
        if (element.className === "obstacle_img"){
            console.log("YOU LOST");
            defeat();
            return 1;
        }
        else if (element.className === "coin_img") {
            return 2;
        }
    }
    return 0;
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

function generate_row(){
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
    return row;
}

function generate_grid(){
    for (let i = 0; i < GRID_LENGTH; i++){
        let row = generate_row();
        gamegrid.appendChild(row);
    }
    gamegrid.removeChild(gamegrid.firstChild); //remove the tbody child of the table
}

function generate_skier_character(){
    let skier_img = document.createElement("img");
    skier_img.src = "../images/skier.png";
    skier_img.id = "skier";
    let skier_cell = gamegrid.querySelector("tr").children[skier_pos]
    skier_cell.insertAdjacentElement("afterbegin", skier_img);
    return skier_img;
}