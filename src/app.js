class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.append(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.resize();
        window.addEventListener('resize', this.resize.bind(this));

        this.objects3d = [];

        this.animate();
    }

    update() {

    }

    render() {

    }

    resize() {
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;

        this.canvas.width = this.screenWidth;
        this.canvas.height = this.screenHeight;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.update();
        this.render(); 
    }
}

window.onload = () => {
    window.app = new App();
}