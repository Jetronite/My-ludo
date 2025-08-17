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

// Generate board: 15x15 grid = 225 cells
for (let i = 1; i <= 169; i++) {
    $("#board").append(`<div class="section" data-cell="${i}"></div>`);
}

// Example: Mark some safe zones (adjust based on game rules)
const safeCells = [8, 22, 36, 50, 64, 78, 92, 106];
safeCells.forEach(num => {
    $(`#board .section[data-cell='${num}']`).addClass("safe");
});
