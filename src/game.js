import { Vector3 } from "./vector3.js";
import { Maximum, randNum } from "./utils.js";
import { Snake, SnakeState } from "./snake.js";

const SCENE_VALUE_TOP = 1000;

const CELL_SIZE = 10;
const VIEW_OFFSET = 10;

const KEY_CODE = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    SPACE: 'Space',
    SHIFT: 'ShiftLeft'
}

const COLOR_SCHEME = {
    BORDER: '#ffffff',
    MAP: '#ffffff',
    SNAKE: '#ffffff',
    APPLE: '#ff0000'
};

const vEmpty = new Vector3(0, 0, 0);

export class Game {
    constructor(sizeX, sizeY, sizeZ, gameSpeed) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.sizeZ = sizeZ;
        
        this.scene = 0;
        this.sceneValue = SCENE_VALUE_TOP / gameSpeed;

        this.initGame();
    }

    initGame() {
        this.score = 0;
        this.initSnake();
        this.setApple();
    }

    incScore() {
        this.score += 1;
    }

    initSnake() {
        this.snake = new Snake(
            new Vector3(
                randNum(this.sizeX),
                randNum(this.sizeY),
                randNum(this.sizeZ)
            ),
            SnakeState.Forward
        );
    }

    moveSnake() {
        const curHead = this.snake.body[0];
        const newHead = curHead.addv3(this.snake.vState);
        this.snake.body.unshift(newHead);

        if(newHead.x > this.sizeX - 1) {
            newHead.x = 0;
        }else if(newHead.x < 0) {
            newHead.x = this.sizeX - 1;
        }
        
        if(newHead.y > this.sizeY - 1) {
            newHead.y = 0;
        }else if(newHead.y < 0) {
            newHead.y = this.sizeY - 1;
        }
        
        if(newHead.z > this.sizeZ - 1) {
            newHead.z = 0;
        }else if(newHead.z < 0) {
            newHead.z = this.sizeZ - 1;
        }

        if(this.snake.body.length > this.snake.size) {
            this.snake.body.pop();
        }
    }

    turnSnake(vState) {
        const vCur = this.snake.vState
        const vSum = vCur.addv3(vState);
        /*
        if(!vEmpty.comp(vSum)) {
            this.snake.vState = vState;
        }
        */
        this.snake.vState = vState;
    }

    growSnake() {
        this.snake.size += 1;
    }

    setApple() {
        this.apple = new Vector3(
            randNum(this.sizeX),
            randNum(this.sizeY),
            randNum(this.sizeZ)
        );
    }

    checkEatApple() {
        const curHead = this.snake.body[0];
        return curHead.comp(this.apple);
    }

    checkSnakeCollision() {
        const curHead = this.snake.body[0];

        let i;
        for(i = 0; i < this.snake.size; i++) {
            if(curHead.comp(this.snake.body[i])) {
                return true;
            }
        }

        return false;
    }
    
    /* Logics */
    gameLogic() {
        this.moveSnake();

        if(this.checkEatApple()) {
            this.incScore();
            this.growSnake();
            this.setApple();
        }

        /*
        if(this.checkSnakeCollision()) {
            this.initGame();
        }
        */
    }

    gameLoop() {
        if(this.scene++ > this.sceneValue) {
            this.gameLogic();
            this.scene = 0;
        }
    }

    drawLoop(ctx, screenWidth, screenHeight) {
        const colors = {
            border: COLOR_SCHEME.BORDER,
            map: COLOR_SCHEME.MAP,
            snake: COLOR_SCHEME.SNAKE,
            apple: COLOR_SCHEME.APPLE
        }
        
        const ox = screenWidth / 2;
        const oy = screenHeight / 2;

        const cellSize = CELL_SIZE;
        const viewOffset = VIEW_OFFSET;

        const vw1w = this.sizeX * cellSize;
        const vw1h = this.sizeZ * cellSize;
        const vw2w = this.sizeY * cellSize;
        const vw2h = this.sizeZ * cellSize;
        const vw3w = this.sizeX * cellSize;
        const vw3h = this.sizeY * cellSize;

        const vwMax = Maximum(vw1w, vw2w, vw3w);
        const vhMax = Maximum(vw1h, vw2h, vw3h);

        const vwTw = vwMax * 3 + viewOffset * 4;
        const vwTh = vhMax + viewOffset * 2;
        const vwTx = ox - (vwTw / 2);
        const vwTy = oy - (vwTh / 2);

        ctx.moveTo(vwTx, vwTy);
        ctx.beginPath();
        ctx.rect(vwTx, vwTy, vwTw, vwTh);
        ctx.strokeStyle = colors.border;
        ctx.stroke();
        ctx.closePath();

        const vw1x = vwTx + vwMax * 0 + viewOffset * 1 + ((vwMax - vw1w) / 2);
        const vw1y = vwTy + viewOffset + ((vhMax - vw1h) / 2);

        ctx.moveTo(vw1x, vw1y);
        ctx.beginPath();
        ctx.rect(vw1x, vw1y, vw1w, vw1h);
        ctx.strokeStyle = colors.map;
        ctx.stroke();
        ctx.closePath();

        const vw2x = vwTx + vwMax * 1 + viewOffset * 2 + ((vwMax - vw2w) / 2);
        const vw2y = vwTy + viewOffset + ((vhMax - vw2h) / 2);

        ctx.moveTo(vw2x, vw2y);
        ctx.beginPath();
        ctx.rect(vw2x, vw2y, vw2w, vw2h);
        ctx.strokeStyle = colors.map;
        ctx.stroke();
        ctx.closePath(); 

        const vw3x = vwTx + vwMax * 2 + viewOffset * 3 + ((vwMax - vw3w) / 2);
        const vw3y = vwTy + viewOffset + ((vhMax - vw3h) / 2);

        ctx.moveTo(vw3x, vw3y);
        ctx.beginPath();
        ctx.rect(vw3x, vw3y, vw3w, vw3h);
        ctx.strokeStyle = colors.map;
        ctx.stroke();
        ctx.closePath();

        let i, v3, ax, ay;
        /* XZ Axis */
        for(i = 0; i < this.snake.size; i++) {
            v3 = this.snake.body[i];

            const bx = vw1x + v3.x * cellSize;
            const by = vw1y + v3.z * cellSize;

            ctx.moveTo(bx, by);
            ctx.beginPath();
            ctx.rect(bx, by, cellSize, cellSize);
            ctx.fillStyle = colors.snake;
            ctx.fill();
            ctx.closePath();
        }

        ax = vw1x + this.apple.x * cellSize;
        ay = vw1y + this.apple.z * cellSize;
        
        ctx.moveTo(ax, ay);
        ctx.beginPath();
        ctx.rect(ax, ay, cellSize, cellSize);
        ctx.fillStyle = colors.apple;
        ctx.fill();
        ctx.closePath();

        /* XZ Axis */
        for(i = 0; i < this.snake.size; i++) {
            v3 = this.snake.body[i];

            const bx = vw1x + v3.x * cellSize;
            const by = vw1y + v3.z * cellSize;

            ctx.moveTo(bx, by);
            ctx.beginPath();
            ctx.rect(bx, by, cellSize, cellSize);
            ctx.fillStyle = colors.snake;
            ctx.fill();
            ctx.closePath();
        }

        ax = vw1x + this.apple.x * cellSize;
        ay = vw1y + this.apple.z * cellSize;
        
        ctx.moveTo(ax, ay);
        ctx.beginPath();
        ctx.rect(ax, ay, cellSize, cellSize);
        ctx.fillStyle = colors.apple;
        ctx.fill();
        ctx.closePath();

        /* YZ Axis */
        for(i = 0; i < this.snake.size; i++) {
            v3 = this.snake.body[i];

            const bx = vw2x + v3.y * cellSize;
            const by = vw2y + v3.z * cellSize;

            ctx.moveTo(bx, by);
            ctx.beginPath();
            ctx.rect(bx, by, cellSize, cellSize);
            ctx.fillStyle = colors.snake;
            ctx.fill();
            ctx.closePath();
        }

        ax = vw2x + this.apple.y * cellSize;
        ay = vw2y + this.apple.z * cellSize;
        
        ctx.moveTo(ax, ay);
        ctx.beginPath();
        ctx.rect(ax, ay, cellSize, cellSize);
        ctx.fillStyle = colors.apple;
        ctx.fill();
        ctx.closePath();

        /* YX Axis */
        for(i = 0; i < this.snake.size; i++) {
            v3 = this.snake.body[i];

            const bx = vw3x + v3.x * cellSize;
            const by = vw3y + v3.y * cellSize;

            ctx.moveTo(bx, by);
            ctx.beginPath();
            ctx.rect(bx, by, cellSize, cellSize);
            ctx.fillStyle = colors.snake;
            ctx.fill();
            ctx.closePath();
        }

        ax = vw3x + this.apple.x * cellSize;
        ay = vw3y + this.apple.y * cellSize;
        
        ctx.moveTo(ax, ay);
        ctx.beginPath();
        ctx.rect(ax, ay, cellSize, cellSize);
        ctx.fillStyle = colors.apple;
        ctx.fill();
        ctx.closePath();
    }

    /* App interfaces */
    onKeyDown(e) {
        switch(e.code) {
            case KEY_CODE.UP:
                this.turnSnake(SnakeState.Forward);
                break;
            case KEY_CODE.DOWN:
                this.turnSnake(SnakeState.Back);
                break;
            case KEY_CODE.LEFT:
                this.turnSnake(SnakeState.Left);
                break;
            case KEY_CODE.RIGHT:
                this.turnSnake(SnakeState.Right);
                break;
            case KEY_CODE.SPACE:
                this.turnSnake(SnakeState.Up);
                break;
            case KEY_CODE.SHIFT:
                this.turnSnake(SnakeState.Down);
                break;
            default:
                break;
        }
    }

    animate(ctx, screenWidth, screenHeight) {
        this.gameLoop();
        this.drawLoop(ctx, screenWidth, screenHeight);
    }
}