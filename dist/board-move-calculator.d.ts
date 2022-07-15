import { Board } from "./board";
import { BoardStatistics } from "./board-statistics";
import { IBoardFitness } from "./fitness";
export interface BoardMoveCalculatorOptions {
    maxDepth: number;
}
export declare class BoardMoveCalculator {
    calculate(board: Board, boardFitness: IBoardFitness, boardStatistics: BoardStatistics, { maxDepth }: BoardMoveCalculatorOptions): {
        score: number;
        board: Board;
        x: number;
        rotation: number;
    };
}
