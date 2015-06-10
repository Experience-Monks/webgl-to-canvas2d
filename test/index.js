var webglToCanvas2d = require('./..');
var tape = require('tape');
var glCanvas = document.body.appendChild(document.createElement('canvas'));
var gl = require('gl-context')(glCanvas, {preserveDrawingBuffer: true});
var createTexture = require('gl-texture2d');
var display = require('gl-texture2d-display');
var textureCanvas = document.createElement('canvas');
var textureContext = textureCanvas.getContext('2d');
var texture; 

textureCanvas.width = 200;
textureCanvas.height = 200;

glCanvas.width = textureCanvas.width;
glCanvas.height = textureCanvas.height;

drawCorners();

texture = createTexture(gl, textureCanvas);

render();
doTests();

function doTests() {

  tape('test creating from canvas', function(t) {
    doChecks(t, glCanvas);
    t.end();
  });

  tape('test creating from webglcanvascontext', function(t) {
    doChecks(t, gl);
    t.end();
  });

  tape('test creating with target canvas', function(t) {

    var canvas = document.createElement('canvas');
    var returnedCanvas = doChecks(t, glCanvas, canvas);

    t.equal(canvas, returnedCanvas, 'the same canvas was returned');
    t.end();
  });

  tape('test creating with target canvas context', function(t) {

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var returnedCanvas = doChecks(t, glCanvas, context);

    t.equal(canvas, returnedCanvas, 'the same canvas was returned');
    t.end();
  });
}

function doChecks(t, gl, canvas2d) {
  var canvas2d = webglToCanvas2d(gl, canvas2d);
  var context = canvas2d.getContext('2d');
  var data = context.getImageData(0, 0, canvas2d.width, canvas2d.height).data;
  var pixel;

  document.body.appendChild(canvas2d);

  t.ok(canvas2d instanceof HTMLCanvasElement, 'canvas was returned');
  t.equal(canvas2d.width, glCanvas.width, 'width was correct');
  t.equal(canvas2d.height, glCanvas.height, 'height was correct');

  pixel = getPixel(data, 0, 0);
  t.equal(pixel[ 0 ], 255, 'top right red correct');
  t.equal(pixel[ 1 ], 0, 'top right green correct');
  t.equal(pixel[ 2 ], 0, 'top right blue correct');

  pixel = getPixel(data, canvas2d.width - 1, canvas2d.height - 1);
  t.equal(pixel[ 0 ], 0, 'bottom right red correct');
  t.equal(pixel[ 1 ], 0, 'bottom right green correct');
  t.equal(pixel[ 2 ], 255, 'bottom right blue correct');

  return canvas2d;
}

function getPixel(data, x, y) {
  
  var i = y * glCanvas.width * 4 + x * 4;

  return Array.prototype.slice.call(data, i, i + 4);
}

function render() {
  
  gl.viewport(0, 0, glCanvas.width, glCanvas.height);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  display(texture);

  gl.finish();
}

function drawCorners() {

  textureContext.fillStyle = '#F00';
  textureContext.fillRect(0, 0, 10, 10);

  textureContext.fillStyle = '#00F';
  textureContext.fillRect(glCanvas.width - 10, glCanvas.height - 10, 10, 10);
}