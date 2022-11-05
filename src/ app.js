/* 3D cube test */


// initiation
const canvas = document.createElement('canvas');
document.body.append(canvas);
const ctx = canvas.getContext('2d');

// resize
let screenWidth = document.body.clientWidth;
let screenHeight = document.body.clientHeight;

function resize() {
    screenWidth = document.body.clientWidth;
    screenHeight = document.body.clientHeight;
}
resize();
window.addEventListener('resize', resize);

// data-structure... for models
function Vector3(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.addv3 = (v3) => {
        return new Vector3(
            this.x + v3.x,
            this.y + v3.y,
            this.z + v3.z
        );
    }

    this.subv3 = (v3) => {
        return new Vector3(
            this.x - v3.x,
            this.y - v3.y,
            this.z - v3.z
        );
    }

    this.mul = (n) => {
        return new Vector3(
            this.x * n,
            this.y * n,
            this.z * z
        );
    }

    this.div = (n) => {
        return new Vector3(
            this.x / n,
            this.y / n
        );
    }

    this.getSize = () => {
        return Math.sqrt(
            this.x ** 2,
            this.y ** 2,
            this.z ** 2
        );
    }

    this.getNormalize = () => {
        const size = this.getSize();
        return this.mul();
    }
}

// model
let vertices = [
    new Vector3(1, 1, 1),
    new Vector3(1, -1, 1),
    new Vector3(-1, -1, 1),
    new Vector3(-1, 1, 1),
    new Vector3(1, 1, -1),
    new Vector3(1, -1, -1),
    new Vector3(-1, -1, -1),
    new Vector3(-1, 1, -1),
];

let edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 0],
    [0, 4], [1, 5], [2, 6], [3, 7],
];

let scale = 30;

// controller
function rotateX(rad) {
    let i, y, z, dy, dz;
    for(i = 0; i < vertices.length; i++) {
        y = vertices[i].y;
        z = vertices[i].z;

        dy = y * Math.cos(rad) - z * Math.sin(rad);
        dz = y * Math.sin(rad) + z * Math.cos(rad);

        vertices[i].y = dy;
        vertices[i].z = dz;
    }
}

function rotateY(rad) {
    let i, z, x, dz, dx;
    for(i = 0; i < vertices.length; i++) {
        z = vertices[i].z;
        x = vertices[i].x;

        dz = z * Math.cos(rad) - x * Math.sin(rad);
        dx = z * Math.sin(rad) + x * Math.cos(rad);

        vertices[i].z = dz;
        vertices[i].x = dx;
    }
}

function rotateZ(rad) {
    let i, x, y, dx, dy;
    for(i = 0; i < vertices.length; i++) {
        x = vertices[i].x;
        y = vertices[i].y;

        dx = x * Math.cos(rad) - y * Math.sin(rad);
        dy = x * Math.sin(rad) + y * Math.cos(rad);

        vertices[i].x = dx;
        vertices[i].y = dy;
    }
}

function scale(s) {

}

// view








/*
class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.append(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.resize();
        window.addEventListener('resize', this.resize.bind(this), false);
    }

    resize() {
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;
        
        this.canvas.width = this.screenWidth;
        this.canvas.height = this.screenHeight;
    }
}

window.onload = () => {
    window.app = new App();
}
*/