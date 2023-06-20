(()=>{"use strict";var e,t={333:(e,t,i)=>{var s=i(260),a=i.n(s);class n extends a().Scene{constructor(e,t){super(e),this.config=t,this.screenCenter=[t.width/2,t.height/2],this.fontSize=34,this.lineHeight=42,this.fontOptions={fontFamily:"Arial",fontSize:this.fontSize,fill:"#fff"}}create(){this.add.image(0,0,"sky").setOrigin(0,0);const e=this.cameras.main.width,t=this.cameras.main.height,i=this.add.graphics(),s=1788294,a=12570852;if(i.fillGradientStyle(s,s,a,a,1),i.fillRect(0,0,e,t),this.config.canGoBack){this.add.image(this.config.width-10,this.config.height-10,"back").setInteractive().setScale(2).setOrigin(1,1).on("pointerup",(()=>{this.scene.start("MenuScene")}))}}createMenu(e,t){let i=0;e.forEach((e=>{const t=[this.screenCenter[0],this.screenCenter[1]+i],s=this.add.text(...t,e.text,this.fontOptions).setInteractive().setOrigin(.5,1);s.on("pointerover",(()=>{s.setStyle({fill:"#ff0"})})),s.on("pointerout",(()=>{s.setStyle({fill:"#fff"})})),s.on("pointerup",(()=>{e.action&&e.action(e.scene),e.scene&&this.scene.start(e.scene)})),i+=this.lineHeight}))}}const h=n;const o=class extends h{constructor(e){super("PlayScene",e),this.velocity=200,this.pipeVerticalDistanceRange=[100,250],this.pipeHorizontalDistanceRange=[350,500],this.flapVelocity=380,this.pipesToRender=4,this.flapSound=null,this.hitSound=null,this.pointSound=null,this.city=null,this.clouds=null,this.bird=null,this.pipes=null,this.pipeVariantsCount=20,this.score=0,this.instructionText="",this.scoreText="",this.bestScoreText="",this.isPaused=!1,this.currentDifficulty="easy",this.difficulties={easy:{pipeHorizontalDistanceRange:[450,550],pipeVerticalDistanceRange:[200,250]},normal:{pipeHorizontalDistanceRange:[350,450],pipeVerticalDistanceRange:[170,220]},hard:{pipeHorizontalDistanceRange:[300,400],pipeVerticalDistanceRange:[160,200]}}}create(){this.currentDifficulty="easy",super.create(),this.initializeSound(),this.createCity(),this.createClouds(),this.createBird(),this.createPipes(),this.createGround(),this.createColliders(),this.createScore(),this.createInstructions(),this.handleInputs(),this.listenToEvents(),this.pause(),this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("bird",{start:8,end:15}),frameRate:16,repeat:-1}),this.bird.play("fly")}update(){this.checkGameStatus(),this.recyclePipes(),this.recycleClouds()}initializeSound(){this.flapSound=this.sound.add("flap"),this.hitSound=this.sound.add("hit"),this.pointSound=this.sound.add("point")}createInstructions(){this.instructionText=this.add.text(this.config.width/2,this.config.height/2,"Click or Space",{fontFamily:"Arial",fontSize:"24px",fontWeight:"normal",fill:"#fff"}).setOrigin(.5,.5)}createCity(){this.city=this.add.tileSprite(0,this.config.height,this.config.width,381,"city").setAlpha(.2).setOrigin(0,1)}createClouds(){this.clouds=this.physics.add.group(),this.clouds.create(20,40,"cloud").setScale(.5).setAlpha(.2).setOrigin(0,0),this.clouds.create(.5*this.config.width+100,20,"cloud").setScale(.2).setAlpha(.2).setOrigin(1,0),this.clouds.create(this.config.width+100,120,"cloud").setScale(.3).setAlpha(.2).setOrigin(1,0),this.clouds.setVelocityX(-90)}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setFlipX(!0).setScale(3).setOrigin(0),this.bird.texture.setFilter(a().Textures.FilterMode.NEAREST),this.bird.setBodySize(this.bird.width,this.bird.height-8),this.bird.body.gravity.y=600,this.bird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<this.pipesToRender;e++){const e=this.pipes.create(0,0,"pipe1").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"pipe1").setImmovable(!0).setOrigin(0,0);this.placePipe(e,t)}this.pipes.setVelocityX(-this.velocity)}placePipe(e,t){const i=this.difficulties[this.currentDifficulty],s=this.getRightMostPipe(),n=a().Math.Between(...i.pipeVerticalDistanceRange),h=a().Math.Between(20,this.config.height-20-n),o=a().Math.Between(...i.pipeHorizontalDistanceRange);e.x=s+o,e.y=h,t.x=e.x+a().Math.Between(-150,150),t.y=e.y+n;const p=`pipe${a().Math.Between(1,this.pipeVariantsCount)}`,r=`pipe${a().Math.Between(1,this.pipeVariantsCount)}`,c=this.scene.scene.textures.get(p),l=this.scene.scene.textures.get(r);e.setTexture(r),e.setBodySize(l.width,l.height),t.setTexture(p),t.setBodySize(c.width,c.height)}getRightMostPipe(){let e=0;return this.pipes.getChildren().forEach((function(t){e=Math.max(t.x,e)})),e}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this)}createScore(){this.score=0;const e=localStorage.getItem("eui-flappy:bestScore"),t=this.add.image(34,44,"splash").setScale(.15).setOrigin(.5);this.tweens.add({targets:t,scaleX:.17,scaleY:.17,duration:1e3,yoyo:!0,repeat:-1}),this.scoreText=this.add.text(70,16,`Score: ${this.score}`,{fontFamily:"Arial",fontSize:"32px",fontWeight:"normal",fill:"#fff"}),this.bestScoreText=this.add.text(70,52,`My best score: ${e||0}`,{fontFamily:"Arial",fontSize:"17px",fill:"#fff"})}pause(){this.isPaused=!0,this.physics.pause()}resume(){this.isPaused=!1,this.physics.resume(),this.instructionText.setText("")}handleInputs(){this.input.on("pointerdown",this.flap,this),this.input.on("pointerup",(()=>{this.isPaused&&this.resume()}),this),this.input.keyboard.on("keydown-SPACE",this.flap,this),this.input.keyboard.on("keydown-SPACE",(()=>{this.isPaused&&this.resume()}),this)}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{if(t.getBounds().right<=0&&(e.push(t),2===e.length))return this.placePipe(...e),this.increaseScore(),void this.increaseDifficulty()}))}recycleClouds(){this.clouds.getChildren().forEach((e=>{if(e.getBounds().right<=0){e.body.x=this.config.width+a().Math.Between(0,150);let t=a().Math.Between(2,8)/10,i=a().Math.Clamp(t,.2,.8);e.body.scale=a().Math.Between(i)}}))}flap(){this.isPaused||(this.bird.body.velocity.y-=this.flapVelocity,this.flapSound.play())}saveBestScore(){const e=localStorage.getItem("eui-flappy:bestScore"),t=e&&parseInt(e,10);(!t||this.score>t)&&localStorage.setItem("eui-flappy:bestScore",this.score)}gameOver(){this.hitSound.play(),this.physics.pause(),this.bird.setTint(16711680),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.scene.restart()},loop:!1})}checkGameStatus(){(this.bird.getBounds().bottom>=this.config.height||this.bird.y<=0)&&this.gameOver()}increaseScore(){this.score++,this.bestScore=this.score,this.scoreText.setText(`Score: ${this.score}`),this.pointSound.play()}increaseDifficulty(){10===this.score&&(this.currentDifficulty="normal"),20===this.score&&(this.currentDifficulty="hard")}listenToEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{this.initialTime=3,this.countDownText=this.add.text(...this.screenCenter,"Fly in "+this.initialTime,this.fontOptions).setOrigin(.5),this.timedEvent=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.initialTime-=1,this.countDownText.setText("Fly in "+this.initialTime),this.initialTime<0&&(this.isPaused=!1,this.countDownText.setText(""),this.timedEvent.remove(),this.physics.resume(),this.scene.resume())}createGround(){const e=this.add.rectangle(0,this.config.height,this.config.width,24,4618809).setOrigin(0,1);this.add.rectangle(0,e.getBounds().top,this.config.width,2,4156979).setOrigin(0,1),this.add.rectangle(0,this.config.height,this.config.width,4,3695150).setOrigin(0,1)}};const p=class extends h{constructor(e){super("PreloadScene",e)}preload(){this.load.audio("flap","assets/flap.mp3"),this.load.audio("point","assets/point.mp3"),this.load.audio("hit","assets/hit.mp3"),this.load.image("cloud","assets/cloud.png"),this.load.image("city","assets/city.png"),this.load.image("pipe1","assets/pipes/pipe1.png"),this.load.image("pipe2","assets/pipes/pipe2.png"),this.load.image("pipe3","assets/pipes/pipe3.png"),this.load.image("pipe4","assets/pipes/pipe4.png"),this.load.image("pipe5","assets/pipes/pipe5.png"),this.load.image("pipe6","assets/pipes/pipe6.png"),this.load.image("pipe7","assets/pipes/pipe7.png"),this.load.image("pipe8","assets/pipes/pipe8.png"),this.load.image("pipe9","assets/pipes/pipe9.png"),this.load.image("pipe10","assets/pipes/pipe10.png"),this.load.image("pipe11","assets/pipes/pipe11.png"),this.load.image("pipe12","assets/pipes/pipe12.png"),this.load.image("pipe13","assets/pipes/pipe13.png"),this.load.image("pipe14","assets/pipes/pipe14.png"),this.load.image("pipe15","assets/pipes/pipe15.png"),this.load.image("pipe16","assets/pipes/pipe16.png"),this.load.image("pipe17","assets/pipes/pipe17.png"),this.load.image("pipe18","assets/pipes/pipe18.png"),this.load.image("pipe19","assets/pipes/pipe19.png"),this.load.image("pipe20","assets/pipes/pipe20.png"),this.load.spritesheet("bird","assets/birdSprite.png",{frameWidth:16,frameHeight:16}),this.load.image("pause","assets/pause.png"),this.load.image("back","assets/back.png")}create(){this.scene.start("PlayScene")}};const r=class extends h{constructor(e){super("ScoreScene",{...e,canGoBack:!0})}create(){super.create();const e=localStorage.getItem("bestScore")||0;this.add.text(this.screenCenter[0],this.screenCenter[1],`Best score: ${e}`,this.fontOptions).setInteractive().setOrigin(.5)}};const c=class extends h{constructor(e){super("SplashScene",e),this.music=null,this.texts=["Loading eUI tokens..","Generating eUI awesomness..","Inflating eUI design system..","Compiling eUI icons..","Buffering eUI love.."],this.actionText=""}preload(){this.load.image("splash","assets/eui-logo.svg"),this.load.audio("music","assets/music.mp3")}create(){this.music=this.sound.add("music"),this.music.play({loop:!0}),this.cameras.main.setBackgroundColor("#333");const e=this.add.image(this.config.width/2,this.config.height/2,"splash").setAlpha(0).setScale(.5);this.tweens.add({targets:e,alpha:1,duration:1e3,ease:"Quan.InOut"}),this.tweens.add({targets:e,scaleX:.55,scaleY:.55,duration:1e3,yoyo:!0,repeat:-1}),this.actionText=this.add.text(this.config.width/2,e.getBounds().bottom+18,this.texts[0],{fontFamily:"Arial",fontSize:"14px",fontWeight:"normal",fill:"#fff"}).setOrigin(.5,0),setTimeout((()=>{this.scene.start("PreloadScene")}),4e3);let t=1;this.time.addEvent({delay:500,callback:()=>{this.actionText.setText(this.texts[t%this.texts.length]),t+=1},repeat:!0,loop:!0})}},l={width:800,height:600,startPosition:{x:80,y:300}},d=[c,p,o,r],g=e=>new e(l),u={type:a().AUTO,...l,pixelArt:!1,physics:{default:"arcade",arcade:{debug:!1}},scene:d.map(g)};new(a().Game)(u)}},i={};function s(e){var a=i[e];if(void 0!==a)return a.exports;var n=i[e]={exports:{}};return t[e](n,n.exports,s),n.exports}s.m=t,e=[],s.O=(t,i,a,n)=>{if(!i){var h=1/0;for(c=0;c<e.length;c++){for(var[i,a,n]=e[c],o=!0,p=0;p<i.length;p++)(!1&n||h>=n)&&Object.keys(s.O).every((e=>s.O[e](i[p])))?i.splice(p--,1):(o=!1,n<h&&(h=n));if(o){e.splice(c--,1);var r=a();void 0!==r&&(t=r)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[i,a,n]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};s.O.j=t=>0===e[t];var t=(t,i)=>{var a,n,[h,o,p]=i,r=0;if(h.some((t=>0!==e[t]))){for(a in o)s.o(o,a)&&(s.m[a]=o[a]);if(p)var c=p(s)}for(t&&t(i);r<h.length;r++)n=h[r],s.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return s.O(c)},i=self.webpackChunkphaser_webpack_boilerplate=self.webpackChunkphaser_webpack_boilerplate||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var a=s.O(void 0,[736],(()=>s(333)));a=s.O(a)})();