"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardFitness1 = void 0;
class BoardFitness1 {
    fit(board, { holes, yLevelsVariance, yLevelsMean, minY }) {
        const fitness = ((holes.length * -2) +
            (yLevelsVariance * -6 * ((1 - (minY / board.height)) * 2)) +
            (yLevelsMean * 1));
        return fitness;
    }
}
exports.BoardFitness1 = BoardFitness1;
