import { Board } from "./board";
import { mean, variance } from "./utils";

export interface YLevelsData {
  yLevels: number[];
  minY: number;
  yLevelsMean: any;
  yLevelsVariance: any;
}

export interface HolesData {
  holes: {
    x: number;
    y: number;
  }[];
}

export type BoardStatisticsData = YLevelsData & HolesData;

export class BoardStatistics {
  public calculate(board: Board): BoardStatisticsData {
    return {...this.yLevelsData(board), ...this.holesData(board)};
  }

  private yLevelsData(board: Board): YLevelsData {
    const yLevels = [];
    let minY = board.height;
    for (let x = 0; x < board.width; x++) {
      let y = 0;
      while(y < board.height && board.data[y * board.width + x] === 0) y++;
      minY = y < minY ? y : minY;
      yLevels[x] = y;
    }
    const yLevelsMean = mean(yLevels);
    const yLevelsVariance = variance(yLevels);
    return { yLevels, minY, yLevelsMean, yLevelsVariance };
  }

  private holesData(board: Board): HolesData {
    let holes = [];
    for (let x = 0; x < board.width; x++) {
      let y = 0;
      while(y < board.height && board.data[y * board.width + x] === 0) y++;
      while(y < board.height) {
        if (board.data[y * board.width + x] === 0) {
          holes.push({ x, y });
        }
        y++;
      }
    }
    return { holes };
  }
}