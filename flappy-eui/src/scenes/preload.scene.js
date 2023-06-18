import BaseScene from './base.scene';

class PreloadScene extends BaseScene {
  constructor(config) {
    super('PreloadScene', config);
  }

  preload() {
    this.load.image('splash', 'assets/eui-logo.svg');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('pipe', 'assets/pipe.png');
    this.load.spritesheet('bird', 'assets/birdSprite.png', {
      frameWidth: 16,
      frameHeight: 16
    })
    this.load.image('pause', 'assets/pause.png');
    this.load.image('back', 'assets/back.png');
  }

  create() {
    this.scene.start('SplashScene');
  }
}

export default PreloadScene;