import { Board } from "./board";
import { BoardStatistics } from "./board-statistics";
import { IBoardFitness } from "./fitness";

export interface BoardMoveCalculatorOptions {
  maxDepth: number;
}

interface FirstIterationContext {
  board: Board;
  x: number;
  rotation: number;
}

export class BoardMoveCalculator {
  calculate(
    board: Board,
    boardFitness: IBoardFitness,
    boardStatistics: BoardStatistics,
    { maxDepth }: BoardMoveCalculatorOptions
  ) {
    let bestScore!: number;
    let bestContext!: FirstIterationContext;
    function recursive(predBoard: Board, depth: number, firstIterationContext?: FirstIterationContext) {
      if (depth === 0) {
        const statistics = boardStatistics.calculate(predBoard);
        const fitness = boardFitness.fit(predBoard, statistics);
        if (bestScore === undefined || fitness > bestScore) {
          bestScore = fitness;
          bestContext = firstIterationContext!;
        }
      } else {
        for (let x = -1; x < predBoard.width - 1; x++) {
          for (let rotation = 0; rotation < 4; rotation++) {
            const clone = predBoard.clone();
            if (clone.spawnFallingPiece(x, rotation)) {
              clone.moveMaxDown();
              const isFirstIteration = depth === maxDepth;
              if (isFirstIteration) {
                firstIterationContext = { board: clone, x, rotation }
              }
              recursive(clone, depth - 1, firstIterationContext);
            }
          }
        }
      }
    }
    recursive(board, maxDepth);
    return {
      score: bestScore,
      board: bestContext.board,
      x: bestContext.x,
      rotation: bestContext.rotation,
    };
  }
}
