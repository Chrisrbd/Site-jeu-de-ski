let play_button = document.getElementById("play-button");
let difficulty_div = document.getElementById("difficulty");
let main_div = document.getElementById("main-menu");

function difficulty(){
    if(getComputedStyle(difficulty_div).display !== "none"){
        difficulty_div.style.display = "none";
        main_div.style.display = "block";
    } else {
        difficulty_div.style.display = "block";
        main_div.style.display = "none";
    }
}
play_button.onclick = difficulty;

