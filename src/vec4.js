export class Vec4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    copy() {
        return new Vec4(
            this.x,
            this.y,
            this.z,
            this.w
        );
    }

    addv(v) {
        return new Vec4(
            this.x + v.x,
            this.y + v.y,
            this.z + v.z,
            this.w + v.w
        );
    }

    subv(v) {
        return new Vec4(
            this.x - v.x,
            this.y - v.y,
            this.z - v.z,
            this.w - v.w
        );
    }

    scale3d(s) {
        return new Vec4(
            this.x * s,
            this.y * s,
            this.z * s,
            this.w * s
        );
    }

    dot3d(v) {
        return (
            this.x * v.x +
            this.y * v.y +
            this.z * v.z
        );
    }

    cross3d(v) {
        return new Vec4(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x,
            this.w
        );
    }

    size3d() {
        return Math.sqrt(
            this.x ** 2 +
            this.y ** 2 +
            this.z ** 2
        );
    }

    normalize3d() {
        var size = this.size3d();
        return this.scale3d(size);
    }
}