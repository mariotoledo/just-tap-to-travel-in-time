var Main = Main || {};
 
//used only to load assets and config
Main.Boot = function(){};
 
//setting game configuration and loading the assets for the loading screen
Main.Boot.prototype = {
  preload: function() {
  	//assets we'll use in the loading screen
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('preloadbar', 'assets/images/loading-bar.png');
    this.load.image('bgtitle', 'assets/images/bg-title.png');
    this.load.spritesheet('scientist_walking', 'assets/images/scientist_walking.png', 128, 128, 2);
    this.load.image('scientist_still', 'assets/images/scientist_still.png');
    this.load.image('cowboy_still', 'assets/images/cowboy_still.png');
    this.load.spritesheet('dino_walking', 'assets/images/dino_walking.png', 258, 180, 2);
    this.load.spritesheet('finish-line', 'assets/images/finish.png', 384, 384, 2);
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('volcano', 'assets/images/volcano.png');
  },
  create: function() {
  	//loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';
 
    //scaling options
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.minWidth = 240;
	this.scale.minHeight = 170;
	this.scale.maxWidth = 2880;
	this.scale.maxHeight = 1920;
	
	//have the game centered horizontally
	this.scale.pageAlignHorizontally = true;
 
	//screen size will be set automatically
	//this.scale.setScreenSize(true);
 
	//physics system for movement
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.state.start('Preload');
  }
};