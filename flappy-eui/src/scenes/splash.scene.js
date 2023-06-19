
import BaseScene from './base.scene';

class SplashScene extends BaseScene {
  constructor(config) {
    super('SplashScene', config);
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

    setTimeout(() => {
      this.scene.start('PlayScene');
    }, 3000);
  }
}

export default SplashScene;