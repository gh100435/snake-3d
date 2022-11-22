export class Material {
    constructor(vColor, bright) {
        this.vColor = vColor;
        this.bright = bright;
    }
}

export class Mesh {
    constructor(vertices, faces) {
        this.vertices = vertices;
        this.faces = faces;
    }
}

export class Object3D {
    constructor(mesh, material, vTranslation, vRotation, vScaling) {
        this.mesh = mesh;
        this.vTranslation = vTranslation;
        this.vRotation = vRotation;
        this.vScaling = vScaling;
    }
    
    translate(vTranslate) {
        this.vTranslation = this.vTranslation.addv(vTranslate);
    }

    rotate(vRotate) {
        this.vRotation = this.vRotation.addv(vRotate);
    }

    scale(vScale) {
        this.vScaling = this.vScaling.addv(vScale);
    }
}