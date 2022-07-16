"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNumberToColor = exports.pieces = void 0;
const colors = [];
exports.pieces = [
    {
        type: 'I',
        color: convertColorToNumber('#03FFFF'),
        rotations: convertRotations([
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
        ]),
    },
    {
        type: 'J',
        color: convertColorToNumber('#0C03C5'),
        rotations: convertRotations([
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ],
        ]),
    },
    {
        type: 'L',
        color: convertColorToNumber('#FCAB00'),
        rotations: convertRotations([
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ],
        ]),
    },
    {
        type: 'O',
        color: convertColorToNumber('#FDFE00'),
        rotations: convertRotations([
            [
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
        ]),
    },
    {
        type: 'S',
        color: convertColorToNumber('#0BF40B'),
        rotations: convertRotations([
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1],
            ],
            [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
        ]),
    },
    {
        type: 'T',
        color: convertColorToNumber('#9803FB'),
        rotations: convertRotations([
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
        ]),
    },
    {
        type: 'Z',
        color: convertColorToNumber('#FE0608'),
        rotations: convertRotations([
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],
            ],
        ]),
    },
];
function convertRotations(rotations) {
    return rotations.map(rotation => {
        const positions = [];
        const width = rotation[0]?.length || 0;
        const height = rotation.length;
        for (let y = 0; y < rotation.length; y++) {
            for (let x = 0; x < rotation[y].length; x++) {
                if (rotation[y][x]) {
                    positions.push({ x, y });
                }
            }
        }
        return { positions, width, height };
    });
}
function convertColorToNumber(color) {
    const index = colors.indexOf(color);
    if (index < 0) {
        colors.push(color);
        return colors.length;
    }
    else {
        return index + 1;
    }
}
function convertNumberToColor(num) {
    return colors[num - 1];
}
exports.convertNumberToColor = convertNumberToColor;
