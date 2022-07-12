import { Board } from "./board";
import { convertNumberToColor } from "./pieces";

export class BoardView {
  private blockSize = 20;
  private canvasWidth: number;
  private canvasHeight: number;
  private ctx: CanvasRenderingContext2D;
  public onRequestRotate = () => {};
  public onRequestLeftMove = () => {};
  public onRequestRightMove = () => {};
  public onRequestDownMove = () => {};
  public onRequestMaxDownMove = () => {};
  
  constructor(
    private board: Board,
    private canvas: HTMLCanvasElement,
  ) {
    this.blockSize = 20;
    this.canvasWidth = board.width * this.blockSize;
    this.canvasHeight = board.height * this.blockSize;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.ctx = canvas.getContext('2d')!;

    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          this.onRequestRotate();
          break;
        case 'ArrowLeft':
          this.onRequestLeftMove();
          break;
        case 'ArrowRight':
          this.onRequestRightMove();
          break;
        case 'ArrowDown':
          this.onRequestDownMove();
          break;
        case ' ':
          this.onRequestMaxDownMove();
          break;
      }
    });
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    let x = 0;
    let y = 0;
    for (let i = 0; i < this.board.data.length; i++) {
      const color = convertNumberToColor(this.board.data[i]);
      if (color !== undefined) {
        this.drawBlock(x, y, color);
      }
      x++;
      if (x === this.board.width) {
        x = 0;
        y++;
      }
    }
    const { fallingPiece } = this.board;
    if (fallingPiece !== undefined) {
      const piecePositions = fallingPiece.piece.rotations[fallingPiece.rotation].positions;
      for (const {x: _x, y: _y} of piecePositions) {
        const x = fallingPiece.x + _x;
        const y = fallingPiece.y + _y;
        this.drawBlock(x, y, convertNumberToColor(fallingPiece.piece.color));
      }
    }
  }

  private drawBlock(x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
  }
}
