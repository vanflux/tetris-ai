"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const pieces_1 = require("./pieces");
const utils_1 = require("./utils");
class Board {
    constructor(width, height, random, data = new Uint8Array(width * height)) {
        this.width = width;
        this.height = height;
        this.random = random;
        this.data = data;
        this.nextPieces = [];
        this.gameOver = false;
    }
    spawnFallingPiece(requestX, requestRotation) {
        this.ensureNextPieces();
        const piece = this.nextPieces.shift();
        const width = piece.rotations[0].width;
        const x = requestX === undefined ? Math.floor(this.width / 2) - Math.ceil(width / 2) : requestX;
        const rotation = requestRotation || 0;
        this.fallingPiece = { x, y: -2, piece, rotation };
        if (this.checkColl()) {
            this.fallingPiece = undefined;
            return false;
        }
        else {
            return true;
        }
    }
    rotate() {
        if (this.fallingPiece === undefined)
            return;
        const rotationsCount = this.fallingPiece.piece.rotations.length;
        const newRotations = (this.fallingPiece.rotation + 1) % rotationsCount;
        const oldRotation = this.fallingPiece.rotation;
        this.fallingPiece.rotation = newRotations;
        if (this.checkColl())
            this.fallingPiece.rotation = oldRotation;
    }
    moveLeft() {
        if (this.fallingPiece === undefined)
            return true;
        this.fallingPiece.x--;
        if (this.checkColl()) {
            this.fallingPiece.x++;
            return false;
        }
        return true;
    }
    moveRight() {
        if (this.fallingPiece === undefined)
            return true;
        this.fallingPiece.x++;
        if (this.checkColl()) {
            this.fallingPiece.x--;
            return false;
        }
        return true;
    }
    moveMaxDown() {
        if (this.fallingPiece === undefined)
            return;
        while (this.moveDown())
            ;
    }
    moveDown() {
        if (this.fallingPiece === undefined)
            return true;
        this.fallingPiece.y++;
        if (!this.checkColl())
            return true;
        this.fallingPiece.y--;
        this.putFallingPiece();
        this.spawnFallingPiece();
        return false;
    }
    checkColl() {
        const positions = this.fallingPiece.piece.rotations[this.fallingPiece.rotation].positions;
        for (const { x: _x, y: _y } of positions) {
            const x = this.fallingPiece.x + _x;
            if (x < 0 || x >= this.width)
                return true;
            const y = this.fallingPiece.y + _y;
            if (y >= this.height)
                return true;
            if (y < 0)
                continue;
            if (this.data[y * this.width + x] !== 0)
                return true;
        }
        return false;
    }
    checkCompletedLines(y, height) {
        const startI = y * this.width;
        const endI = Math.min(this.data.length, (y + height) * this.width);
        for (let i = startI; i < endI; i += this.width) {
            let isCompleteRow = true;
            for (let j = i; j < i + this.width; j++) {
                if (this.data[j] === 0) {
                    isCompleteRow = false;
                    break;
                }
            }
            if (isCompleteRow) {
                for (let j = i + this.width - 1; j >= 0; j--) {
                    this.data[j] = this.data[j - this.width] || 0;
                }
            }
        }
    }
    update() {
        this.moveDown();
    }
    ensureNextPieces() {
        if (this.nextPieces.length < pieces_1.pieces.length) {
            const chunk = [...pieces_1.pieces];
            (0, utils_1.shuffleArray)(chunk, this.random);
            this.nextPieces.push(...chunk);
        }
    }
    putFallingPiece() {
        const { positions, height } = this.fallingPiece.piece.rotations[this.fallingPiece.rotation];
        for (const { x: _x, y: _y } of positions) {
            const x = this.fallingPiece.x + _x;
            const y = this.fallingPiece.y + _y;
            if (y < 0) {
                this.gameOver = true;
                continue;
            }
            this.data[y * this.width + x] = this.fallingPiece.piece.color;
        }
        this.checkCompletedLines(this.fallingPiece.y, height);
        this.fallingPiece = undefined;
    }
    setNextPieces(nextPieces) {
        this.nextPieces = nextPieces;
    }
    clone() {
        const newBoard = new Board(this.width, this.height, this.random, new Uint8Array(this.data));
        newBoard.fallingPiece = this.fallingPiece && { ...this.fallingPiece };
        newBoard.nextPieces = [...this.nextPieces];
        return newBoard;
    }
}
exports.Board = Board;
