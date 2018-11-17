class CanvasBuffer {
     /**
     * Create an offscreen canvas, useful for prerendering stuff. Basically a glorified canvas.
     * @param {number} width Canvas width
     * @param {number} height Canvas height
     * @param {string} context Context to create, defaults to '2d'
     */
    constructor(width, height, context = '2d') {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        this.context = canvas.getContext(context);
    }
}

export default CanvasBuffer;
