let difficulty_div = document.getElementById("difficulty-menu");
let main_div = document.getElementById("main-menu");
let back_btn_div = document.getElementById("back_btn_div");
let easy_scoreboard = document.getElementById("easy_scoreboard");
let normal_scoreboard = document.getElementById("normal_scoreboard");
let hard_scoreboard = document.getElementById("hard_scoreboard");
let easy_scoreboard_btn = document.getElementsByName("blue_score_btn")[0];
let normal_scoreboard_btn = document.getElementsByName("red_score_btn")[0];
let hard_scoreboard_btn = document.getElementsByName("black_score_btn")[0];

let active_menu = "main";
let selected_scoreboard = "";
let data;

load_json();
show_leaderboard("easy");
show_leaderboard("normal");
show_leaderboard("hard");
select_scoreboard("normal");

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

function select_scoreboard(difficulty) {
    switch (difficulty) {
        case "easy":
            if (selected_scoreboard !== "easy") {
                easy_scoreboard.style.display = "table";
                normal_scoreboard.style.display = "none";
                hard_scoreboard.style.display = "none";
                easy_scoreboard_btn.style.padding = "0.75em 2em";
                normal_scoreboard_btn.style.padding = "0.5em 1.5em";
                hard_scoreboard_btn.style.padding = "0.5em 1.5em";
                easy_scoreboard_btn.style.color = "#4545ff";
                normal_scoreboard_btn.style.color = "white";
                hard_scoreboard_btn.style.color = "white";
                selected_scoreboard = "easy";
            }
            break;
        case "normal":
            if (selected_scoreboard !== "normal") {
                easy_scoreboard.style.display = "none";
                normal_scoreboard.style.display = "table";
                hard_scoreboard.style.display = "none";
                easy_scoreboard_btn.style.padding = "0.5em 1.5em";
                normal_scoreboard_btn.style.padding = "0.75em 2em";
                hard_scoreboard_btn.style.padding = "0.5em 1.5em";
                easy_scoreboard_btn.style.color = "white";
                normal_scoreboard_btn.style.color = "#de3535";
                hard_scoreboard_btn.style.color = "white";
                selected_scoreboard = "normal";
            }
            break;
        case "hard":
            if (selected_scoreboard !== "hard") {
                easy_scoreboard.style.display = "none";
                normal_scoreboard.style.display = "none";
                hard_scoreboard.style.display = "table";
                easy_scoreboard_btn.style.padding = "0.5em 1.5em";
                normal_scoreboard_btn.style.padding = "0.5em 1.5em";
                hard_scoreboard_btn.style.padding = "0.75em 2em";
                easy_scoreboard_btn.style.color = "white";
                normal_scoreboard_btn.style.color = "white";
                hard_scoreboard_btn.style.color = "#2a2a2a";
                selected_scoreboard = "hard";
            }
            break;
    }
}

function back() {
    switch (active_menu){
        case "main":
            break;
        case "difficulty":
            show_hide_difficulty_menu();
    }
}

function load_json() {
    if (localStorage.getItem("data") === null) {
        console.log("creating data structure in local storage");
        let s = '{"leaderboard_data": {"easy": [],"normal": [],"hard": []}}';
        localStorage.setItem("data", s);
    }
    data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
}

function show_leaderboard(difficulty) {
    switch (difficulty) {
        case "easy":
            easy_scoreboard.replaceChildren();
            break;
        case "normal":
            normal_scoreboard.replaceChildren();
            break;
        case "hard":
            hard_scoreboard.replaceChildren();
            break;
    }
    for (let i = 0; i < 10; i++) {
        if (data['leaderboard_data'][difficulty].length > i) {
            let leaderboard_row = document.createElement("tr");
            let leaderboard_rank = document.createElement("td");
            let leaderboard_name = document.createElement("td");
            let leaderboard_score = document.createElement("td");

            leaderboard_rank.textContent = (i + 1).toString();
            leaderboard_name.textContent = data['leaderboard_data'][difficulty][i]['name'];
            leaderboard_score.textContent = data['leaderboard_data'][difficulty][i]['score'];

            leaderboard_row.appendChild(leaderboard_rank);
            leaderboard_row.appendChild(leaderboard_name);
            leaderboard_row.appendChild(leaderboard_score);
            switch (difficulty) {
                case "easy":
                    easy_scoreboard.appendChild(leaderboard_row);
                    break;
                case "normal":
                    normal_scoreboard.appendChild(leaderboard_row);
                    break;
                case "hard":
                    hard_scoreboard.appendChild(leaderboard_row);
                    break;
            }
        }
        else {
            break;
        }
    }
}