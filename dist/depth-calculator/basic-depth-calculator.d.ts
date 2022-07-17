import { Board } from "../board";
import { BoardStatisticsData } from "../board-statistics";
import { IDepthCalculator } from "./i-depth-calculator";
export declare class BasicDepthCalculator implements IDepthCalculator {
    calculate(board: Board, { minY }: BoardStatisticsData): 1 | 2 | 3;
}
