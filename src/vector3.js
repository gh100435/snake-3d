/* Data-Structure */
export class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    addv3(v3) {
        return new Vector3(
            this.x + v3.x,
            this.y + v3.y,
            this.z + v3.z
        );
    }

    subv3(v3) {
        return new Vector3(
            this.x - v3.x,
            this.y - v3.y,
            this.z - v3.z
        );
    }

    mul(n) {
        return new Vector3(
            this.x * n,
            this.y * n,
            this.z * n
        );
    }

    div(n) {
        return new Vector3(
            this.x / n,
            this.y / n,
            this.z / n
        );
    }

    comp(v3) {
        return (
            (this.x == v3.x) &&
            (this.y == v3.y) &&
            (this.z == v3.z)
        );
    }
}