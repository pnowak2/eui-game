import BaseScene from './base.scene';

class PreloadScene extends BaseScene {
  constructor(config) {
    super('PreloadScene', config);
  }

  preload() {
    this.load.image('cloud', 'assets/cloud.png');
    this.load.image('city', 'assets/city.png');
    this.load.image('pipe1', 'assets/pipes/pipe1.png');
    this.load.image('pipe2', 'assets/pipes/pipe2.png');
    this.load.image('pipe3', 'assets/pipes/pipe3.png');
    this.load.image('pipe4', 'assets/pipes/pipe4.png');
    this.load.image('pipe5', 'assets/pipes/pipe5.png');
    this.load.image('pipe6', 'assets/pipes/pipe6.png');
    this.load.image('pipe7', 'assets/pipes/pipe7.png');
    this.load.image('pipe8', 'assets/pipes/pipe8.png');
    this.load.image('pipe9', 'assets/pipes/pipe9.png');
    this.load.image('pipe10', 'assets/pipes/pipe10.png');
    this.load.image('pipe11', 'assets/pipes/pipe11.png');
    this.load.image('pipe12', 'assets/pipes/pipe12.png');
    this.load.image('pipe13', 'assets/pipes/pipe13.png');
    this.load.image('pipe14', 'assets/pipes/pipe14.png');
    this.load.image('pipe15', 'assets/pipes/pipe15.png');
    this.load.image('pipe16', 'assets/pipes/pipe16.png');
    this.load.image('pipe17', 'assets/pipes/pipe17.png');
    this.load.image('pipe18', 'assets/pipes/pipe18.png');
    this.load.image('pipe19', 'assets/pipes/pipe19.png');
    this.load.image('pipe20', 'assets/pipes/pipe20.png');
    this.load.spritesheet('bird', 'assets/birdSprite.png', {
      frameWidth: 16,
      frameHeight: 16
    })
    this.load.image('pause', 'assets/pause.png');
    this.load.image('back', 'assets/back.png');
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default PreloadScene;