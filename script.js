// Memory Match Game Logic

const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");

// Card symbols
const symbols = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🥝", "🍍"];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

// Initialize game
function startGame() {
  board.innerHTML = "";
  matches = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Duplicate and shuffle cards
  cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.textContent = "";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

// Flip card
function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains("matched")) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.symbol;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

// Check for match
function checkMatch() {
  lockBoard = true;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches++;
    resetTurn();

    if (matches === symbols.length) {
      setTimeout(() => alert("🎉 You won!"), 300);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.textContent = "";
      secondCard.textContent = "";
      resetTurn();
    }, 800);
  }
}

// Reset turn
function resetTurn() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart game
restartBtn.addEventListener("click", startGame);

// Start on load
startGame();
