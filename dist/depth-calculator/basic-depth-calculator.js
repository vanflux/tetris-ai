"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicDepthCalculator = void 0;
class BasicDepthCalculator {
    calculate(board, { minY }) {
        if (minY >= 16) {
            return 1;
        }
        else if (minY >= 8) {
            return 2;
        }
        else {
            return 3;
        }
    }
}
exports.BasicDepthCalculator = BasicDepthCalculator;
