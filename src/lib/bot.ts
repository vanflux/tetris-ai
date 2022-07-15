import { Board } from "./board";
import { BoardMoveCalculator } from "./board-move-calculator";
import { BoardStatistics } from "./board-statistics";
import { IBoardFitness } from "./fitness";

export class Bot {
  constructor(
    private boardStatistics: BoardStatistics,
    private boardFitness: IBoardFitness,
    private boardMoveCalculator: BoardMoveCalculator,
  ) {}

  next(board: Board) {
    let maxDepth: number;
    const statistics = this.boardStatistics.calculate(board);
    if (statistics.minY >= 16) {
      maxDepth = 1;
    } else if (statistics.minY >= 8) {
      maxDepth = 2;
    } else {
      maxDepth = 3;
    }

    const result = this.boardMoveCalculator.calculate(
      board,
      this.boardFitness,
      this.boardStatistics,
      { maxDepth },
    );
    return { ...result, maxDepth };
  }
}
