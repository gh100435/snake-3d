import { Material, Mesh } from "./struct.js";
import { Vec4 } from "./vec4.js";

export const materialRed = new Material(
    new Vec4(255, 0, 0, 1),
    1
);

export const meshCube = new Mesh(
   [
        new Vec4(1, 1, 1, 0),
        new Vec4(1, -1, 1, 0),
        new Vec4(-1, -1, 1, 0),
        new Vec4(-1, 1, 1, 0),
        new Vec4(1, 1, -1, 0),
        new Vec4(1, -1, -1, 0),
        new Vec4(-1, -1, -1, 0),
        new Vec4(-1, 1, -1, 0),
   ],
   [
        /*
            0, 1, 2, 3,
            4, 5, 6, 7,
        */
        [0, 1, 2], [0, 2, 3], //top
        [4, 6, 5], [4, 7, 6], // bottom
        [0, 4, 5], [0, 5, 1], // sides
        [1, 5, 6], [1, 6, 2],
        [2, 6, 7], [2, 7, 3],
        [3, 7, 4], [3, 7, 0]
   ]
);