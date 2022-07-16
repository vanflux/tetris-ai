"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
class Bot {
    constructor(boardStatistics, boardFitness, boardMoveCalculator) {
        this.boardStatistics = boardStatistics;
        this.boardFitness = boardFitness;
        this.boardMoveCalculator = boardMoveCalculator;
    }
    next(board) {
        let maxDepth;
        const statistics = this.boardStatistics.calculate(board);
        if (statistics.minY >= 16) {
            maxDepth = 1;
        }
        else if (statistics.minY >= 8) {
            maxDepth = 2;
        }
        else {
            maxDepth = 3;
        }
        const result = this.boardMoveCalculator.calculate(board, this.boardFitness, this.boardStatistics, { maxDepth });
        return { ...result, maxDepth };
    }
}
exports.Bot = Bot;
