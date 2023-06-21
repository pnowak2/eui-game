(()=>{"use strict";var e,t={641:(e,t,i)=>{var s=i(260),a=i.n(s);class n extends a().Scene{constructor(e,t){super(e),this.config=t,this.screenCenter=[t.width/2,t.height/2],this.fontSize=34,this.lineHeight=42,this.fontOptions={fontFamily:"Arial",fontSize:this.fontSize,fill:"#fff"}}create(){this.add.image(0,0,"sky").setOrigin(0,0);const e=this.cameras.main.width,t=this.cameras.main.height,i=this.add.graphics(),s=1788294,a=12570852;if(i.fillGradientStyle(s,s,a,a,1),i.fillRect(0,0,e,t),this.config.canGoBack){this.add.image(this.config.width-10,this.config.height-10,"back").setInteractive().setScale(2).setOrigin(1,1).on("pointerup",(()=>{this.scene.start("PlayScene")}))}}}const o=n;class h{constructor(){this.data={}}getItem(e){const t=this.data[e];return void 0!==t?JSON.parse(t):null}setItem(e,t){this.data[e]=JSON.stringify(t)}removeItem(e){delete this.data[e]}clear(){this.data={}}}const p=class extends o{constructor(e){super("PlayScene",e),this.localStorage=new h,this.velocity=200,this.pipeVerticalDistanceRange=[100,250],this.pipeHorizontalDistanceRange=[350,500],this.flapVelocity=380,this.pipesToRender=4,this.flapSound=null,this.clickSound=null,this.hitSound=null,this.pointSound=null,this.city=null,this.clouds=null,this.bird=null,this.pipes=null,this.pipeVariantsCount=30,this.score=0,this.instructionText="",this.pointsInfo="",this.scoreText="",this.levelUpText="",this.bestScoreText="",this.isPaused=!1,this.currentDifficulty="easy",this.difficulties={easy:{pipeHorizontalDistanceRange:[450,550],pipeVerticalDistanceRange:[200,250]},normal:{pipeHorizontalDistanceRange:[400,500],pipeVerticalDistanceRange:[180,230]},medium:{pipeHorizontalDistanceRange:[350,450],pipeVerticalDistanceRange:[160,220]},hard:{pipeHorizontalDistanceRange:[300,400],pipeVerticalDistanceRange:[140,200]}}}create(){this.currentDifficulty="easy",super.create(),this.initializeSound(),this.createCity(),this.createClouds(),this.createBird(),this.createPipes(),this.createGround(),this.createColliders(),this.createScore(),this.createInstructions(),this.handleInputs(),this.listenToEvents(),this.pause(),this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("bird",{start:8,end:15}),frameRate:16,repeat:-1}),this.bird.play("fly")}update(){this.checkGameStatus(),this.recyclePipes(),this.recycleClouds()}initializeSound(){this.flapSound=this.sound.add("flap"),this.hitSound=this.sound.add("hit"),this.pointSound=this.sound.add("point"),this.clickSound=this.sound.add("click")}createInstructions(){this.instructionText=this.add.text(this.config.width/2,this.config.height/2,"CLICK or hit SPACE",{fontFamily:"Arial",fontSize:"24px",fontWeight:"normal",fill:"#fff"}).setOrigin(.5,.5),this.pointsInfo=this.add.text(this.config.width/2,this.instructionText.getBounds().bottom+16,"100 points to win. Share your score on Teams.",{fontFamily:"Arial",fontSize:"18px",fontWeight:"normal",fill:"#000"}).setOrigin(.5,.5),this.instructionText.setShadow(2,2,"rgba(0,0,0,0.7)",2),this.pointsInfo.setShadow(2,2,"rgba(255,255,255,0.5)",2)}createCity(){this.city=this.add.tileSprite(0,this.config.height+50,this.config.width,566,"city").setAlpha(.4).setOrigin(0,1)}createClouds(){this.clouds=this.physics.add.group(),this.clouds.create(20,40,"cloud").setScale(.5).setAlpha(.2).setOrigin(0,0),this.clouds.create(.5*this.config.width+100,20,"cloud").setScale(.2).setAlpha(.2).setOrigin(1,0),this.clouds.create(this.config.width+100,120,"cloud").setScale(.3).setAlpha(.2).setOrigin(1,0),this.clouds.setVelocityX(-90)}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setFlipX(!0).setScale(3).setOrigin(0),this.bird.texture.setFilter(a().Textures.FilterMode.NEAREST),this.bird.setBodySize(this.bird.width,this.bird.height-8),this.bird.body.gravity.y=600,this.bird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<this.pipesToRender;e++){const e=this.pipes.create(0,0,"pipe1").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"pipe1").setImmovable(!0).setOrigin(0,0);this.placePipe(e,t)}this.pipes.setVelocityX(-this.velocity)}placePipe(e,t){const i=this.difficulties[this.currentDifficulty],s=this.getRightMostPipe(),n=a().Math.Between(...i.pipeVerticalDistanceRange),o=a().Math.Between(20,this.config.height-20-n),h=a().Math.Between(...i.pipeHorizontalDistanceRange);e.x=s+h,e.y=o,t.x=e.x+a().Math.Between(-100,100),t.y=e.y+n;const p=`pipe${a().Math.Between(1,this.pipeVariantsCount)}`,r=`pipe${a().Math.Between(1,this.pipeVariantsCount)}`,l=this.scene.scene.textures.get(p),c=this.scene.scene.textures.get(r);e.setTexture(r),e.setBodySize(c.width,c.height),t.setTexture(p),t.setBodySize(l.width,l.height)}getRightMostPipe(){let e=0;return this.pipes.getChildren().forEach((function(t){e=Math.max(t.x,e)})),e}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this)}createScore(){this.score=0;const e=this.localStorage.getItem("eui-flappy:bestScore"),t=this.add.image(34,44,"splash").setScale(.15).setOrigin(.5);this.tweens.add({targets:t,scaleX:.17,scaleY:.17,duration:1e3,yoyo:!0,repeat:-1}),this.scoreText=this.add.text(70,16,`Score: ${this.score}`,{fontFamily:"Arial",fontSize:"32px",fontWeight:"normal",fill:"#fff"}),this.scoreText.setShadow(2,2,"rgba(0,0,0,0.7)",2),this.bestScoreText=this.add.text(70,52,`My best score: ${e||0}`,{fontFamily:"Arial",fontSize:"17px",fill:"#fff"}),this.bestScoreText.setShadow(2,2,"rgba(0,0,0,0.7)",2),this.levelUpText=this.add.text(...this.screenCenter,"",{fontFamily:"Arial",fontSize:"24px",fill:"#fff"}).setOrigin(.5),this.levelUpText.setShadow(2,2,"rgba(0,0,0,0.7)",2)}pause(){this.isPaused=!0,this.physics.pause()}resume(){this.isPaused=!1,this.physics.resume(),this.instructionText.setText(""),this.pointsInfo.setText("")}handleInputs(){this.input.on("pointerdown",this.flap,this),this.input.on("pointerup",(()=>{this.isPaused&&this.resume()}),this),this.input.keyboard.on("keydown-SPACE",this.flap,this),this.input.keyboard.on("keydown-SPACE",(()=>{this.isPaused&&this.resume()}),this)}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{if(t.getBounds().right<=0&&(e.push(t),2===e.length))return this.placePipe(...e),this.increaseScore(),void this.increaseDifficulty()}))}recycleClouds(){this.clouds.getChildren().forEach((e=>{if(e.getBounds().right<=0){e.body.x=this.config.width+a().Math.Between(0,150);let t=a().Math.Between(2,8)/10,i=a().Math.Clamp(t,.2,.8);e.body.scale=a().Math.Between(i)}}))}flap(){this.isPaused||(this.bird.body.velocity.y-=this.flapVelocity,this.flapSound.play())}saveBestScore(){const e=this.localStorage.getItem("eui-flappy:bestScore"),t=e&&parseInt(e,10);(!t||this.score>t)&&this.localStorage.setItem("eui-flappy:bestScore",this.score)}gameOver(){this.hitSound.play(),this.physics.pause(),this.bird.setTint(16711680),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.scene.restart()},loop:!1})}checkGameStatus(){(this.bird.getBounds().bottom>=this.config.height||this.bird.y<=0)&&this.gameOver()}increaseScore(){this.score++,this.bestScore=this.score,this.scoreText.setText(`Score: ${this.score}`),this.pointSound.play()}increaseDifficulty(){1===this.score&&this.notifyLevelUp("Level 2XS"),10===this.score&&this.notifyLevelUp("Level XS"),20===this.score&&(this.notifyLevelUp("Level S"),this.currentDifficulty="normal"),30===this.score&&this.notifyLevelUp("Level M"),40===this.score&&(this.notifyLevelUp("Level L"),this.currentDifficulty="medium"),50===this.score&&this.notifyLevelUp("Level XL"),60===this.score&&(this.notifyLevelUp("Level 2XL"),this.currentDifficulty="hard"),70===this.score&&this.notifyLevelUp("Level 3XL"),80===this.score&&this.notifyLevelUp("Level 4XL"),90===this.score&&this.notifyLevelUp("Last mile! GO GO GO!"),this.score>=100&&(this.saveBestScore(),this.scene.start("WinScene"))}notifyLevelUp(e){this.levelUpText.setText(e||"Level UP"),setTimeout((()=>{this.levelUpText.setText("")}),1e3),setTimeout((()=>{this.clickSound.play()}),500)}listenToEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{this.initialTime=3,this.countDownText=this.add.text(...this.screenCenter,"Fly in "+this.initialTime,this.fontOptions).setOrigin(.5),this.timedEvent=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.initialTime-=1,this.countDownText.setText("Fly in "+this.initialTime),this.initialTime<0&&(this.isPaused=!1,this.countDownText.setText(""),this.timedEvent.remove(),this.physics.resume(),this.scene.resume())}createGround(){this.add.image(0,this.config.height,"grass").setOrigin(0,1)}};const r=class extends o{constructor(e){super("PreloadScene",e)}preload(){this.load.audio("flap","assets/flap.mp3"),this.load.audio("point","assets/point.mp3"),this.load.audio("hit","assets/hit.mp3"),this.load.audio("click","assets/click.mp3"),this.load.image("cloud","assets/cloud.png"),this.load.image("city","assets/city.png"),this.load.image("grass","assets/grass.png"),this.load.image("pipe1","assets/pipes/pipe1.png"),this.load.image("pipe2","assets/pipes/pipe2.png"),this.load.image("pipe3","assets/pipes/pipe3.png"),this.load.image("pipe4","assets/pipes/pipe4.png"),this.load.image("pipe5","assets/pipes/pipe5.png"),this.load.image("pipe6","assets/pipes/pipe6.png"),this.load.image("pipe7","assets/pipes/pipe7.png"),this.load.image("pipe8","assets/pipes/pipe8.png"),this.load.image("pipe9","assets/pipes/pipe9.png"),this.load.image("pipe10","assets/pipes/pipe10.png"),this.load.image("pipe11","assets/pipes/pipe11.png"),this.load.image("pipe12","assets/pipes/pipe12.png"),this.load.image("pipe13","assets/pipes/pipe13.png"),this.load.image("pipe14","assets/pipes/pipe14.png"),this.load.image("pipe15","assets/pipes/pipe15.png"),this.load.image("pipe16","assets/pipes/pipe16.png"),this.load.image("pipe17","assets/pipes/pipe17.png"),this.load.image("pipe18","assets/pipes/pipe18.png"),this.load.image("pipe19","assets/pipes/pipe19.png"),this.load.image("pipe20","assets/pipes/pipe20.png"),this.load.image("pipe21","assets/pipes/pipe21.png"),this.load.image("pipe22","assets/pipes/pipe22.png"),this.load.image("pipe23","assets/pipes/pipe23.png"),this.load.image("pipe24","assets/pipes/pipe24.png"),this.load.image("pipe25","assets/pipes/pipe25.png"),this.load.image("pipe26","assets/pipes/pipe26.png"),this.load.image("pipe27","assets/pipes/pipe27.png"),this.load.image("pipe28","assets/pipes/pipe28.png"),this.load.image("pipe29","assets/pipes/pipe29.png"),this.load.image("pipe30","assets/pipes/pipe30.png"),this.load.spritesheet("bird","assets/birdSprite.png",{frameWidth:16,frameHeight:16}),this.load.image("pause","assets/pause.png"),this.load.image("back","assets/back.png")}create(){this.scene.start("PlayScene")}};const l=class extends o{constructor(e){super("SplashScene",e),this.music=null,this.texts=["Loading eUI tokens..","Doing eUI awesomness..","Cooling eUI design system..","Calling eUI Divas..","Buffering eUI love.."],this.actionText=""}preload(){this.load.image("splash","assets/eui-logo.png"),this.load.audio("music","assets/music.mp3")}create(){this.music=this.sound.add("music"),this.music.play({loop:!0}),this.cameras.main.setBackgroundColor("#333");const e=this.add.image(this.config.width/2,this.config.height/2-44,"splash").setAlpha(0).setScale(.5);this.tweens.add({targets:e,alpha:1,duration:1e3,ease:"Quad.InOut"}),this.tweens.add({targets:e,scaleX:.55,scaleY:.55,duration:1e3,yoyo:!0,repeat:-1}),this.add.text(this.config.width/2,e.getBounds().bottom+18,"Whoah, nice try!",{fontFamily:"Arial",fontSize:"24px",fontWeight:"normal",fill:"#fff"}).setOrigin(.5,0),this.actionText=this.add.text(this.config.width/2,e.getBounds().bottom+48,this.texts[0],{fontFamily:"Arial",fontSize:"14px",fontWeight:"normal",fill:"#fff"}).setOrigin(.5,0),setTimeout((()=>{this.scene.start("PreloadScene")}),4e3);let t=1;this.time.addEvent({delay:800,callback:()=>{this.actionText.setText(this.texts[t%this.texts.length]),t+=1},repeat:!0,loop:!0})}};const c=class extends o{constructor(e){super("WinScene",{...e,canGoBack:!0}),this.winLogo=null,this.winSound=null}preload(){this.load.audio("win","assets/win.mp3"),this.load.image("win-logo","assets/win-logo.png")}create(){super.create(),this.winSound=this.sound.add("win"),this.winSound.play(),this.winLogo=this.add.image(this.config.width/2,this.config.height/2,"win-logo"),this.tweens.add({targets:this.winLogo,scaleX:.85,scaleY:.85,duration:400,ease:"Quad.InOut",yoyo:!0,repeat:-1}),this.add.text(this.screenCenter[0],this.winLogo.getBounds().bottom,"You won!",this.fontOptions).setOrigin(.5)}},d={width:800,height:600,startPosition:{x:80,y:300}},g=[l,r,p,c],u=e=>new e(d),f={type:a().AUTO,...d,pixelArt:!1,physics:{default:"arcade",arcade:{debug:!1}},scene:g.map(u)};new(a().Game)(f)}},i={};function s(e){var a=i[e];if(void 0!==a)return a.exports;var n=i[e]={exports:{}};return t[e](n,n.exports,s),n.exports}s.m=t,e=[],s.O=(t,i,a,n)=>{if(!i){var o=1/0;for(l=0;l<e.length;l++){for(var[i,a,n]=e[l],h=!0,p=0;p<i.length;p++)(!1&n||o>=n)&&Object.keys(s.O).every((e=>s.O[e](i[p])))?i.splice(p--,1):(h=!1,n<o&&(o=n));if(h){e.splice(l--,1);var r=a();void 0!==r&&(t=r)}}return t}n=n||0;for(var l=e.length;l>0&&e[l-1][2]>n;l--)e[l]=e[l-1];e[l]=[i,a,n]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};s.O.j=t=>0===e[t];var t=(t,i)=>{var a,n,[o,h,p]=i,r=0;if(o.some((t=>0!==e[t]))){for(a in h)s.o(h,a)&&(s.m[a]=h[a]);if(p)var l=p(s)}for(t&&t(i);r<o.length;r++)n=o[r],s.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return s.O(l)},i=self.webpackChunkphaser_webpack_boilerplate=self.webpackChunkphaser_webpack_boilerplate||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var a=s.O(void 0,[736],(()=>s(641)));a=s.O(a)})();