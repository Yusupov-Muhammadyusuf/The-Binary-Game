declare var bootstrap: any;

const binaryBoxes = document.querySelectorAll('.binary_box') as NodeListOf<HTMLElement>;
const targetDisplay = document.getElementById('target_number') as HTMLElement;
const currentDisplay = document.getElementById('current_number') as HTMLElement;

let targetValue: number = 0;
let currentValue: number = 0

// Enterance to the game
function initGame(): void {
    targetValue = Math.floor(Math.random() * 255) + 1;
    targetDisplay.innerHTML = `Target: ${targetValue}`;

    binaryBoxes.forEach((box, index) => {
        const upBtn = box.querySelector('.bi-chevron-up') as HTMLElement;
        const downBtn = box.querySelector('.bi-chevron-down') as HTMLElement;
        const digitBlock = box.querySelector('.digit_circle') as HTMLElement;

        upBtn.onclick = () => toggleBit(digitBlock);
        downBtn.onclick = () => toggleBit(digitBlock);
    });

    updateTotal();
}

function toggleBit(element: HTMLElement): void {
    const isZero = element.innerHTML === "0";
    element.innerText = isZero ? "1" : "0";

    if (element.innerText === "1") {
        element.classList.add('bg-primary', 'text-white');
    } else {
        element.classList.remove('bg-primary', 'text-white');
    }

    updateTotal()
}

// Calculate total number
function updateTotal(): void {
    let sum = 0;
    const digits = document.querySelectorAll('.digit_circle') as NodeListOf<HTMLElement>;

    digits.forEach((digit, index) => {
        const power = digits.length - 1 - index;
        const  bitValue = parseInt(digit.innerText);

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
        const modal = new bootstrap.Modal(
            document.getElementById('winModal')
        );

        setTimeout(() => {
            modal.show();
        }, 200);
    }
}

// Update the game
function resetGame() {
    const digits = document.querySelectorAll('.digit_circle') as NodeListOf<HTMLElement>;
    digits.forEach(d => {
        d.innerText = "0";
        d.classList.remove('bg-primary', 'text-white');
    });

    initGame();
}

const playAgainBtn = document.getElementById('btn_play_again') as HTMLButtonElement;

if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
        resetGame();
    });
}

window.onload = initGame;