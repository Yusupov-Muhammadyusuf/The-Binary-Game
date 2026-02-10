const binaryBoxes = document.querySelectorAll('.binary_box');
const targetDisplay = document.getElementById('target_number');
const currentDisplay = document.getElementById('current_number');
const botProgressBar = document.getElementById('bot_progress');
const startBtn = document.getElementById('btn_start');
const resetBtn = document.getElementById('btn_reset');
let targetValue = 0;
let currentValue = 0;
let botInterval;
let isGameOver = true; // O'yin boshlanmaguncha true turadi
function setupGame() {
    targetValue = Math.floor(Math.random() * 255) + 1;
    targetDisplay.innerHTML = `Target: ${targetValue}`;
    currentDisplay.innerText = `Your Sum: 0`;
    updateBotUI(0);
    const digits = document.querySelectorAll('.digit_circle');
    digits.forEach(d => {
        d.innerText = "0";
        d.classList.remove('bg-primary', 'text-white');
    });
}
function startGame() {
    isGameOver = false;
    startBtn.classList.add('d-none');
    resetBtn.classList.remove('d-none');
    startBot(targetValue, 1500);
}
binaryBoxes.forEach((box) => {
    const upBtn = box.querySelector('.bi-chevron-up');
    const downBtn = box.querySelector('.bi-chevron-down');
    const digitBlock = box.querySelector('.digit_circle');
    const action = () => {
        if (!isGameOver) {
            toggleBit(digitBlock);
        }
        else {
            alert("Please press 'Start Game' first!");
        }
    };
    upBtn.onclick = action;
    downBtn.onclick = action;
});
function toggleBit(element) {
    const isZero = element.innerHTML === "0";
    element.innerText = isZero ? "1" : "0";
    element.classList.toggle('bg-primary', !isZero === false);
    element.classList.toggle('text-white', !isZero === false);
    updateTotal();
}
function updateTotal() {
    let sum = 0;
    const digits = document.querySelectorAll('.digit_circle');
    digits.forEach((digit, index) => {
        if (digit.innerText === "1") {
            sum += Math.pow(2, digits.length - 1 - index);
        }
    });
    currentValue = sum;
    currentDisplay.innerText = `Your Sum: ${currentValue}`;
    if (currentValue === targetValue)
        endGame("player");
}
function startBot(target, speed) {
    let currentBitIndex = 0;
    clearInterval(botInterval);
    botInterval = setInterval(() => {
        if (isGameOver)
            return clearInterval(botInterval);
        currentBitIndex++;
        const progress = (currentBitIndex / 8) * 100;
        updateBotUI(progress);
        if (currentBitIndex === 8) {
            clearInterval(botInterval);
            setTimeout(() => {
                if (!isGameOver)
                    endGame("bot");
            }, 100);
        }
    }, speed);
}
function updateBotUI(percent) {
    if (botProgressBar) {
        botProgressBar.style.width = percent + "%";
        botProgressBar.innerText = Math.floor(percent) + "%";
    }
}
function endGame(winner) {
    isGameOver = true;
    clearInterval(botInterval);
    if (winner === "player") {
        const winModal = new bootstrap.Modal(document.getElementById('winModal'));
        winModal.show();
    }
    else {
        // Bot yutgan holat
        const botModalEl = document.getElementById('botWinModal');
        const correctBinaryDisplay = document.getElementById('correct_binary_value');
        if (botModalEl && correctBinaryDisplay) {
            const correctBinary = targetValue.toString(2).padStart(8, '0');
            correctBinaryDisplay.innerText = correctBinary;
            const botWinModal = new bootstrap.Modal(botModalEl);
            botWinModal.show();
        }
    }
}
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', () => {
    location.reload();
});
window.onload = setupGame;
export {};
