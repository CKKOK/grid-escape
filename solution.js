const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let length = parseInt(process.argv[2]) || 0;
let speed = parseInt(process.argv[3]) || 1000;
let threshold = parseInt(process.argv[4]) || 1000;
let __timer = null;
let grid = null;
const UP = Symbol('Up');
const DOWN = Symbol('Down');
const LEFT = Symbol('Left');
const RIGHT = Symbol('Right');
const ESCAPED = Symbol('Escaped!');
const directions = [UP, RIGHT, DOWN, LEFT];
let currentCoordinates = [0, 0];
let iteration = 0;

function getRandomDirection() {
    return directions[Math.floor(Math.random()*4)];
};

function generateSquareGrid(length) {
    let grid = Array.from({length: length}, () => 
        Array.from({length: length}, () => getRandomDirection())
    );
    return grid;
};

function rotateDirection(inputDir) {
    let index = directions.indexOf(inputDir);
    let result = null;
    if (index < directions.length - 1) {
        result = directions[index + 1];
    } else {
        result = directions[0];
    };
    return result;
};

function getRandomStartCoordinates(gridSize) {
    return [Math.floor(Math.random()*gridSize), Math.floor(Math.random()*gridSize)];
};

function setDirection(grid, x, y, direction) {
    grid[x][y] = direction;
};

function getNextCoordinates(gridSize, x, y, direction) {
    let result = [0, 0];
    switch(direction) {
        case UP:
            x <= 0 ? result = ESCAPED : result = [--x, y];
            break;
        case RIGHT:
            y >= gridSize - 1 ? result = ESCAPED : result = [x, ++y];
            break;
        case DOWN:
            x >= gridSize - 1 ? result = ESCAPED : result = [++x, y];
            break;
        case LEFT:
            y <= 0 ? result = ESCAPED : result = [x, --y];
            break;
        default:
            break;
    }
    return result;
}

function next() {
    iteration++;
    if (iteration >= threshold) {
        console.log('Threshold reached without escape');
        clearInterval(__timer);
        return;
    }
    let prevX = currentCoordinates[0];
    let prevY = currentCoordinates[1];
    let currentDirection = grid[prevX][prevY];
    let nextCoordinates = getNextCoordinates(length, prevX, prevY, currentDirection);
    if (nextCoordinates === ESCAPED) {
        console.log(`Escaped on iteration ${iteration}`);
        clearInterval(__timer);
        return;
    } else {
        setDirection(grid, prevX, prevY, rotateDirection(currentDirection));
        currentCoordinates = nextCoordinates;
        console.log(grid);
        console.log(`Going to (${currentCoordinates[1] + 1}, ${length - currentCoordinates[0]})`);
    };
};

function init() {
    currentCoordinates = getRandomStartCoordinates(length);
    console.log(grid);
    console.log(`At (${currentCoordinates[1] + 1}, ${length - currentCoordinates[0]})`);
    __timer = setInterval(next, speed);
};

if (process.argv[2] === undefined || process.argv[3] === undefined || process.argv[4] === undefined) {
    rl.question('Give me a dimension: ', (ans) => {
        length = parseInt(ans);
        grid = generateSquareGrid(length);
        rl.question('Set the interval (in ms): ', (interval) => {
            speed = interval;
            rl.question('Set the threshold (no. of iterations): ', (limit) => {
                threshold = limit;
                init();
                rl.close();
            })
        })
    });
} else {
    grid = generateSquareGrid(length);
    init();
}