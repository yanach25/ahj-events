import getRandomIntInclusive from './get-random';
import Renderer from './renderer';

export default class Player {
  constructor(renderer) {
    this.score = 0;
    this.miss = 0;
    this.renderer = renderer;
    this.currentPosition = getRandomIntInclusive(0, 24);
    this.renderer.renderField();
    this.renderer.setImage(this.currentPosition);
    this.success = false;
    this.newGameButton = this.renderer.getNewGameButton();
    this.registerNewGameListener();
  }

  startGame() {
    this.newGameButton.parentNode.classList.add('none');
    this.intervalId = setInterval(() => {
      this.renderer.clearImg();
      if (!this.success) {
        this.miss += 1;
        this.renderer.renderScoreEl(this.miss, 'miss');
      }

      this.success = false;

      if (this.miss > 4) {
        this.stopGame();
        this.newGameButton.parentNode.classList.remove('none');
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
    const arrayOfPositions = Array(25)
      .fill(0)
      .map((_, index) => index)
      .filter((item) => item !== currentPosition);
    const randomIndex = getRandomIntInclusive(0, 24);

    return arrayOfPositions[randomIndex];
  }

  registerListener() {
    this.listener = (event) => {
      if (Renderer.isImage(event.target)) {
        this.score += 1;
        this.success = true;
        this.renderer.renderScoreEl(this.score, 'score');
        this.renderer.clearImg();
      }
    };

    this.renderer.field.addEventListener('click', this.listener);
  }

  registerNewGameListener() {
    this.newGameButton.addEventListener('click', () => {
      this.renderer.clearImg();
      this.score = 0;
      this.miss = 0;
      this.renderer.renderScoreEl(this.score, 'score');
      this.renderer.renderScoreEl(this.miss, 'miss');
      this.miss = -1;
      this.startGame();
    });
  }
}
