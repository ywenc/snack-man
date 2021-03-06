import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", () => {
  const canvasElement = document.getElementsByTagName('canvas')[0];
  canvasElement.width = 600;
  canvasElement.height = 800;

  const ctx = canvasElement.getContext('2d');
  const game = new Game();
  new GameView(game, ctx).init();
});
