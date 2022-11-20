import { Mat4x4Factory } from "./mat4x4fac.js";

export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    vertexShader(vertex, width, height, vTranslation, vRotation, vScale) {
        let v = vertex;

        const T = Mat4x4Factory.translation(vTranslation.x, vTranslation.y, vTranslation.z);
        const R = Mat4x4Factory.rotation(vRotation.x, vRotation.y, vRotation.z);
        const S = Mat4x4Factory.scaleling(vScale.x, vScale.y, vScale.z);
        const TRS = S.mulm(R).mulm(T);

        const P = Mat4x4Factory.projection(width, height, 400);

        v = P.mulv(v);
        v = TRS.mulv(v);

        return v;
    }

    renderObjects3D(objects3d) {
        let objects3d = objects3d;

        let i, j;
        for(i = 0; i < objects3d.length; i++) {
            let o3d = objects3d[i];
        }
    }
}