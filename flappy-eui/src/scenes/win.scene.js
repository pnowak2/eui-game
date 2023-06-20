
import BaseScene from './base.scene';

class WinScene extends BaseScene {
  constructor(config) {
    super('WinScene', { ...config, canGoBack: true });

    this.winLogo = null;
    this.winSound = null;
  }

  preload() {
    this.load.audio('win', 'assets/win.mp3');
    this.load.image('win-logo', 'assets/win-logo.png');
  }

  create() {
    super.create();

    this.winSound = this.sound.add('win');
    this.winSound.play();

    this.winLogo = this.add
      .image(this.config.width / 2, this.config.height / 2, 'win-logo');

    this.tweens.add({
      targets: this.winLogo,
      scaleX: 0.85,
      scaleY: 0.85,
      duration: 400,
      ease: 'Quad.InOut',
      yoyo: true,
      repeat: -1
    });

    this.add
      .text(this.screenCenter[0], this.winLogo.getBounds().bottom , 'You won!', this.fontOptions)
      .setOrigin(0.5);
  }
}

export default WinScene;