
export const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked',
};



export function createBoard(boardSize, numberOfMines) {
    const board = [];
    const minePositions = getMinePositions(boardSize, numberOfMines);

    for (let x = 0; x < boardSize; x++) {
        const row = [];
        for (let y = 0; y < boardSize; y++) {
            const element = document.createElement('div');
            element.dataset.status = TILE_STATUSES.HIDDEN;
            const tile = {
                element,
                x,
                y,
                mine: exists(minePositions, { x, y }),
                get status() {
                    return this.element.dataset.status;
                },
                set status(value) {
                    this.element.dataset.status = value;
                },
            };
            row.push(tile);
        };
        board.push(row);
    };

    return board;
};
export function markTile(tile) {
    if (tile.status === TILE_STATUSES.HIDDEN) {
        tile.status = TILE_STATUSES.MARKED;
        return;
    }
    if (tile.status === TILE_STATUSES.MARKED) {
        tile.status = TILE_STATUSES.HIDDEN;
        return;
    };
}
function getMinePositions(boardSize, numberOfMines) {
    const positions = [];

    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize),
            y: randomNumber(boardSize),
        };

        if (!exists(positions, position)) {
            positions.push(position);
        };
    };

    return positions;
};

function randomNumber(size) {
    return Math.floor(Math.random() * size);
};

function exists(board, position) {
    for (let i = 0; i < board.length; i++) {
        if (board[i].x === position.x && board[i].y === position.y) {
            return true;
        };
    }
    return false;
};