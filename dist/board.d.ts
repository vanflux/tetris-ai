import { PieceInfo } from "./pieces";
export interface FallingPiece {
    piece: PieceInfo;
    x: number;
    y: number;
    rotation: number;
}
export declare class Board {
    width: number;
    height: number;
    random: () => number;
    data: Uint8Array;
    fallingPiece: FallingPiece | undefined;
    nextPieces: PieceInfo[];
    gameOver: boolean;
    constructor(width: number, height: number, random: () => number, data?: Uint8Array);
    spawnFallingPiece(requestX?: number, requestRotation?: number): boolean;
    rotate(): void;
    moveLeft(): boolean;
    moveRight(): boolean;
    moveMaxDown(): void;
    moveDown(): boolean;
    checkColl(): boolean;
    checkCompletedLines(y: number, height: number): void;
    update(): void;
    ensureNextPieces(): void;
    putFallingPiece(): void;
    clone(): Board;
}
