'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const initialState = setupGame('canvas', 60);
    startGame(initialState);
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

    // window.__gameState = gameState;

    gameState.targetFPS = targetFPS;
    gameState.canvas = document.getElementById(elementId);
    gameState.context = gameState.canvas.getContext('2d');

    return gameState;
};

const startGame = (state) => {
    state.canvas.addEventListener('click',(e) => clickListener(e, state));
    state.canvas.addEventListener('keydown',(e) => keyboardListener(e, state));
    state.canvas.addEventListener('mousemove', (e) => mouseMoveListener(e, state));

    state.gameLoop = window.setInterval(() => {
        state = gameLoop(state);
    }, 1000 / state.targetFPS);

    state.canvas.focus();
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
