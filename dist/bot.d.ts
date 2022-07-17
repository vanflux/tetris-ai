import { Board } from "./board";
import { BoardMoveCalculator } from "./board-move-calculator";
import { BoardStatistics } from "./board-statistics";
import { IDepthCalculator } from "./depth-calculator";
import { IBoardFitness } from "./fitness";
export declare class Bot {
    private boardStatistics;
    private boardFitness;
    private boardMoveCalculator;
    private depthCalculator;
    constructor(boardStatistics: BoardStatistics, boardFitness: IBoardFitness, boardMoveCalculator: BoardMoveCalculator, depthCalculator: IDepthCalculator);
    next(board: Board): {
        maxDepth: number;
        score: number;
        board: Board;
        x: number;
        rotation: number;
    };
}
