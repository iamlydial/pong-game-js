const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
  constructor(ballELem) {
    this.ballELem = ballELem;
    this.reset();
  }

  //helper function to get direction, velocity, position of the ball

  // position
  get x() {
    return parseFloat(getComputedStyle(this.ballELem).getPropertyValue("--x"));
  }

  set x(value) {
    this.ballELem.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballELem).getPropertyValue("--y"));
  }

  set y(value) {
    this.ballELem.style.setProperty("--y", value);
  }

  rect() {
    return this.ballELem.getBoundingClientRect();
  }

  // velocity helper function
  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = {
      x: 0,
    };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    // velocity
    this.velocity = INITIAL_VELOCITY;
  }

  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += VELOCITY_INCREASE * delta;
    const rect = this.rect();
    //top bouncing
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    //left bouncing
    if (paddleRects.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
