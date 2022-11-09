import { Vector3 } from './vector3.js';

export const SnakeState = {
    Up: new Vector3(0, 0, 1),
    Down: new Vector3(0, 0, -1),
    Forward: new Vector3(0, -1, 0),
    Back: new Vector3(0, 1, 0),
    Left: new Vector3(-1, 0, 0),
    Right: new Vector3(1, 0, 0)
}

export class Snake {
    constructor(vHead, vState) {
        this.body = [vHead];
        this.vState = vState;
        this.size = 1; 
    }
}