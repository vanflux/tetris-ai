import { Board } from "./board";
import { BoardMoveCalculator } from "./board-move-calculator";
import { BoardStatistics } from "./board-statistics";
import { IBoardFitness } from "./fitness";
export declare class Bot {
    private boardStatistics;
    private boardFitness;
    private boardMoveCalculator;
    constructor(boardStatistics: BoardStatistics, boardFitness: IBoardFitness, boardMoveCalculator: BoardMoveCalculator);
    next(board: Board): {
        maxDepth: number;
        score: number;
        board: Board;
        x: number;
        rotation: number;
    };
}
