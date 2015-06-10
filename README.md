# webgl-to-canvas2d

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Convert a webgl context or a webgl canvas into a 2d canvas.

## Usage

[![NPM](https://nodei.co/npm/webgl-to-canvas2d.png)](https://www.npmjs.com/package/webgl-to-canvas2d)

### `webglToCanvas2d(gl, [canvas2d])`

`gl` can be a canvas using webglrenderingcontext or a webglrenderingcontext.
`canvas2d` can be a canvas or a CanvasRenderingContext2D.

The returned value will be a canvas using CanvasRenderingContext2D.


```javascript
var webglToCanvas2d = require('webgl-to-canvas2d');

var glCanvas = document.body.appendChild(document.createElement('canvas'));
var gl = require('gl-context')(glCanvas, {preserveDrawingBuffer: true});
var canvas2d;

// RENDER SOME STUFF

canvas2d = webglToCanvas2d(glCanvas);

// or

canvas2d = webglToCanvas2d(gl);
```

## License

MIT, see [LICENSE.md](http://github.com/Jam3/webgl-to-canvas2d/blob/master/LICENSE.md) for details.
