/**
 * ==================================
 * LUDO GAME LOGIC (Board Generation)
 * ==================================
 * - Creates tokens in each home
 * - Generates board grid dynamically
 * - Marks safe zones
 * ==================================
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

// Generate board: 15x15 grid = 139 cells
for (let i = 1; i <= 169; i++) {
    $("#board").append(`<div class="section" data-cell="${i}"></div>`);
}

// Example: Mark some safe zones (adjust based on game rules)
const topPath = [30, 17, 18, 19, 20, 21, 22, 23, 36, 49]
const rightPath = [50, 51, 64, 77, 90, 103, 116, 129, 128, 127]
const bottomPath = [140, 153, 152, 151, 150, 149, 148, 147, 134, 121]
const leftPath = [120, 119, 106, 93, 80, 67, 54, 41, 42, 43]
const safeZone = [81, 82, 83, 84, 85, 86, 87, 88, 89, 33, 46, 59, 72, 98, 111, 124, 137]
const centerPath = []

const gamePath = [...topPath, ...rightPath, ...bottomPath, ...leftPath, ...safeZone];

for (let index = 0; index < gamePath.length; index++) {
    $(`.section[data-cell='${gamePath[index]}']`).addClass("gamePath")
        .css("background-color", players[index % 4].color)
        .append(`<div class="sectionCentre"></div>`)
}

$("[data-cell='17'], [data-cell='41'], [data-cell='127']").css("borderTopLeftRadius", "50%");
$("[data-cell='23'], [data-cell='51'], [data-cell='121']").css("borderTopRightRadius", "50%");
// $("[data-cell='17'], [data-cell='41'] [data-cell='127']").css("borderTopLeftRadius", "50%");
// $("[data-cell='17'], [data-cell='41'] [data-cell='127']").css("borderTopLeftRadius", "50%");
