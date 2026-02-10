const binaryBoxes = document.querySelectorAll('.binary_box');
const targetDisplay = document.getElementById('target_number');
const currentDisplay = document.getElementById('current_number');
let targetValue = 0;
let currentValue = 0;
// Enterance to the game
function initGame() {
    targetValue = Math.floor(Math.random() * 255) + 1;
    targetDisplay.innerHTML = `Target: ${targetValue}`;
    binaryBoxes.forEach((box, index) => {
        const upBtn = box.querySelector('.bi-chevron-up');
        const downBtn = box.querySelector('.bi-chevron-down');
        const digitBlock = box.querySelector('.digit_circle');
        upBtn.onclick = () => toggleBit(digitBlock);
        downBtn.onclick = () => toggleBit(digitBlock);
    });
    updateTotal();
}
function toggleBit(element) {
    const isZero = element.innerHTML === "0";
    element.innerText = isZero ? "1" : "0";
    if (element.innerText === "1") {
        element.classList.add('bg-primary', 'text-white');
    }
    else {
        element.classList.remove('bg-primary', 'text-white');
    }
    updateTotal();
}
// Calculate total number
function updateTotal() {
    let sum = 0;
    const digits = document.querySelectorAll('.digit_circle');
    digits.forEach((digit, index) => {
        const power = digits.length - 1 - index;
        const bitValue = parseInt(digit.innerText);
        if (bitValue === 1) {
            sum += Math.pow(2, power);
        }
    });
    currentValue = sum;
    currentDisplay.innerText = `Current: ${currentValue}`;
    checkWin();
}
// Check win
function checkWin() {
    if (currentValue === targetValue) {
        const modal = new bootstrap.Modal(document.getElementById('winModal'));
        setTimeout(() => {
            modal.show();
        }, 200);
    }
}
// Update the game
function resetGame() {
    const digits = document.querySelectorAll('.digit_circle');
    digits.forEach(d => {
        d.innerText = "0";
        d.classList.remove('bg-primary', 'text-white');
    });
    initGame();
}
const playAgainBtn = document.getElementById('btn_play_again');
if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
        resetGame();
    });
}
window.onload = initGame;
export {};
