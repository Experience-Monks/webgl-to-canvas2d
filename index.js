var canvasPixels = require('canvas-pixels').get3d;

module.exports = function(webgl, canvas2D) {

  var outCanvas = canvas2D ? canvas2D.canvas || canvas2D : document.createElement('canvas');
  var outContext = outCanvas.getContext('2d');
  var outImageData;

  webgl = webgl instanceof WebGLRenderingContext ? webgl : webgl.getContext('webgl') || webgl.getContext('experimental-webgl');

  outCanvas.width = webgl.canvas.width;
  outCanvas.height = webgl.canvas.height;
  outImageData = outContext.getImageData(0, 0, outCanvas.width, outCanvas.height);

  outImageData.data.set(new Uint8ClampedArray(canvasPixels(webgl).buffer));
  outContext.putImageData(outImageData, 0, 0);
  outContext.translate(0, outCanvas.height);
  outContext.scale(1, -1);
  outContext.drawImage(outCanvas, 0, 0);
  outContext.setTransform(1, 0, 0, 1, 0, 0);

  return outCanvas;
};