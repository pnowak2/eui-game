import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2]

    this.fontSize = 34;
    this.lineHeight = 42;
    this.fontOptions = {
      fontFamily: 'Arial',
      fontSize: this.fontSize,
      fill: '#fff'
    }
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    const sceneWidth = this.cameras.main.width;
    const sceneHeight = this.cameras.main.height;

    const graphics = this.add.graphics();
    const startColor = 0x1b4986;
    const endColor = 0xbfd0e4;

    graphics.fillGradientStyle(startColor, startColor, endColor, endColor, 1);
    graphics.fillRect(0, 0, sceneWidth, sceneHeight);

    if (this.config.canGoBack) {
      const backBtn = this.add.image(
        this.config.width - 10,
        this.config.height - 10,
        'back')
        .setInteractive()
        .setScale(2)
        .setOrigin(1, 1);

      backBtn.on('pointerup', () => {
        this.scene.start('PlayScene');
      });
    }
  }
}

export default BaseScene;