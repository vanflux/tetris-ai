import { Board } from "../board";
import { BoardStatisticsData } from "../board-statistics";
import { IBoardFitness } from "./i-board-fitness";

export class BasicBoardFitness implements IBoardFitness {
  public fit(board: Board, { holes, yLevelsVariance, yLevelsMean, minY }: BoardStatisticsData) {
    const fitness = (
      (holes.length * -2) +
      (yLevelsVariance * -6 * ((1 - (minY / board.height)) * 2)) +
      (yLevelsMean * 1)
    );
    return fitness;
  }
}