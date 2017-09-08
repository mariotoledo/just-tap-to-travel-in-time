//title screen
Main.Stage1 = function(){};
 
Main.Stage1.prototype = {
	create: function() {
		var gravity = 1000;

		this.stopped = false;
		this.stageLength = 5000;

		this.game.world.setBounds(0, 0, this.stageLength, this.game.height);
		
	    this.ground = this.add.tileSprite(0,this.game.height - 70,this.game.world.width, 70, 'ground');

	    this.player = this.game.add.sprite(this.game.width/2, this.game.height-128, 'scientist_walking');
	    this.player.animations.add('walk');
	    this.player.standDimensions = {width: this.player.width, height: this.player.height};
	    this.player.anchor.setTo(0.5, 1);
	    this.player.animations.play('walk', 24, true);

	    this.dino = this.game.add.sprite(this.game.width/2 - 400, this.game.height-128, 'dino_walking');
	    this.dino.animations.add('walk');
	    this.dino.standDimensions = {width: this.dino.width, height: this.dino.height};
	    this.dino.anchor.setTo(0.5, 1);
	    this.dino.animations.play('walk', 24, true);

	    this.game.world.bringToTop(this.ground);
	    this.game.world.bringToTop(this.player);
	    this.game.world.bringToTop(this.dino);

	    this.game.stage.backgroundColor = "#4488AA";

	    this.game.physics.arcade.enable(this.player);
	    this.game.physics.arcade.enable(this.dino);
	    this.game.physics.arcade.enable(this.ground);

	    this.ground.body.immovable = true;
	    this.ground.body.allowGravity = false;

	    this.player.body.gravity.y = gravity;
	    this.dino.body.gravity.y = gravity;

	    this.game.camera.follow(this.player);

	    this.playerVelocity = 220;
	    this.playerAcceleration = 0;
	},
  
	update: function() {
	    this.game.physics.arcade.collide(this.player, this.ground, this.playerHit, null, this);
	    this.game.physics.arcade.collide(this.dino, this.ground, this.playerHit, null, this);

	    if(!this.stopped)
	    	this.game.physics.arcade.collide(this.dino, this.player, this.playerCaught, null, this);

	    if(this.game.input.activePointer.justPressed()){
	    	if(this.playerAcceleration < 80){
	    		this.playerAcceleration += 1.4;
	    	}
	    } else {
	    	if(this.playerAcceleration > 0){
	    		this.playerAcceleration -= 1;
	    	}
	    }

	    if(!this.stopped) {
	      this.player.body.velocity.x = this.playerVelocity + this.playerAcceleration;
	    } else {
	    	this.player.body.velocity.x = 0;
	    }

	    this.dino.body.velocity.x = 300;

	    if(this.player.body.position.x > this.stageLength){
	    	this.game.playerManager.winStage();
	    }
	},

	playerCaught: function(){
		this.stopped = true;
		this.player.loadTexture('scientist_still', 0);
		this.game.add.tween(this.player).to( { angle: 90 }, 100, Phaser.Easing.Linear.None, true);
		this.game.playerManager.loseStage();
	}
};