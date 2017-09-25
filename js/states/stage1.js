//title screen
Main.Stage1 = function(){};
 
Main.Stage1.prototype = {
	create: function() {
		var gravity = 1000;
		var stageLength = 5000;

		this.finished = false;
		this.win = false;

		this.playerConfig = {
			velocity: 220 * this.game.gameController.gameSpeed,
			aceleration: 10 * this.game.gameController.gameSpeed,
			maxAceleration: 70 * this.game.gameController.gameSpeed,
			minAceleration: 0 * this.game.gameController.gameSpeed
		};

		this.dinoConfig = {
			velocity: 280 * this.game.gameController.gameSpeed
		};

		//stage world settings
		this.adjustStageWorld(stageLength);

		//create all stage sprites
		this.createSprites(stageLength);

		//add phisics to elements (oh, really?)
		this.addPhisicsToElements(gravity);

		//create stage background
		this.createBackground();

		//bring to front all important elements
		this.orderStageElements();

		//camera settings
		this.adjustCamera();

		//loads background music in loop
    	this.prepareBackgroundMusic();
	},
	adjustStageWorld: function(stageLength){
		this.game.world.setBounds(0, 0, stageLength, this.game.height);
	},
  	createSprites: function(stageLength){
  		//creating ground sprite
  		this.ground = this.add.tileSprite(0,this.game.height - 70,this.game.world.width, 70, 'ground');

  		//creating player sprite
	    this.player = this.game.add.sprite(this.game.width / 2, this.game.height - 70, 'scientist_walking');
	    this.player.animations.add('walk');
	    this.player.standDimensions = {width: this.player.width, height: this.player.height};
	    this.player.anchor.setTo(0.5, 1);
	    this.player.animations.play('walk', 24 * this.game.gameController.gameSpeed, true);

	    //creating dinosaur sprite
	    this.dino = this.game.add.sprite(this.game.width/2 - 450, this.game.height - 70, 'dino_walking');
	    this.dino.animations.add('walk');
	    this.dino.standDimensions = {width: this.dino.width, height: this.dino.height};
	    this.dino.anchor.setTo(0.5, 1);
	    this.dino.animations.play('walk', 24 * this.game.gameController.gameSpeed, true);

	    //creating finish line on the end of the stage
	    this.finishLine = this.game.add.sprite(stageLength - 400, this.game.height - this.ground.height - 384, 'finish-line');

	    //creating "decoration" elements
	    var numberOfPlateus = 3;
	    for(var i = 0; i < numberOfPlateus; i++){
	    	this.game.add.sprite((i  * ((stageLength - 1200) / 3)) + 300, this.game.height - 250, 'plateau');	
	    }
  	},
  	createBackground: function(){
  		this.game.stage.backgroundColor = "#FF9933";
  	},
  	orderStageElements: function() {
	    this.game.world.bringToTop(this.ground);
	    this.game.world.bringToTop(this.player);
	    this.game.world.bringToTop(this.dino);
	    this.game.world.bringToTop(this.finishLine);
	},
  	addPhisicsToElements: function(gravity){
  		this.game.physics.arcade.enable(this.player);
	    this.game.physics.arcade.enable(this.dino);
	    this.game.physics.arcade.enable(this.ground);

	    this.ground.body.immovable = true;
	    this.ground.body.allowGravity = false;

	    this.player.body.gravity.y = gravity;
	    this.dino.body.gravity.y = gravity;
  	},
  	adjustCamera: function(){
  		this.game.camera.follow(this.player);
  	},
	prepareBackgroundMusic: function() {
	  this.backgroundMusic = this.game.add.audio('stage1');
	  this.game.sound.setDecodedCallback([this.backgroundMusic], this.playBackgroundMusic, this);
	},
	playBackgroundMusic: function() {
	  this.backgroundMusic.loopFull(0.6);
	},
	update: function() {
	    this.game.physics.arcade.collide(this.player, this.ground, this.playerHit, null, this);
	    this.game.physics.arcade.collide(this.dino, this.ground, this.playerHit, null, this);

	    this.dino.body.velocity.x = this.dinoConfig.velocity;

	    //player can be caught only if the game isn't over
	    if(!this.finished)
	    	this.game.physics.arcade.collide(this.dino, this.player, this.playerCaught, null, this);

	    var justPressed = this.game.input.activePointer.isDown;

	    //if the player presses the button, it gains speed and loses otherwise
	    if(justPressed){
	    	if(this.playerConfig.aceleration < this.playerConfig.maxAceleration){
	    		this.playerConfig.aceleration += 1 * this.game.gameController.gameSpeed;
	    	}
	    } else {
	    	if(this.playerConfig.aceleration > this.playerConfig.minAceleration){
	    		this.playerConfig.aceleration -= 1 * this.game.gameController.gameSpeed;
	    	}
	    }

	    if(!this.finished) {
	      this.player.body.velocity.x = this.playerConfig.velocity + this.playerConfig.aceleration;
	    } else {
	    	if(this.win){
	    		this.player.body.velocity.x = this.dino.body.velocity.x;
	    	} else {
	    		this.player.body.velocity.x = 0;				
	    	}
	    }

	    //if the player crosses the finish line, he wins the stage
	    if(!this.finished && this.player.body.position.x > this.finishLine.x + (this.finishLine.width / 2)){
	    	this.finished = true;
	    	this.win = true;
	    	this.backgroundMusic.stop();
	    	this.game.gameController.winStage();
	    }
	},

	playerCaught: function(){
		this.finished = true;
		this.player.loadTexture('scientist_still', 0);
		this.game.add.tween(this.player).to( { angle: 90 }, 100, Phaser.Easing.Linear.None, true);
		this.backgroundMusic.stop();
		this.game.gameController.loseStage();
	}
};