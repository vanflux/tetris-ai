import { Board } from "./board";
import { BoardMoveCalculator } from "./board-move-calculator";
import { BoardStatistics } from "./board-statistics";
import { IDepthCalculator } from "./depth-calculator";
import { IBoardFitness } from "./fitness";

export class Bot {
  constructor(
    private boardStatistics: BoardStatistics,
    private boardFitness: IBoardFitness,
    private boardMoveCalculator: BoardMoveCalculator,
    private depthCalculator: IDepthCalculator,
  ) {}

  next(board: Board) {
    const statistics = this.boardStatistics.calculate(board);
    const maxDepth = this.depthCalculator.calculate(board, statistics);
    const result = this.boardMoveCalculator.calculate(
      board,
      this.boardFitness,
      this.boardStatistics,
      { maxDepth },
    );
    return { ...result, maxDepth };
  }
}
