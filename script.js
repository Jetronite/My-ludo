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

// Generate board: 13x13 grid = 169 cells
for (let i = 1; i <= 169; i++) {
  $("#board").append(`<div class="section" data-cell="${i}"></div>`);
}

// Game paths
const paths = {
  top:    [30, 17, 18, 19, 20, 21, 22, 23, 36, 49],
  right:  [50, 51, 64, 77, 90, 103, 116, 129, 128, 127],
  bottom: [140, 153, 152, 151, 150, 149, 148, 147, 134, 121],
  left:   [120, 119, 106, 93, 80, 67, 54, 41, 42, 43],
  safe:   [81, 82, 83, 87, 88, 89, 33, 46, 59, 111, 124, 137]
};

// Apply path coloring
const gamePath = [...paths.top, ...paths.right, ...paths.bottom, ...paths.left, ...paths.safe];
gamePath.forEach((cell, index) => {
  $(`.section[data-cell='${cell}']`)
    .addClass("gamePath")
    .css("background-color", players[index % 4].color)
    .append(`<div class="sectionCentre"></div>`);
});

// Corner rounding rules
[
  { cells: [17, 41, 127], corner: "border-top-left-radius" },
  { cells: [23, 51, 121], corner: "border-top-right-radius" },
  { cells: [49, 119, 147], corner: "border-bottom-left-radius" },
  { cells: [43, 129, 153], corner: "border-bottom-right-radius" }
].forEach(rule => {
  rule.cells.forEach(cell => $(`[data-cell='${cell}']`).css(rule.corner, "50%"));
});

// Extra coloring by player
const playerCells = {
  blue: [20, 23, 33, 54, 46, 59],
  red: [103, 111, 124, 137, 147, 150],
  yellow: [21, 41, 80, 82, 83],
  green: [87, 88, 89, 90, 129, 148]
};
Object.entries(playerCells).forEach(([player, cells]) => {
  const color = players.find(p => p.id === player).color;
  cells.forEach(cell => $(`[data-cell='${cell}']`).css("background-color", color));
});

// Start cells
[147, 41, 23, 129].forEach(cell => {
  $(`[data-cell='${cell}']`).find(".sectionCentre").remove();
  $(`[data-cell='${cell}']`).append(`<div class="start">START</div>`);
});

// Centre Path
[72, 84, 85, 86, 98].forEach(cell => {
  $(`[data-cell='${cell}']`).append(`<div class="sectionCentre"></div>`);
});

// Add final centre
$("main").append(`<div class="finalCentre"><div class="centreTweek"></div></div>`);
