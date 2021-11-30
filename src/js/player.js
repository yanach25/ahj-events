import getRandomIntInclusive from './get-random';
import Renderer from './renderer';

export default class Player {
  constructor(renderer) {
    this.score = 0;
    this.miss = 0;
    this.renderer = renderer;
    this.currentPosition = getRandomIntInclusive(0, 3);
    this.renderer.renderField();
    this.renderer.setImage(this.currentPosition);
    this.success = false;
  }

  startGame() {
    this.intervalId = setInterval(() => {
      this.renderer.clearImg();
      if (!this.success) {
        this.miss += 1;
        this.renderer.missUp(this.miss);
      }

      this.success = false;

      if (this.miss > 4) {
        this.stopGame();
      }

      this.currentPosition = Player.getNewPosition(this.currentPosition);
      this.renderer.setImage(this.currentPosition);
    }, 1000);

    this.registerListener();
  }

  stopGame() {
    clearInterval(this.intervalId);
    this.renderer.field.removeEventListener('click', this.listener);
  }

  static getNewPosition(currentPosition) {
    const arrayOfPositions = [0, 1, 2, 3].filter((item) => item !== currentPosition);
    const randomIndex = getRandomIntInclusive(0, 2);

    return arrayOfPositions[randomIndex];
  }

  registerListener() {
    this.listener = (event) => {
      if (Renderer.isImage(event.target)) {
        this.score += 1;
        this.success = true;
        this.renderer.scoreUp(this.score);
        this.renderer.clearImg();
      }
    };

    this.renderer.field.addEventListener('click', this.listener);
  }
}
