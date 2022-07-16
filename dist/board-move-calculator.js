"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardMoveCalculator = void 0;
class BoardMoveCalculator {
    calculate(board, boardFitness, boardStatistics, { maxDepth }) {
        let bestScore;
        let bestContext;
        function recursive(predBoard, depth, firstIterationContext) {
            if (depth === 0) {
                const statistics = boardStatistics.calculate(predBoard);
                const fitness = boardFitness.fit(predBoard, statistics);
                if (bestScore === undefined || fitness > bestScore) {
                    bestScore = fitness;
                    bestContext = firstIterationContext;
                }
            }
            else {
                for (let x = -1; x < predBoard.width - 1; x++) {
                    for (let rotation = 0; rotation < 4; rotation++) {
                        const clone = predBoard.clone();
                        if (clone.spawnFallingPiece(x, rotation)) {
                            clone.moveMaxDown();
                            const isFirstIteration = depth === maxDepth;
                            if (isFirstIteration) {
                                firstIterationContext = { board: clone, x, rotation };
                            }
                            recursive(clone, depth - 1, firstIterationContext);
                        }
                    }
                }
            }
        }
        recursive(board, maxDepth);
        return {
            score: bestScore,
            board: bestContext.board,
            x: bestContext.x,
            rotation: bestContext.rotation,
        };
    }
}
exports.BoardMoveCalculator = BoardMoveCalculator;
