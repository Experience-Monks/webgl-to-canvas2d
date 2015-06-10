# webgl-to-canvas2d

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Convert a webgl context or a webgl canvas into a 2d canvas.

## Usage

[![NPM](https://nodei.co/npm/webgl-to-canvas2d.png)](https://www.npmjs.com/package/webgl-to-canvas2d)

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
