const canvas = document.createElement('canvas');
const size = 400;

canvas.width=size;
canvas.height=size;

document.getElementById('root').appendChild(canvas);
const ctx = canvas.getContext('2d');

function draw(t, fn) {
  var b = new Date();

  var imageData = ctx.getImageData(0, 0, size, size);

  var pixels = imageData.data;

  for(let i = 0;i < pixels.length;i+=4) {
    const w = (i/4) % (size);
    const h = Math.floor((i/4) / (size));

    var rgba = fn(t, w, h);
    pixels[i] = rgba.r;
    pixels[i+1] = rgba.g;
    pixels[i+2] = rgba.b;
    pixels[i+3] = rgba.a;
  }
  ctx.putImageData(imageData, 0, 0);
}

const drawRed = (t, w, h) => ({ r: 255, g: 0, b: 0, a: 255 });
//draw(0, drawRed);

const bouncyBall = (t, w, h) => {
  const centerX = 200 + Math.sin(t/200) * 150;
  const centerY = 200 + Math.cos(t/200) * 150;
  const radius = 65 + Math.sin(t/200) * 50;
  const r = (w-centerX)*(w-centerX) + (h-centerY)*(h-centerY) > radius*radius ? 255 : 0;
  return { r: r, g: r, b: r, a: 255};
};

//  const c = Math.abs(w - h); -> top left to bot right gradient
let t = 0;
window.setInterval(() => {
  draw(t++, bouncyBall);
});

