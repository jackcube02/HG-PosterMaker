let hangulImgs = [];
let movers = [];

let speedSlider, sizeSlider, screenShotButton, bgColorPicker;
let bgColor;

function preload() {
  for (let i = 1; i <= 24; i++) {
    let img = loadImage(`조형한글모음/hangul${i}.png`);
    hangulImgs.push(img);
  }
}

function setup() {
  createCanvas(500, 800);
  bgColor = color(242, 242, 242);

  for (let i = 0; i < 24; i++) {
    let x = random(0, width - 50);
    let y = random(0, height - 50);
    movers.push(new Hangul(x, y));
  }

  createP('Speed');
  speedSlider = createSlider(0, 80, 1, 0.1);

  createP('Size');
  sizeSlider = createSlider(10, 100, 20, 0.5);

  createP('Background Color');
  bgColorPicker = createColorPicker('#f2f2f2');
  bgColorPicker.input(() => {
    bgColor = bgColorPicker.color();
  });

  screenShotButton = createButton('Save Your Poster!');
  screenShotButton.mousePressed(() => {
    saveCanvas('Hangul_Poster', 'png');
  });
}

function draw() {
  fill(red(bgColor), green(bgColor), blue(bgColor), 50);
  rect(0, 0, width, height);

  let speed = speedSlider.value();
  let size = sizeSlider.value();

  for (let mover of movers) {
    mover.update(speed);
    mover.display(size);
  }
}

class Hangul {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random([-1.5, -1, -0.5, 0.5, 1, 1.5]);
    this.dy = random([-1.5, -1, -0.5, 0.5, 1, 1.5]);
    this.img = random(hangulImgs);
  }

  update(speedScale) {
    this.x += this.dx * speedScale;
    this.y += this.dy * speedScale;

    if (this.x < 0 || this.x > width - 10) this.dx *= -1;
    if (this.y < 0 || this.y > height - 10) this.dy *= -1;
  }

  display(size) {
    image(this.img, this.x, this.y, size, size);
  }
}
