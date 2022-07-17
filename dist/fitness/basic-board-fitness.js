"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicBoardFitness = void 0;
class BasicBoardFitness {
    fit(board, { holes, yLevelsVariance, yLevelsMean, minY }) {
        const fitness = ((holes.length * -2) +
            (yLevelsVariance * -6 * ((1 - (minY / board.height)) * 2)) +
            (yLevelsMean * 1));
        return fitness;
    }
}
exports.BasicBoardFitness = BasicBoardFitness;
