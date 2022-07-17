"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
class Bot {
    constructor(boardStatistics, boardFitness, boardMoveCalculator, depthCalculator) {
        this.boardStatistics = boardStatistics;
        this.boardFitness = boardFitness;
        this.boardMoveCalculator = boardMoveCalculator;
        this.depthCalculator = depthCalculator;
    }
    next(board) {
        const statistics = this.boardStatistics.calculate(board);
        const maxDepth = this.depthCalculator.calculate(board, statistics);
        const result = this.boardMoveCalculator.calculate(board, this.boardFitness, this.boardStatistics, { maxDepth });
        return { ...result, maxDepth };
    }
}
exports.Bot = Bot;
