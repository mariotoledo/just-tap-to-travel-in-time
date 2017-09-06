//title screen
Main.Stage1 = function(){};
 
Main.Stage1.prototype = {
	create: function() {
		this.game.world.setBounds(0, 0, 3500, this.game.height);
	    this.ground = this.add.tileSprite(0,this.game.height-70,this.game.world.width,70,'ground');

	    this.player = this.game.add.sprite(this.game.width/2, this.game.height-90, 'dog');
	    this.player.animations.add('walk');

	    this.game.world.bringToTop(this.ground);
	    this.game.world.bringToTop(this.player);

	    this.game.physics.arcade.enable(this.player);
	    this.game.physics.arcade.enable(this.ground);

	    this.player.body.gravity.y = 1000;

	    this.ground.body.immovable = true;
	    this.ground.body.allowGravity = false;

	    this.player.standDimensions = {width: this.player.width, height: this.player.height};
	    this.player.anchor.setTo(0.5, 1);
	    
	    this.game.camera.follow(this.player);

	    this.enterKey = this.game.input.keyboard
	        .addKey(Phaser.Keyboard.SPACEBAR);

	    this.enterKey.onDown.add(this.playerJump, this)
	},
  
	update: function() {
	    this.game.physics.arcade.collide(this.player, this.ground, this.playerHit, null, this);

	    if(this.player.alive && !this.stopped) {
	      this.player.body.velocity.x = 300;
	    }
	},
	playerHit: function(player, blockedLayer) {
	},
	playerJump: function() {
	    if(this.player.body.touching.down) {
	      this.player.body.velocity.y -= 400;
	    } 
	}
};