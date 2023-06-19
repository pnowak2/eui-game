(()=>{"use strict";var e,t={260:(e,t,s)=>{var i=s(591),a=s.n(i);class n extends a().Scene{constructor(e,t){super(e),this.config=t,this.screenCenter=[t.width/2,t.height/2],this.fontSize=34,this.lineHeight=42,this.fontOptions={fontSize:this.fontSize,fill:"#fff"}}create(){this.add.image(0,0,"sky").setOrigin(0,0);const e=this.cameras.main.width,t=this.cameras.main.height,s=this.add.graphics(),i=4687578,a=1788294;if(s.fillGradientStyle(i,i,a,a,1),s.fillRect(0,0,e,t),this.config.canGoBack){this.add.image(this.config.width-10,this.config.height-10,"back").setInteractive().setScale(2).setOrigin(1,1).on("pointerup",(()=>{this.scene.start("MenuScene")}))}}createMenu(e,t){let s=0;e.forEach((e=>{const t=[this.screenCenter[0],this.screenCenter[1]+s],i=this.add.text(...t,e.text,this.fontOptions).setInteractive().setOrigin(.5,1);i.on("pointerover",(()=>{i.setStyle({fill:"#ff0"})})),i.on("pointerout",(()=>{i.setStyle({fill:"#fff"})})),i.on("pointerup",(()=>{e.action&&e.action(e.scene),e.scene&&this.scene.start(e.scene)})),s+=this.lineHeight}))}}const r=n;const c=class extends r{constructor(e){super("PlayScene",e),this.velocity=200,this.pipeVerticalDistanceRange=[100,250],this.pipeHorizontalDistanceRange=[350,500],this.flapVelocity=380,this.pipesToRender=4,this.bird=null,this.pipes=null,this.pipeVariantsCount=10,this.score=0,this.scoreText="",this.difficutlyText="",this.bestScoreText="",this.isPaused=!1,this.currentDifficulty="easy",this.difficulties={easy:{pipeHorizontalDistanceRange:[450,550],pipeVerticalDistanceRange:[200,250]},normal:{pipeHorizontalDistanceRange:[350,450],pipeVerticalDistanceRange:[170,220]},hard:{pipeHorizontalDistanceRange:[250,350],pipeVerticalDistanceRange:[140,190]}}}create(){this.currentDifficulty="easy",super.create(),this.createBird(),this.createPipes(),this.createColliders(),this.createScore(),this.createPause(),this.handleInputs(),this.listenToEvents(),this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("bird",{start:8,end:15}),frameRate:16,repeat:-1}),this.bird.play("fly")}update(){this.checkGameStatus(),this.recyclePipes()}createBG(){this.add.image(0,0,"sky").setOrigin(0,0)}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setFlipX(!0).setScale(3).setOrigin(0),this.bird.setBodySize(this.bird.width,this.bird.height-8),this.bird.body.gravity.y=600,this.bird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<this.pipesToRender;e++){const e=this.pipes.create(0,0,"pipe1").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"pipe1").setImmovable(!0).setOrigin(0,0);this.placePipe(e,t)}this.pipes.setVelocityX(-this.velocity)}placePipe(e,t){const s=this.difficulties[this.currentDifficulty],i=this.getRightMostPipe(),n=a().Math.Between(...s.pipeVerticalDistanceRange),r=a().Math.Between(20,this.config.height-20-n),c=a().Math.Between(...s.pipeHorizontalDistanceRange);e.x=i+c,e.y=r,t.x=e.x,t.y=e.y+n;const h=`pipe${a().Math.Between(1,this.pipeVariantsCount)}`,o=this.scene.scene.textures.get(h);e.setTexture(h),t.setTexture(h),e.setBodySize(o.width,o.height),t.setBodySize(o.width,o.height)}getRightMostPipe(){let e=0;return this.pipes.getChildren().forEach((function(t){e=Math.max(t.x,e)})),e}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this)}createScore(){this.score=0;const e=localStorage.getItem("bestScore");this.scoreText=this.add.text(16,16,`Score: ${this.score}`,{fontFamily:"sans-serif",fontSize:"32px",fill:"#000"}),this.bestScoreText=this.add.text(16,52,`Best score: ${e||0}`,{fontFamily:"sans-serif",fontSize:"20px",fill:"#000"}),this.difficutlyText=this.add.text(16,78,`Difficulty: ${this.currentDifficulty}`,{fontFamily:"sans-serif",fontSize:"20px",fill:"#000"})}createPause(){this.isPaused=!1;this.add.image(this.config.width-10,this.config.height-10,"pause").setInteractive().setScale(2).setOrigin(1,1).on("pointerdown",(()=>{this.isPaused=!0,this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")}))}handleInputs(){this.input.on("pointerdown",this.flap,this),this.input.keyboard.on("keydown-SPACE",this.flap,this)}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{if(t.getBounds().right<=0&&(e.push(t),2===e.length))return this.placePipe(...e),this.increaseScore(),void this.increaseDifficulty()}))}flap(){this.isPaused||(this.bird.body.velocity.y-=this.flapVelocity)}saveBestScore(){const e=localStorage.getItem("bestScore"),t=e&&parseInt(e,10);(!t||this.score>t)&&localStorage.setItem("bestScore",this.score)}gameOver(){this.physics.pause(),this.bird.setTint(16711680),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.scene.restart()},loop:!1})}checkGameStatus(){(this.bird.getBounds().bottom>=this.config.height||this.bird.y<=0)&&this.gameOver()}increaseScore(){this.score++,this.bestScore=this.score,this.scoreText.setText(`Score: ${this.score}`)}increaseDifficulty(){5===this.score&&(this.currentDifficulty="normal"),10===this.score&&(this.currentDifficulty="hard"),this.difficutlyText.setText(`Difficulty: ${this.currentDifficulty}`)}listenToEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{this.initialTime=3,this.countDownText=this.add.text(...this.screenCenter,"Fly in "+this.initialTime,this.fontOptions).setOrigin(.5),this.timedEvent=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.initialTime-=1,this.countDownText.setText("Fly in "+this.initialTime),this.initialTime<0&&(this.isPaused=!1,this.countDownText.setText(""),this.timedEvent.remove(),this.physics.resume(),this.scene.resume())}};const h=class extends r{constructor(e){super("MenuScene",e),this.menu=[{scene:"PlayScene",text:"Play",action:()=>{}},{scene:"ScoreScene",text:"Score",action:()=>{}},{scene:null,text:"Exit",action:()=>{this.game.destroy(!0),document.dispatchEvent(new CustomEvent("gameOver",{bubbles:!0}))}}]}create(){super.create(),this.createMenu(this.menu)}};const o=class extends r{constructor(e){super("PreloadScene",e)}preload(){this.load.image("splash","assets/eui-logo.svg"),this.load.image("sky","assets/sky.png"),this.load.image("pipe1","assets/pipes/pipe1.png"),this.load.image("pipe2","assets/pipes/pipe2.png"),this.load.image("pipe3","assets/pipes/pipe3.png"),this.load.image("pipe4","assets/pipes/pipe4.png"),this.load.image("pipe5","assets/pipes/pipe5.png"),this.load.image("pipe6","assets/pipes/pipe6.png"),this.load.image("pipe7","assets/pipes/pipe7.png"),this.load.image("pipe8","assets/pipes/pipe8.png"),this.load.image("pipe9","assets/pipes/pipe9.png"),this.load.image("pipe10","assets/pipes/pipe10.png"),this.load.spritesheet("bird","assets/birdSprite.png",{frameWidth:16,frameHeight:16}),this.load.image("pause","assets/pause.png"),this.load.image("back","assets/back.png")}create(){this.scene.start("SplashScene")}};const p=class extends r{constructor(e){super("ScoreScene",{...e,canGoBack:!0})}create(){super.create();const e=localStorage.getItem("bestScore")||0;this.add.text(this.screenCenter[0],this.screenCenter[1],`Best score: ${e}`,this.fontOptions).setInteractive().setOrigin(.5)}};const l=class extends r{constructor(e){super("PauseScene",e),this.menu=[{scene:null,text:"Continue",action:()=>{this.scene.stop(),this.scene.resume("PlayScene"),this.events.emit("resume")}},{text:"Exit",action:()=>{this.scene.stop("PlayScene"),this.scene.start("MenuScene")}}]}create(){super.create(),this.createMenu(this.menu)}};const d=class extends r{constructor(e){super("SplashScene",e)}create(){this.cameras.main.setBackgroundColor("#333");const e=this.add.image(this.config.width/2,this.config.height/2,"splash").setAlpha(0).setScale(.5);this.tweens.add({targets:e,alpha:1,duration:1e3,ease:"Quan.InOut"}),this.tweens.add({targets:e,scaleX:.55,scaleY:.55,duration:1e3,yoyo:!0,repeat:-1}),setTimeout((()=>{this.scene.start("MenuScene")}),3e3)}},u={width:800,height:600,startPosition:{x:80,y:300}},g=[o,d,h,p,c,l],f=e=>new e(u),m={type:a().AUTO,...u,pixelArt:!1,physics:{default:"arcade",arcade:{debug:!0}},scene:g.map(f)};new(a().Game)(m)}},s={};function i(e){var a=s[e];if(void 0!==a)return a.exports;var n=s[e]={exports:{}};return t[e](n,n.exports,i),n.exports}i.m=t,e=[],i.O=(t,s,a,n)=>{if(!s){var r=1/0;for(p=0;p<e.length;p++){for(var[s,a,n]=e[p],c=!0,h=0;h<s.length;h++)(!1&n||r>=n)&&Object.keys(i.O).every((e=>i.O[e](s[h])))?s.splice(h--,1):(c=!1,n<r&&(r=n));if(c){e.splice(p--,1);var o=a();void 0!==o&&(t=o)}}return t}n=n||0;for(var p=e.length;p>0&&e[p-1][2]>n;p--)e[p]=e[p-1];e[p]=[s,a,n]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var a,n,[r,c,h]=s,o=0;if(r.some((t=>0!==e[t]))){for(a in c)i.o(c,a)&&(i.m[a]=c[a]);if(h)var p=h(i)}for(t&&t(s);o<r.length;o++)n=r[o],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(p)},s=self.webpackChunkphaser_webpack_boilerplate=self.webpackChunkphaser_webpack_boilerplate||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=i.O(void 0,[736],(()=>i(260)));a=i.O(a)})();