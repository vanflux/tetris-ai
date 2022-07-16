import { Board } from "./board";
export interface YLevelsData {
    yLevels: number[];
    minY: number;
    yLevelsMean: any;
    yLevelsVariance: any;
}
export interface HolesData {
    holes: {
        x: number;
        y: number;
    }[];
}
export declare type BoardStatisticsData = YLevelsData & HolesData;
export declare class BoardStatistics {
    calculate(board: Board): BoardStatisticsData;
    private yLevelsData;
    private holesData;
}
