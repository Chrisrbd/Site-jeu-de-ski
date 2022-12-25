let difficulty_div = document.getElementById("difficulty-menu");
let main_div = document.getElementById("main-menu");
let back_btn_div = document.getElementById("back_btn_div");

let active_menu = "main";

//TODO ajout de paramètres (augementation de la vitesse en jeu O/N, largeur de grille)

function show_hide_difficulty_menu() {
    if(getComputedStyle(difficulty_div).display !== "none"){
        difficulty_div.style.display = "none";
        back_btn_div.style.display = "none";
        main_div.style.display = "block";
        active_menu = "main";
    } else {
        difficulty_div.style.display = "block";
        back_btn_div.style.display = "block"
        main_div.style.display = "none";
        active_menu = "difficulty";
    }
}

function back(){
    switch (active_menu){
        case "main":
            break;
        case "difficulty":
            show_hide_difficulty_menu();
    }
}