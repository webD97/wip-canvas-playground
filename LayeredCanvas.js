import CanvasBuffer from './CanvasBuffer';
import DoubleBufferedCanvas from './DoubleBufferedCanvas';

/**
 * Blablabla - Gigi d'Agostino
 */
class LayeredCanvas extends DoubleBufferedCanvas  {
    /**
     * Create a new layered canvas
     * @param {HTMLCanvasElement} canvasElement Canvas to bind to
     * @param {Array} layerIDs Array of Layer IDs
     * @param {string} context drawing context to create
     */
    constructor(canvasElement, layerIDs, context) {
        super(canvasElement, context);

        this.activeLayer = 0;
        this.layers = {};

        for (i = 0; i < layerIDs.length; i++) {
            this.layers[layerIDs[i]] = new CanvasBuffer(canvasElement.width, canvasElement.height);
        }
    }

    set activeLayer(layerId) {
        this.activeLayer = layerId;
    }

    get context() {
        return this.layers[this.activeLayer].context;
    }
}
