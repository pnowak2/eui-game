import Phaser from 'phaser';
import BaseScene from './base.scene';
import { InMemoryStorage } from '../inmemory.storage';

class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);

    this.localStorage = new InMemoryStorage();

    this.velocity = 200;
    this.pipeVerticalDistanceRange = [100, 250];
    this.pipeHorizontalDistanceRange = [350, 500];

    this.flapVelocity = 380;
    this.pipesToRender = 4;

    this.flapSound = null;
    this.clickSound = null;
    this.hitSound = null;
    this.pointSound = null;
    this.city = null;
    this.clouds = null;
    this.bird = null;
    this.pipes = null;
    this.pipeVariantsCount = 20;
    this.score = 0;
    this.instructionText = '';
    this.pointsInfo = '';
    this.scoreText = '';
    this.levelUpText = '';
    this.bestScoreText = '';
    this.isPaused = false;

    this.currentDifficulty = 'easy';
    this.difficulties = {
      easy: {
        pipeHorizontalDistanceRange: [450, 550],
        pipeVerticalDistanceRange: [200, 250]
      },
      normal: {
        pipeHorizontalDistanceRange: [400, 500],
        pipeVerticalDistanceRange: [180, 230]
      },
      medium: {
        pipeHorizontalDistanceRange: [350, 450],
        pipeVerticalDistanceRange: [160, 220]
      },
      hard: {
        pipeHorizontalDistanceRange: [300, 400],
        pipeVerticalDistanceRange: [140, 200]
      }
    }
  }

  create() {
    this.currentDifficulty = 'easy';

    super.create();

    this.initializeSound();
    this.createCity();
    this.createClouds();
    this.createBird();
    this.createPipes();
    this.createGround();
    this.createColliders();
    this.createScore();
    this.createInstructions();
    this.handleInputs();
    this.listenToEvents();

    this.pause();

    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('bird', {
        start: 8,
        end: 15,
      }),
      frameRate: 16,
      repeat: -1
    });
    this.bird.play('fly');
  }

  update() {
    this.checkGameStatus();
    this.recyclePipes();
    this.recycleClouds();
  }

  initializeSound() {
    this.flapSound = this.sound.add('flap');
    this.hitSound = this.sound.add('hit');
    this.pointSound = this.sound.add('point');
    this.clickSound = this.sound.add('click');
  }

  createInstructions() {
    this.instructionText = this.add.text(this.config.width / 2, this.config.height / 2, 'CLICK or hit SPACE', {
      fontFamily: 'Arial',
      fontSize: '24px',
      fontWeight: 'normal',
      fill: '#fff'
    }).setOrigin(0.5, 0.5);

    this.pointsInfo = this.add.text(this.config.width / 2, this.instructionText.getBounds().bottom + 16, '100 points to win. Share your score on Teams.', {
      fontFamily: 'Arial',
      fontSize: '18px',
      fontWeight: 'normal',
      fill: '#000'
    }).setOrigin(0.5, 0.5);

    this.instructionText.setShadow(2, 2, 'rgba(0,0,0,0.7)', 2);
    this.pointsInfo.setShadow(2, 2, 'rgba(255,255,255,0.5)', 2);
  }

  createCity() {
    this.city = this.add
      .tileSprite(0, this.config.height + 50, this.config.width, 566, 'city')
      .setAlpha(0.4)
      .setOrigin(0, 1)
  }

  createClouds() {
    this.clouds = this.physics.add.group();
    this.clouds.create(20, 40, 'cloud')
      .setScale(0.5)
      .setAlpha(0.2)
      .setOrigin(0, 0);

    this.clouds.create(0.5 * this.config.width + 100, +20, 'cloud')
      .setScale(0.2)
      .setAlpha(0.2)
      .setOrigin(1, 0);

    this.clouds.create(this.config.width + 100, 120, 'cloud')
      .setScale(0.3)
      .setAlpha(0.2)
      .setOrigin(1, 0);

    this.clouds.setVelocityX(-90);
  }

  createBird() {
    this.bird = this.physics.add.sprite(
      this.config.startPosition.x,
      this.config.startPosition.y,
      'bird'
    )
      .setFlipX(true)
      .setScale(3)
      .setOrigin(0);

    this.bird.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

    this.bird.setBodySize(this.bird.width, this.bird.height - 8)
    this.bird.body.gravity.y = 600;
    this.bird.setCollideWorldBounds(true);
  }

  createPipes() {
    this.pipes = this.physics.add.group();


    for (let i = 0; i < this.pipesToRender; i++) {
      const upperPipe = this.pipes
        .create(0, 0, `pipe1`)
        .setImmovable(true)
        .setOrigin(0, 1);

      const lowerPipe = this.pipes
        .create(0, 0, `pipe1`)
        .setImmovable(true)
        .setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }

    this.pipes.setVelocityX(-this.velocity);
  }

  placePipe(uPipe, lPipe) {
    const difficulty = this.difficulties[this.currentDifficulty];
    const rightMostX = this.getRightMostPipe();

    const pipeVerticalDistance = Phaser.Math.Between(...difficulty.pipeVerticalDistanceRange);
    const pipeVerticalPosition = Phaser.Math.Between(20, this.config.height - 20 - pipeVerticalDistance);
    const pipeHorizontalDistance = Phaser.Math.Between(...difficulty.pipeHorizontalDistanceRange);

    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x + Phaser.Math.Between(-100, 100);
    lPipe.y = uPipe.y + pipeVerticalDistance;

    const lPipeNumber = Phaser.Math.Between(1, this.pipeVariantsCount);
    const uPipeNumber = Phaser.Math.Between(1, this.pipeVariantsCount);
    const lPipeName = `pipe${lPipeNumber}`;
    const uPipeName = `pipe${uPipeNumber}`;

    const lImage = this.scene.scene.textures.get(lPipeName);
    const uImage = this.scene.scene.textures.get(uPipeName);

    uPipe.setTexture(uPipeName)
    uPipe.setBodySize(uImage.width, uImage.height)
    lPipe.setTexture(lPipeName)
    lPipe.setBodySize(lImage.width, lImage.height)
  }

  getRightMostPipe() {
    let rightMostX = 0;

    this.pipes.getChildren().forEach(function (pipe) {
      rightMostX = Math.max(pipe.x, rightMostX);
    });

    return rightMostX;
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  createScore() {
    this.score = 0;
    const bestScore = this.localStorage.getItem('eui-flappy:bestScore');

    const logo = this.add
      .image(34, 44, 'splash')
      .setScale(0.15)
      .setOrigin(0.5);

    this.tweens.add({
      targets: logo,
      scaleX: 0.17,
      scaleY: 0.17,
      duration: 1000,
      yoyo: true,
      repeat: -1
    });

    this.scoreText = this.add.text(70, 16, `Score: ${this.score}`, {
      fontFamily: 'Arial',
      fontSize: '32px',
      fontWeight: 'normal',
      fill: '#fff'
    });
    this.scoreText.setShadow(2, 2, 'rgba(0,0,0,0.7)', 2);

    this.bestScoreText = this.add.text(70, 52, `My best score: ${bestScore || 0}`, {
      fontFamily: 'Arial',
      fontSize: '17px',
      fill: '#fff'
    });
    this.bestScoreText.setShadow(2, 2, 'rgba(0,0,0,0.7)', 2);

    this.levelUpText = this.add.text(
      ...this.screenCenter,
      '',{
        fontFamily: 'Arial',
        fontSize: '24px',
        fill: '#fff'
      }
    ).setOrigin(0.5);
    this.levelUpText.setShadow(2, 2, 'rgba(0,0,0,0.7)', 2);
  }

  pause() {
    this.isPaused = true;
    this.physics.pause();
  }

  resume() {
    this.isPaused = false;
    this.physics.resume();
    this.instructionText.setText('');
    this.pointsInfo.setText('');
  }

  handleInputs() {
    this.input.on('pointerdown', this.flap, this);
    this.input.on('pointerup', () => {
      if (this.isPaused) {
        this.resume();
      }
    }, this);
    this.input.keyboard.on('keydown-SPACE', this.flap, this);
    this.input.keyboard.on('keydown-SPACE', () => {
      if (this.isPaused) {
        this.resume();
      }
    }, this);
  }

  recyclePipes() {
    const tempPipes = [];

    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);

        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
          this.increaseScore();
          this.increaseDifficulty();

          return;
        }
      }
    });
  }

  recycleClouds() {
    this.clouds.getChildren().forEach((cloud) => {
      if (cloud.getBounds().right <= 0) {
        cloud.body.x = this.config.width + Phaser.Math.Between(0, 150);

        let randomInteger = Phaser.Math.Between(2, 8);
        let randomDecimal = randomInteger / 10;
        let randomNumber = Phaser.Math.Clamp(randomDecimal, 0.2, 0.8);

        cloud.body.scale = Phaser.Math.Between(randomNumber);
      }
    });
  }

  flap() {
    if (this.isPaused) { return; }

    this.bird.body.velocity.y -= this.flapVelocity;
    this.flapSound.play();
  }

  saveBestScore() {
    const bestScoreString = this.localStorage.getItem('eui-flappy:bestScore');
    const bestScore = bestScoreString && parseInt(bestScoreString, 10);

    if (!bestScore || this.score > bestScore) {
      this.localStorage.setItem('eui-flappy:bestScore', this.score);
    }
  }

  gameOver() {
    this.hitSound.play();

    this.physics.pause();
    this.bird.setTint(0xff0000);

    this.saveBestScore();

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false
    });
  }

  checkGameStatus() {
    if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
      this.gameOver();
    }
  }

  increaseScore() {
    this.score++;
    this.bestScore = this.score;

    this.scoreText.setText(`Score: ${this.score}`);
    this.pointSound.play();
  }

  increaseDifficulty() {
    if (this.score === 1) {
      this.notifyLevelUp('Level 2XS');
    }

    // if (this.score === 7) {
    //   this.notifyLevelUp('We will show you some fun facts');
    // }

    if (this.score === 10) {
      this.notifyLevelUp('Level XS');
    }

    // if (this.score === 14) {
    //   this.notifyLevelUp('Did you know..');
    // }

    // if (this.score === 16) {
    //   this.notifyLevelUp('eUI has mobile and ECL versions too ?');
    // }

    if (this.score === 20) {
      this.notifyLevelUp('Level M');
      this.currentDifficulty = 'normal'
    }

    // if (this.score === 24) {
    //   this.notifyLevelUp('We provide also patterns and templates..');
    // }

    // if (this.score === 26) {
    //   this.notifyLevelUp('with code examples');
    // }

    if (this.score === 30) {
      this.notifyLevelUp('Level L');
    }

    // if (this.score === 35) {
    //   this.notifyLevelUp('eUI provides Figma designs');
    // }

    if (this.score === 40) {
      this.notifyLevelUp('Level XL');
      this.currentDifficulty = 'medium'
    }

    // if (this.score === 45) {
    //   this.notifyLevelUp('Check also eui/cli tool to start fast');
    // }

    if (this.score === 50) {
      this.notifyLevelUp('Level 2XL');
    }

    // if (this.score === 55) {
    //   this.notifyLevelUp('eUI is Open Source');
    // }

    if (this.score === 60) {
      this.notifyLevelUp('Level 2XL');
      this.currentDifficulty = 'hard'
    }

    // if (this.score === 65) {
    //   this.notifyLevelUp('We provide design tokens as css vars');
    // }

    if (this.score === 70) {
      this.notifyLevelUp('Level 3XL');
    }

    // if (this.score === 75) {
    //   this.notifyLevelUp('We always support 3 major versions');
    // }

    if (this.score === 80) {
      this.notifyLevelUp('Level 4XL');
    }

    // if (this.score === 85) {
    //   this.notifyLevelUp('Anyone can contribute to eUI');
    // }

    // if (this.score === 90) {
    //   this.notifyLevelUp('Now go for final trophy!');
    // }

    if (this.score >= 100) {
      this.saveBestScore();
      this.scene.start('WinScene');
    }
  }

  notifyLevelUp(text) {
    this.levelUpText.setText(text || 'Level UP');
    setTimeout(() => {
      this.levelUpText.setText('');
    }, 2000);
    setTimeout(() => {
      this.clickSound.play();
    }, 500);

  }

  listenToEvents() {
    if (this.pauseEvent) { return }

    this.pauseEvent = this.events.on('resume', () => {
      this.initialTime = 3;
      this.countDownText = this.add.text(
        ...this.screenCenter,
        'Fly in ' + this.initialTime,
        this.fontOptions
      ).setOrigin(0.5);

      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.countDown,
        callbackScope: this,
        loop: true
      });
    });
  }

  countDown() {
    this.initialTime -= 1;
    this.countDownText.setText('Fly in ' + this.initialTime);

    if (this.initialTime < 0) {
      this.isPaused = false;

      this.countDownText.setText('');
      this.timedEvent.remove();

      this.physics.resume();
      this.scene.resume();
    }
  }

  createGround() {
    const logo = this.add
      .image(0, this.config.height, 'grass')
      .setOrigin(0, 1);
  }
}

export default PlayScene;