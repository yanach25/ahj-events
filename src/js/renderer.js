import img from '../img/goblin.png';

export default class Renderer {
  renderField() {
    const container = document.querySelector('#app');
    this.scoreContainer = document.createElement('div');
    this.scoreContainer.classList.add('score-wrapper');
    container.appendChild(this.scoreContainer);
    this.scoreContainer.innerHTML = `<div>
                                        <div>Score: <span id="score">0</span></div>
                                        <div>Miss: <span id="miss">0</span></div>
                                    </div>`;
    this.field = document.createElement('div');
    this.field.classList.add('field-container');
    container.appendChild(this.field);

    for (let i = 0; i < 4; i += 1) {
      this.field.appendChild(Renderer.getEmptyItem());
    }
  }

  scoreUp(score) {
    const scoreEl = this.scoreContainer.querySelector('#score');
    scoreEl.innerText = score;
  }

  missUp(score) {
    const missEl = this.scoreContainer.querySelector('#miss');
    missEl.innerText = score;
  }

  clearImg() {
    const imgItem = this.field.querySelector('img');
    if (imgItem) {
      const currentParent = imgItem.closest('.item');
      const emptyItem = Renderer.getEmptyItem();
      this.field.replaceChild(emptyItem, currentParent);
    }
  }

  setImage(position) {
    this.items = this.field.querySelectorAll('.item');
    this.items[position].appendChild(Renderer.getImg());
  }

  static getEmptyItem() {
    const emptyItem = document.createElement('div');
    emptyItem.classList.add('item');

    return emptyItem;
  }

  static getImg() {
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', img);
    imgEl.setAttribute('alt', 'goblin');

    return imgEl;
  }

  static isImage(target) {
    if (target.tagName === 'IMG') {
      return true;
    }

    const image = target.querySelector('img');

    return !!image;
  }
}
