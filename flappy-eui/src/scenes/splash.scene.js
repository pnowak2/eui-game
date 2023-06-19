
import BaseScene from './base.scene';

class SplashScene extends BaseScene {
  constructor(config) {
    super('SplashScene', config);

    this.texts = [
      'Loading eUI tokens..',
      'Generating eUI awesomness..',
      'Inflating eUI design system..',
      'Compiling eUI icons..',
      'Buffering eUI love..',
    ];
    this.actionText = '';
  }

  preload() {
    this.load.image('splash', 'assets/eui-logo.svg');
  }

  create() {
    this.cameras.main.setBackgroundColor('#333');

    const logo = this.add
      .image(this.config.width / 2, this.config.height / 2, 'splash')
      .setAlpha(0)
      .setScale(0.5);

    this.tweens.add({
      targets: logo,
      alpha: 1,
      duration: 1000,
      ease: 'Quan.InOut'
    });

    this.tweens.add({
      targets: logo,
      scaleX: 0.55,
      scaleY: 0.55,
      duration: 1000,
      yoyo: true,
      repeat: -1
    });

    this.actionText = this.add.text(this.config.width / 2, logo.getBounds().bottom + 18, this.texts[0], {
      fontFamily: 'Arial',
      fontSize: '14px',
      fontWeight: 'normal',
      fill: '#fff'
    }).setOrigin(0.5, 0);

    setTimeout(() => {
      this.scene.start('PreloadScene');
    }, 4000);

    let counter = 1;
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.actionText.setText(this.texts[counter % this.texts.length])
        counter += 1;
      },
      repeat: true,
      loop: true
    })
  }
}

export default SplashScene;