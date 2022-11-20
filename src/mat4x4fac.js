import { Mat4x4 } from "./mat4x4.js";

export class Mat4x4Factory {
    static translate(m, tx, ty, tz) {
        return m.mulm(this.translation(tx, ty, tz));
    }

    static rotate(m, rx, ry, rz) {
        return m.mulm(this.rotation(rx, ry, rz));
    }

    static scale(m, sx, sy, sz) {
        return m.mulm(this.scaleling(sx, sy, sz));
    }

    static projection(width, height, depth) {
        return new Mat4x4([
            2 / width, 0, 0, 0,
            0, -2 / height, 0, 0,
            0, 0, 2 / depth, 0,
            -1, 1, 0, 1,
        ]);
    }

    static translation(tx, ty, tz) {
        return new Mat4x4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            tx, ty, tz, 1,
        ]);
    }

    static rotation(rx, ry, rz) {
        const RX = this.rotateX(rx);
        const RY = this.rotateY(ry);
        const RZ = this.rotateZ(rz);

        const RXYZ = RX.mulm(RY).mulm(RZ);
        return RXYZ;
    }
    
    static scaleling(sx, sy, sz) {
        return new Mat4x4([
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1,
        ]);
    }

    static rotationX(rad) {
        let c = Math.cos(rad);
        let s = Math.sin(rad);

        return new Mat4x4([
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1,
        ]);
    }

    static rotationY(rad) {
        let c = Math.cos(rad);
        let s = Math.sin(rad);

        return new Mat4x4([
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1,
        ]);

    }

    static rotationZ(rad) {
        let c = Math.cos(rad);
        let s = Math.sin(rad);

        return new Mat4x4([
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
    }
}