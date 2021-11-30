import Renderer from './renderer';
import Player from './player';

const renderer = new Renderer();

const player = new Player(renderer);
player.startGame();
