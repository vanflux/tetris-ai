import { Board } from "../board";
import { BoardStatisticsData } from "../board-statistics";
export interface IBoardFitness {
    fit(board: Board, statisticsData: BoardStatisticsData): number;
}
