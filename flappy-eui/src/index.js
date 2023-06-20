import Phaser from 'phaser';
import PlayScene from './scenes/play.scene';
import PreloadScene from './scenes/preload.scene';
import SplashScene from './scenes/splash.scene';
import WinScene from './scenes/win.scene';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
};

const SCENES = [
  SplashScene,
  PreloadScene,
  PlayScene,
  WinScene,
];

const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => SCENES.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
  scene: initScenes()
};

new Phaser.Game(config);
