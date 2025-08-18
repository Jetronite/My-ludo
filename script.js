/**
 * Initializes the Ludo game board by dynamically generating the grid, player tokens, and marking safe zones.
 *
 * Features:
 * - Creates 4 tokens for each player in their respective home area.
 * - Generates a 15x15 board grid (169 cells).
 * - Marks the main game path and safe zones for each player.
 * - Applies player colors to their respective path and safe zone cells.
 * - Adds rounded corners to specific board cells for visual styling.
 *
 * Player configuration:
 * @typedef {Object} Player
 * @property {string} id - Unique identifier for the player (e.g., "yellow", "blue").
 * @property {string} color - CSS color variable for the player.
 *
 * Board generation:
 * - Tokens are appended to elements with the class `.home` based on player ID.
 * - Board cells are created as `.section` elements with a `data-cell` attribute.
 * - Game path and safe zones are defined by arrays of cell indices.
 * - Each cell in the game path is styled and marked with the player's color.
 * - Additional styling is applied to specific cells for rounded corners.
 *
 * @global
 */

// Player config
const players = [
    { id: "yellow", color: "var(--yellow)" },
    { id: "blue", color: "var(--blue)" },
    { id: "red", color: "var(--red)" },
    { id: "green", color: "var(--green)" }
];

// Generate 4 tokens in each home
$(".home").each(function () {
    const playerId = $(this).attr("id").split("-")[0];
    for (let i = 0; i < 4; i++) {
        $(this).append(`<div class="seed" data-player="${playerId}" aria-label="${playerId} token"></div>`);
    }
});

// Generate board: 13x13 grid = 139 cells
for (let i = 1; i <= 169; i++) {
    $("#board").append(`<div class="section" data-cell="${i}"></div>`);
}

// Example: Mark some safe zones (adjust based on game rules)
const topPath = [30, 17, 18, 19, 20, 21, 22, 23, 36, 49]
const rightPath = [50, 51, 64, 77, 90, 103, 116, 129, 128, 127]
const bottomPath = [140, 153, 152, 151, 150, 149, 148, 147, 134, 121]
const leftPath = [120, 119, 106, 93, 80, 67, 54, 41, 42, 43]
const safeZone = [81, 82, 83, 87, 88, 89, 33, 46, 59, 111, 124, 137]

const gamePath = [...topPath, ...rightPath, ...bottomPath, ...leftPath, ...safeZone];

for (let index = 0; index < gamePath.length; index++) {
    $(`.section[data-cell='${gamePath[index]}']`).addClass("gamePath")
        .css("background-color", players[index % 4].color)
        .append(`<div class="sectionCentre"></div>`)
}

// Set rounded corners for specific cells
$("[data-cell='17'], [data-cell='41'], [data-cell='127']").css("border-top-left-radius", "50%");
$("[data-cell='23'], [data-cell='51'], [data-cell='121']").css("border-top-right-radius", "50%");
$("[data-cell='49'], [data-cell='119'], [data-cell='147']").css("border-bottom-left-radius", "50%");
$("[data-cell='43'], [data-cell='129'], [data-cell='153']").css("border-bottom-right-radius", "50%");


// Apply colors to special cells
const blueCells = [20, 23, 33, 54, 46, 59]
for (let index = 0; index < blueCells.length; index++) {
    $(`[data-cell='${blueCells[index]}']`).css("background-color", players[1].color);   
}

const redCells = [103, 111, 124, 137, 147, 150]
for (let index = 0; index < redCells.length; index++) {
    $(`[data-cell='${redCells[index]}']`).css("background-color", players[2].color);
}

const yellowCells = [21, 41, 80, 82, 83]
for (let index = 0; index < yellowCells.length; index++) {
    $(`[data-cell='${yellowCells[index]}']`).css("background-color", players[0].color);
}

const greenCells = [87, 88, 89, 90, 129, 148]
for (let index = 0; index < greenCells.length; index++) {
    $(`[data-cell='${greenCells[index]}']`).css("background-color", players[3].color);
}


// Style the start and end cells
[147, 41, 23, 129].forEach(cell => {
    $(`[data-cell='${cell}']`).find(".sectionCentre").remove();
    $(`[data-cell='${cell}']`).append(`<div class="start">START</div>`);
});


// Centre Path
const centerPath = [72, 84, 85, 86, 98]
centerPath.forEach(cell => {
    $(`[data-cell='${cell}']`).append(`<div class="sectionCentre"></div>`)
})

$("main").append(`<div class="finalCentre"><div class="centreTweek"></div></div>`)










// // Example of backend functionality (commented out for now)
// // This section can be used to implement backend logic such as dice rolling or game state management


// // Dice functionality
// function rollDice() {
//     var dice1 = 1 + Math.floor(Math.random()*6)
//     console.log(dice1)
// }
