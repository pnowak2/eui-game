import Phaser from 'phaser';
import BaseScene from './base.scene';

class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);

    this.velocity = 200;
    this.pipeVerticalDistanceRange = [100, 250];
    this.pipeHorizontalDistanceRange = [350, 500];

    this.flapVelocity = 380;
    this.pipesToRender = 4;

    this.flapSound = null;
    this.hitSound = null;
    this.pointSound = null;
    this.city = null;
    this.clouds = null;
    this.bird = null;
    this.pipes = null;
    this.pipeVariantsCount = 20;
    this.score = 0;
    this.instructionText = '';
    this.scoreText = '';
    this.bestScoreText = '';
    this.isPaused = false;

    this.currentDifficulty = 'easy';
    this.difficulties = {
      easy: {
        pipeHorizontalDistanceRange: [450, 550],
        pipeVerticalDistanceRange: [200, 250]
      },
      normal: {
        pipeHorizontalDistanceRange: [350, 450],
        pipeVerticalDistanceRange: [170, 220]
      },
      hard: {
        pipeHorizontalDistanceRange: [250, 350],
        pipeVerticalDistanceRange: [140, 190]
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
  }

  createInstructions() {
    this.instructionText = this.add.text(this.config.width / 2, this.config.height / 2, 'Click or Space', {
      fontFamily: 'Arial',
      fontSize: '24px',
      fontWeight: 'normal',
      fill: '#fff'
    }).setOrigin(0.5, 0.5);
  }

  createCity() {
    this.city = this.add
      .tileSprite(0, this.config.height, this.config.width, 381, 'city')
      .setAlpha(0.2)
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

    lPipe.x = uPipe.x + Phaser.Math.Between(-150, 150);
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
    const bestScore = localStorage.getItem('eui-flappy:bestScore');

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontFamily: 'Arial',
      fontSize: '32px',
      fontWeight: 'normal',
      fill: '#fff'
    });
    this.bestScoreText = this.add.text(16, 52, `Best score: ${bestScore || 0}`, {
      fontFamily: 'Arial',
      fontSize: '18px',
      fill: '#fff'
    });
  }

  pause() {
    this.isPaused = true;
    this.physics.pause();
  }

  resume() {
    this.isPaused = false;
    this.physics.resume();
    this.instructionText.setText('');
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
    const bestScoreString = localStorage.getItem('eui-flappy:bestScore');
    const bestScore = bestScoreString && parseInt(bestScoreString, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem('eui-flappy:bestScore', this.score);
    }
  }

  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xff0000);
    this.hitSound.play();

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
    if (this.score === 5) {
      this.currentDifficulty = 'normal'
    }

    if (this.score === 10) {
      this.currentDifficulty = 'hard'
    }
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
    const ground = this.add
      .rectangle(0, this.config.height, this.config.width, 24, 0x467a39)
      .setOrigin(0, 1);
    this.add
      .rectangle(0, ground.getBounds().top, this.config.width, 2, 0x3f6e33)
      .setOrigin(0, 1);
    this.add
      .rectangle(0, this.config.height, this.config.width, 4, 0x38622e)
      .setOrigin(0, 1);
  }
}

export default PlayScene;