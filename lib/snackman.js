import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", () => {
  const canvasElement = document.getElementsByTagName('canvas')[0];
  canvasElement.width = Game.DIM_X;
  canvasElement.height = Game.DIM_Y;

  const ctx = canvasElement.getContext('2d');
  const game = new Game();
  new GameView(game, ctx).start();
});
