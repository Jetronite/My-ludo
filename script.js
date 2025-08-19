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
    $(this).append(`<div class="seed ${playerId}Seed${i}" data-player="${playerId}" aria-label="${playerId} token"></div>`);
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


$(`[data-cell='41']`).addClass(`yellowStart`);
$(`[data-cell='23']`).addClass(`blueStart`);
$(`[data-cell='129']`).addClass(`greenStart`);
$(`[data-cell='147']`).addClass(`redStart`);











/* ================================
   A message to my future self: Don't return to this code until after you have seriously 
                                    cosidered how you want the code to run, because right
                                    now man my brain hurts
   BACKEND IS INSANE
================================ */

// // Script for Ludo game
// // This script handles the game logic, player turns, and token movements

// // Game logic
// // Players (order matters)
// // Player turn order (renamed from players)
// const playerOrder = ["yellow", "blue", "red", "green"];
// let currentPlayerIndex = 0;
// let firstDiceValue = null; // Track first roll to allow entering board
// let secondDiceValue = null; // Track second roll for moving tokens

// // Player positions (start at home = -1)
// let tokenPositions = {
//   yellow: [-1, -1, -1, -1],
//   blue:   [-1, -1, -1, -1],
//   red:    [-1, -1, -1, -1],
//   green:  [-1, -1, -1, -1],
// };

// // Each player's path (simplified)
// const playerPaths = {
//   yellow: [41,42,43,30,17,18,19,20,21,22,23,36,49,50,51,64,77,90,103,116,129,128,127,140,153,152,151,150,149,148,147,134,121,120,119,106,93,80,81,82,83,84,85], 
//   blue:   [23,36,49,50,51,64,77,90,103,116,129,128,127,140,153,152,151,150,149,148,147,134,121,120,119,106,93,80,67,54,41,42,43,30,17,18,19,20,33,46,59,72,85], 
//   red:    [147,134,121,120,119,106,93,80,67,54,41,42,43,30,17,18,19,20,21,22,23,36,49,50,51,64,77,90,103,116,129,128,127,140,153,152,151,150,137,124,111,98,85],
//   green:  [129,128,127,140,153,152,151,150,149,148,147,134,121,120,119,106,93,80,67,54,41,42,43,30,17,18,19,20,21,22,23,36,49,50,51,64,77,90,89,88,87,84,85]
// };

// // 🎲 Roll dice
// $("#roll-dice").on("click", function () {
//   firstDiceValue = Math.floor(Math.random() * 6) + 1;
//   secondDiceValue = Math.floor(Math.random() * 6) + 1;
//   $("#dice-result").text("Roll: First: " + firstDiceValue + ", Second: " + secondDiceValue);

//   const currentPlayer = playerOrder[currentPlayerIndex];
//   $("#turn-indicator").text("Turn: " + currentPlayer.toUpperCase());

//   // Highlight movable tokens
//   highlightMovableTokens(currentPlayer, firstDiceValue, secondDiceValue);
// });

// // Highlight which tokens can move
// function highlightMovableTokens(player, roll1, roll2) {
//   $(".seed").removeClass("highlight");

//   tokenPositions[player].forEach((pos, i) => {
//       $(`.seed[data-player='${player}']`).addClass("highlight");
//   });
// }

// // 🚶 Move token when clicked
// $(document).on("click", ".seed.highlight", move) 

// function move() {
//   const player = $(this).data("player");
//   // Find the correct token index among this player's tokens
//   const index = $(this).index(`.seed[data-player='${player}']`);
//   let pos = tokenPositions[player][index];

//   if (pos === -1 && firstDiceValue === 6) {
//     // Enter board
//     tokenPositions[player][index] = 0;
//   } else if (pos === -1 && secondDiceValue === 6) {
//     // Can't move if not on board and didn't roll 6
//   } else if (pos >= 0) {
//     // Move along path
//     tokenPositions[player][index] = Math.min(pos + diceValue, playerPaths[player].length - 1);
//   }

//   renderTokens();
//   endTurn();
// };

// // Render token positions on board
// function renderTokens() {
//   $(".sectionCentre .seed").remove(); // Clear board tokens

//   Object.keys(tokenPositions).forEach(player => {
//     tokenPositions[player].forEach((pos, i) => {
//       if (pos >= 0) {
//         let cell = playerPaths[player][pos];
//         $(`.section[data-cell='${cell}'] .sectionCentre`)
//           .append(`<div class="seed" data-player="${player}"></div>`);
//       }
//     });
//   });
// }

// // 🔄 End turn
// function endTurn() {
//   $(".seed").removeClass("highlight");

//   // If rolled 6 → same player again
//   if (diceValue !== 6) {
//     currentPlayerIndex = (currentPlayerIndex + 1) % playerOrder.length;
//   }

//   diceValue = null;
//   $("#turn-indicator").text("Turn: " + playerOrder[currentPlayerIndex].toUpperCase());
// }
