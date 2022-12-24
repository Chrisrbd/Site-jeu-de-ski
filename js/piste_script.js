const gamegrid = document.getElementById("game_grid");
const time_text = document.getElementById("time_text");
const score_text = document.getElementById("score_text");

let pressed_key = "";
let skier_timeoutID = null;
let game_timeoutID = null;
let time_intervalID;

let obstacle_movement_speed; //obstacle movement speed that depends on game difficulty
let score_multiplier; //score multiplier that depends on game difficulty
let obstacle_movement_speed_multiplier; //obstacle movement speed multiplier that depends on game difficulty
let time = 0;
let score = 0;
let game_status; //0 = finish, 1 = running
let OBSTACLE_GENERATION_DENSITY; //maximum percentage of obstacles per row

const OBSTACLES_IMG_HEIGHT = 94; //height of obstacles to add fixed height rows
const GRID_WIDTH = 11; //Game constant
const GRID_LENGTH = Math.ceil(window.innerHeight / OBSTACLES_IMG_HEIGHT) + 1; //fill the screen height with rows + 1 outside the screen

let skier_pos = Math.floor(GRID_WIDTH / 2);

get_params();
//Game start
generate_grid();
let skier = generate_skier_character();
move_obstacles();
time_intervalID = start_time_counter();
game_status = 1;

//TODO increasing game speed
//TODO leaderboard avec JSON
//TODO add more obstacles variant
//TODO custom popup
//TODO mode de jeu infini (actuel) et mode de jeu distance définie
//TODO ajout de pièces
//TODO ajout de powerup
//TODO ajout de sélection de skin
//TODO ajout de toschuss (qui augmente la vitesse pendant qu'on l'active)

function get_params(){
    const params = new URLSearchParams(window.location.search);
    switch (params.get('difficulty')){
        case "easy":
            obstacle_movement_speed = 1;
            obstacle_movement_speed_multiplier = 0.01;
            score_multiplier = 0.5
            OBSTACLE_GENERATION_DENSITY = 20;
            break;
        case "normal":
            obstacle_movement_speed = 2;
            obstacle_movement_speed_multiplier = 0.01;
            score_multiplier = 1
            OBSTACLE_GENERATION_DENSITY = 27;
            break;
        case "hard":
            obstacle_movement_speed = 4;
            obstacle_movement_speed_multiplier = 0.005;
            score_multiplier = 2
            OBSTACLE_GENERATION_DENSITY = 32;
            break;
        default:
            obstacle_movement_speed = 2;
            obstacle_movement_speed_multiplier = 0.01;
            score_multiplier = 1
            OBSTACLE_GENERATION_DENSITY = 30;
    }
}

function back_to_menu(){
    if (game_status === 1){
        window.clearTimeout(game_timeoutID);
        pause_time_counter(time_intervalID);
        if (confirm("Voulez-vous vraiment revenir au menu ?")){
            window.location.replace("menu.html");
        }
        else {
            time_intervalID = start_time_counter();
            move_obstacles();
        }
    } else {
        window.location.replace("menu.html");
    }
}

function start_time_counter(){
    return window.setInterval(function(){
        time++;
        calc_score();
        //TODO round à 3 decimal
        obstacle_movement_speed += obstacle_movement_speed_multiplier;
        console.log(obstacle_movement_speed);
        time_text.textContent = time.toString();
        score_text.textContent = score.toString();
    }, 1000);
}

function pause_time_counter(intervalID){
    window.clearTimeout(intervalID);
}

function calc_score(){
    score += 2 * time * score_multiplier * obstacle_movement_speed;
}

function defeat(){
    console.log("YOU LOST");
    game_status = 0;
    window.clearTimeout(game_timeoutID);
    pause_time_counter(time_intervalID);
    window.removeEventListener("keydown", handle_keydown, true);
    window.removeEventListener("keyup", handle_keyup, true);
}

function victory(){}

window.addEventListener("keydown", handle_keydown, true);
window.addEventListener("keyup", handle_keyup, true);

function handle_keydown(event) {
    let str;
    switch (event.key) {
        case "Escape":
            back_to_menu();
            break;
        case "ArrowUp":
            str = "Flèche haut";
            break;
        case "ArrowLeft":
            str = "Flèche gauche";
            pressed_key = "ArrowLeft";
            if (skier_timeoutID !== null) {
                this.clearTimeout(skier_timeoutID);
            }
            move_left();
            break;
        case "ArrowRight":
            str = "Flèche droite";
            pressed_key = "ArrowRight";
            if (skier_timeoutID !== null) {
                this.clearTimeout(skier_timeoutID);
            }
            move_right();
            break;
        default:
            str = event.key;
    }
}

function handle_keyup(event){
    pressed_key = "";
    skier_timeoutID = this.setTimeout(function(){
        if ((event.key === "ArrowRight" || event.key === "ArrowLeft") && pressed_key === ""){
            skier.src = "../images/skier.png";
        }
    }, 200)
}

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
    if (row[position].children.length > 0){
        row[position].firstChild.style.backgroundSize = "contain" ;
        row[position].firstChild.style.backgroundRepeat = "no-repeat";
        if (position > skier_pos){
            //to the right
            row[position].firstChild.style.backgroundImage = "url('../images/skier_right.png')";
            row[position].firstChild.style.backgroundPosition = "left";
        }
        else {
            //to the left
            row[position].firstChild.style.backgroundImage = "url('../images/skier_left.png')";
            row[position].firstChild.style.backgroundPosition = "right";
        }
        row[skier_pos].removeChild(skier);
    }
    else {
        row[position].appendChild(skier);
    }
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
    if (check_collision() !== 1){
        game_timeoutID = this.setTimeout(function(){move_obstacles()}, 1000 / obstacle_movement_speed);
    }
}

function check_collision(){
    let skier_grid_cell = gamegrid.querySelector("tr").children[skier_pos];
    for (const element of skier_grid_cell.children){
        if (element.className === "obstacle_img"){
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
    if (skier_cell.children.length > 0){
        skier_cell.firstChild.style.backgroundImage = "url('../images/skier.png')";
        skier_cell.firstChild.style.backgroundSize = "contain" ;
        skier_cell.firstChild.style.backgroundRepeat = "no-repeat";
        skier_cell.firstChild.style.backgroundPosition = "center";
    }
    else {
        skier_cell.appendChild(skier_img);
    }
    // skier_cell.insertAdjacentElement("afterbegin", skier_img);
    return skier_img;
}