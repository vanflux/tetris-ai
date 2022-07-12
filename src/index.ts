import { Board } from "./board";
import { BoardMoveCalculator } from "./board-move-calculator";
import { BoardStatistics } from "./board-statistics";
import { BoardView } from "./board-view";
import { Bot } from "./bot";
import { BoardFitness1 } from "./fitness/board-fitness-1";
import { round, seedRandom, sleep } from "./utils";
import '../public/styles.css';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const delayInput = document.getElementById('delayInput') as HTMLInputElement;
const seedInput = document.getElementById('seedInput') as HTMLInputElement;
const movesLabel = document.getElementById('movesLabel') as HTMLSpanElement;
const depthLabel = document.getElementById('depthLabel') as HTMLSpanElement;
const fitnessLabel = document.getElementById('fitnessLabel') as HTMLSpanElement;
const toggleModeBtn = document.getElementById('toggleModeBtn') as HTMLButtonElement;

let mode = '';
let destroyCurrentMode = () => {};

function playable() {
  const seed = parseInt(seedInput.value);
  const random = seedRandom(seed);
  const board = new Board(10, 20, random);
  const boardView = new BoardView(board, canvas);
  boardView.onRequestRotate = () => board.rotate();
  boardView.onRequestLeftMove = () => board.moveLeft();
  boardView.onRequestRightMove = () => board.moveRight();
  boardView.onRequestDownMove = () => board.moveDown();
  boardView.onRequestMaxDownMove = () => board.moveMaxDown();
  board.spawnFallingPiece();
  const update = () => board.update();
  const draw = () => boardView.draw();
  update();
  draw();
  const timer1 = setInterval(update, 500);
  const timer2 = setInterval(draw, 30 / 1000);

  return () => {
    clearInterval(timer1);
    clearInterval(timer2);
    const nop = () => {};
    boardView.onRequestRotate = nop;
    boardView.onRequestLeftMove = nop;
    boardView.onRequestRightMove = nop;
    boardView.onRequestDownMove = nop;
    boardView.onRequestMaxDownMove = nop;
  }
}

function bot() {
  const seed = parseInt(seedInput.value);
  const random = seedRandom(seed);
  let board = new Board(10, 20, random);
  const bot = new Bot(
    new BoardStatistics(),
    new BoardFitness1(),
    new BoardMoveCalculator(),
  );
  
  let running = true;
  new Promise<void>(async resolve => {
    let iterations = 0;
    while(running) {
      const { board: nextBoard, score, rotation, x, maxDepth } = bot.next(board);
      console.log('Iteration=', iterations, ', maxDepth=', maxDepth, ', best score=', round(score), ', rotation=', rotation, ', x=', x);
      board = nextBoard;
      iterations++;
      movesLabel.textContent = iterations + '';
      depthLabel.textContent = maxDepth + '';
      fitnessLabel.textContent = round(score, 2) + '';
      let delay = Number(delayInput.value);
      if (delay) new BoardView(board, canvas).draw();
      if (delay) await sleep(delay);
      if (board.gameOver) break;
    }
    resolve();
  });

  return () => {
    running = false;
  };
}

toggleModeBtn.onclick = toggleMode;
seedInput.ontouchend = seedInput.onmouseup = reset;

function reset() {
  destroyCurrentMode();
  if (mode === 'player') {
    toggleModeBtn.textContent = 'Player Mode';
    destroyCurrentMode = bot();
  } else {
    toggleModeBtn.textContent = 'Bot Mode';
    destroyCurrentMode = playable();
  }
  toggleModeBtn.blur();
}

function toggleMode() {
  destroyCurrentMode();
  if (mode === 'player') {
    mode = 'bot';
  } else {
    mode = 'player';
  }
  reset();
}

reset();
