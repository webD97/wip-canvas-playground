import CanvasBuffer from './CanvasBuffer';

/**
 * Incredibly important documentation goes here.
 */
class DoubleBufferedCanvas {
    /**
     * @param {HTMLCanvasElement} canvasElement
     * @param {string} context
     */
    constructor(canvasElement, context = '2d') {
        this.frontCanvasContext = canvasElement.getContext(context);
        this.buffer = new CanvasBuffer(canvasElement.width, canvasElement.height, context);
    }

    /**
     * Get the buffer canvas context
     */
    getContext() {
        return this.buffer.context;
    }

    /**
     * Flush the buffer onto the visible canvas and prepare the buffer for the next frame
     */
    swapBuffers() {
        this.frontCanvasContext.clearRect(0, 0,
            this.frontCanvasContext.canvas.width,
            this.frontCanvasContext.canvas.height);

        this.frontCanvasContext.drawImage(this.buffer.canvas, 0, 0);

        this.buffer.context.clearRect(0, 0,
            this.buffer.canvas.width,
            this.buffer.canvas.height);
    }
}

export default DoubleBufferedCanvas;
