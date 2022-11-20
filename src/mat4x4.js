import { Vec4 } from "./vec4.js";

const MAT_COLUMNS = 4;
const MAT_ROWS = 4;
const MAT_SIZE = MAT_COLUMNS * MAT_ROWS;

export class Mat4x4 {
    constructor(arr = [
        ab00, ab01, ab02, ab03,
        ab10, ab11, ab12, ab13,
        ab20, ab21, ab22, ab23,
        ab30, ab31, ab32, ab33,
    ]) {
        this.arr = arr;
    }

    mulm(m) {
        let tmparr = new Array(MAT_SIZE);
        let columns = MAT_COLUMNS;
        let rows = MAT_ROWS;

        let i, j, k, idx;
        for(i = 0; i < rows; i++) {
            for(j = 0; j < columns; j++) {
                idx = i * columns + j;
                tmparr[idx] = 0;
                for(k = 0; k < columns; k++) {
                    tmparr[idx] += this.arr[i * columns + k] * m.arr[k * columns + j];
                }
            }
        }

        return tmparr;
    }

    mulv(v) {
        let x = 0;
        let y = 0;
        let z = 0;
        let w = 0;
        let columns = MAT_COLUMNS;

        x += this.arr[0 * columns + 0] * v.x;
        x += this.arr[0 * columns + 1] * v.y;
        x += this.arr[0 * columns + 2] * v.z;
        x += this.arr[0 * columns + 3] * v.w;

        y += this.arr[1 * columns + 0] * v.x;
        y += this.arr[1 * columns + 1] * v.y;
        y += this.arr[1 * columns + 2] * v.z;
        y += this.arr[1 * columns + 3] * v.w;

        z += this.arr[2 * columns + 0] * v.x;
        z += this.arr[2 * columns + 1] * v.y;
        z += this.arr[2 * columns + 2] * v.z;
        z += this.arr[2 * columns + 3] * v.w;

        w += this.arr[3 * columns + 0] * v.x;
        w += this.arr[3 * columns + 1] * v.y;
        w += this.arr[3 * columns + 2] * v.z;
        w += this.arr[3 * columns + 3] * v.w;

        return new Vec4(x, y, z, w);
    }
}