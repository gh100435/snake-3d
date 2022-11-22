import { Mat4x4Factory } from "./mat4x4fac.js";
import { Vec4 } from "./vec4.js";

const PRIMITIVE_TYPE = 3;

export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    initBuffers() {
        /* 이런 느낌
        this.verticesBuffer = [Vec4(1, 1, 1), Vec4(0, 0, 1), Vec4(3, 5, 1), Vec4(4, 1, 2)];
        this.fragmentsBuffer = [[0, 1, 2], [3, 4, 5], [5, 6, 8], [1, 2, 3]];
        this.primitiveType = PRIMITIVE_TYPE;
        */
        this.verticesBuffer = [];
        this.fragmentsBuffer = [];
        this.primitiveType = PRIMITIVE_TYPE;
    }

    addBuffers(vertices, fragments) {
        var curSize = this.verticesBuffer.length;

        let i;
        for(i = 0; i < vertices.length; i++) {
            this.verticesBuffer.push(vertices[i]);
        }

        for(i = 0; i < fragments.length; i++) {
            this.fragmentsBuffer.push([
                fragments[i][0] + curSize,
                fragments[i][1] + curSize,
                fragments[i][2] + curSize
            ]);
        }
    }

    /* for Application */
    pipeline(vertices, faces, mTransfrom, mResolution, mProjection) {
        
    }

    vertexShader(vertex, mTransfrom, mResolution, mProjection) {
        let v = vertex.copy();
        v = mTransfrom.mulv(v);
        v = mResolution.mulv(v);
        v = mProjection.mulv(v);

        return v;
    }

    fragmentShader(fragment, vNormal) {
        
    }
}