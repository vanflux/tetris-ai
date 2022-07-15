"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardStatistics = void 0;
const utils_1 = require("./utils");
class BoardStatistics {
    calculate(board) {
        return { ...this.yLevelsData(board), ...this.holesData(board) };
    }
    yLevelsData(board) {
        const yLevels = [];
        let minY = board.height;
        for (let x = 0; x < board.width; x++) {
            let y = 0;
            while (y < board.height && board.data[y * board.width + x] === 0)
                y++;
            minY = y < minY ? y : minY;
            yLevels[x] = y;
        }
        const yLevelsMean = (0, utils_1.mean)(yLevels);
        const yLevelsVariance = (0, utils_1.variance)(yLevels);
        return { yLevels, minY, yLevelsMean, yLevelsVariance };
    }
    holesData(board) {
        let holes = [];
        for (let x = 0; x < board.width; x++) {
            let y = 0;
            while (y < board.height && board.data[y * board.width + x] === 0)
                y++;
            while (y < board.height) {
                if (board.data[y * board.width + x] === 0) {
                    holes.push({ x, y });
                }
                y++;
            }
        }
        return { holes };
    }
}
exports.BoardStatistics = BoardStatistics;
