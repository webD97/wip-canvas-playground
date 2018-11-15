'use strict'

document.addEventListener('DOMContentLoaded', () => {
    setupGame('canvas', 60);
    startGame();
});

// Game management
const setupGame = (elementId, targetFPS) => {
    const gameState = {
        targetFPS: null,
        canvas: null,
        context: null,

        mouse: {
            x: null,
            y: null
        }
    };

    window.__gameState = gameState;

    gameState.targetFPS = targetFPS;
    gameState.canvas = document.getElementById(elementId);
    gameState.context = gameState.canvas.getContext('2d');

    gameState.canvas.addEventListener('click',(e) => clickListener(e, window.__gameState));
    gameState.canvas.addEventListener('keydown',(e) => keyboardListener(e, window.__gameState));
    gameState.canvas.addEventListener('mousemove', (e) => mouseMoveListener(e, window.__gameState));
};

const startGame = () => {
    window.__gameState.updateLoop = window.setInterval(() => {
        window.__gameState = gameLoop(window.__gameState);
    }, 1000 / window.__gameState.targetFPS);

    window.__gameState.canvas.focus();
};

const stopGame = (gameState) => {
    window.clearInterval(gameState.updateLoop);
};

// Helpers
const viewport2canvasPosition = (clientX, clientY, canvas) => {
    return {
        x: clientX - canvas.offsetLeft,
        y: clientY - canvas.offsetTop
    }
};

// Event listeners
const keyboardListener = (event, gameState) => {
    switch (String.fromCharCode(event.keyCode)) {
        case 'A':
            pressedKeyA(gameState);
            break;
        default:
            break;
    }
};

const clickListener = (event, gameState) => {
    console.log("CLICK");
};

const pressedKeyA = (gameState) => {
    console.log("'A' was pressed!");
    console.log("Mouse is at (" + gameState.mouse.x + "; " + gameState.mouse.y + ")!");
};

const mouseMoveListener = (event, gameState) => {
    const mousePos = viewport2canvasPosition(event.clientX, event.clientY, gameState.canvas);
    window.__mouseX = mousePos.x;
    window.__mouseY = mousePos.y;
};

// Game loop
const gameLoop = (gameState) => {
    const newState = update(gameState);
    draw(newState);

    return newState;
};

const update = (previousState) => {
    return {
         ...previousState,
         mouse: {
             x: window.__mouseX,
             y: window.__mouseY
        }
    };
};

const draw = (state) => {
    const ctx = state.context;

    ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(480, 360);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(480, 0);
    ctx.lineTo(0, 360);
    ctx.stroke();
};
