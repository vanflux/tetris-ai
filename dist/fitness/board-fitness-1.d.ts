import { Board } from "../board";
import { BoardStatisticsData } from "../board-statistics";
import { IBoardFitness } from "./i-board-fitness";
export declare class BoardFitness1 implements IBoardFitness {
    fit(board: Board, { holes, yLevelsVariance, yLevelsMean, minY }: BoardStatisticsData): number;
}
