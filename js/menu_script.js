let play_button = document.getElementById("play-button");
let difficulty_div = document.getElementById("difficulty-menu");
let main_div = document.getElementById("main-menu");

function show_difficulty_menu() {
    if(getComputedStyle(difficulty_div).display !== "none"){
        difficulty_div.style.display = "none";
        main_div.style.display = "block";
    } else {
        difficulty_div.style.display = "block";
        main_div.style.display = "none";
    }
}

