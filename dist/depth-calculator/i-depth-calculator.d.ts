import { Board } from "../board";
import { BoardStatisticsData } from "../board-statistics";
export interface IDepthCalculator {
    calculate(board: Board, statisticsData: BoardStatisticsData): number;
}
