import { Board } from "../board";
import { BoardStatisticsData } from "../board-statistics";
import { IDepthCalculator } from "./i-depth-calculator";

export class BasicDepthCalculator implements IDepthCalculator {
  public calculate(board: Board, { minY }: BoardStatisticsData) {
    if (minY >= 16) {
      return 1;
    } else if (minY >= 8) {
      return 2;
    } else {
      return 3;
    }
  }
}