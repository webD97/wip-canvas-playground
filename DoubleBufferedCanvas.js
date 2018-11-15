class DoubleBufferedCanvas {
    constructor(canvasElement) {
        this.frontCanvas = canvasElement;
        this.frontCanvasContext = canvasElement.getContext('2d');

        this.bufferCanvas = document.createElement('canvas');
        this.bufferCanvas.width = canvasElement.width;
        this.bufferCanvas.height = canvasElement.height;
        this.bufferCanvasContext = this.bufferCanvas.getContext('2d');
    }

    getContext(context) {
        return this.bufferCanvas.getContext(context);
    }

    swapBuffers() {
        this.frontCanvasContext.clearRect(0, 0, this.frontCanvas.width, this.frontCanvas.height);
        this.frontCanvasContext.drawImage(this.bufferCanvas, 0, 0);
        this.bufferCanvasContext.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
    };
}
