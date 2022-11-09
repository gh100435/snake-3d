import { Game } from "./game.js";

const GAME_SIZE_X = 20;
const GAME_SIZE_Y = 20;
const GAME_SIZE_Z = 20;
const DEFAULT_GAMESPEED = 100;

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.append(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.resize();
        window.addEventListener('resize', this.resize.bind(this), false);

        window.addEventListener('keydown', this.onKeyDown.bind(this), false);

        this.setGame();
        this.animate();
    }

    resize() {
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;

        this.canvas.width = this.screenWidth;
        this.canvas.height = this.screenHeight;
    }

    setGame() {
        this.game = new Game(
            GAME_SIZE_X,
            GAME_SIZE_Y,
            GAME_SIZE_Z,
            DEFAULT_GAMESPEED
        );
    }

    onKeyDown(e) {
        console.log(e);
        this.game.onKeyDown(e);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);

        this.game.animate(this.ctx, this.screenWidth, this.screenHeight);
    }
}

window.onload = () => {
    window.app = new App();
}