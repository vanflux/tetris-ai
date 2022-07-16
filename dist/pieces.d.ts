export interface PieceInfo {
    type: string;
    color: number;
    rotations: PieceRotationState[];
}
export interface PieceRotationState {
    positions: Position[];
    width: number;
    height: number;
}
export interface Position {
    x: number;
    y: number;
}
export declare const pieces: PieceInfo[];
export declare function convertNumberToColor(num: number): string;
