var Main = Main || {};
 
Main.Boot = function(){};

Main.Boot.prototype = {
  preload: function() {
    
  	//loading all assets
    this.load.image('title', 'assets/images/title.png');
    this.load.image('preloadbar', 'assets/images/loading-bar.png');
    this.load.image('bgtitle', 'assets/images/bg-title.png');
    this.load.spritesheet('scientist_walking', 'assets/images/scientist_walking.png', 128, 128, 2);
    this.load.image('scientist_still', 'assets/images/scientist_still.png');
    this.load.image('scientist_revolver', 'assets/images/scientist_revolver.png');
    this.load.image('cowboy_still', 'assets/images/cowboy_still.png');
    this.load.image('cowboy_revolver', 'assets/images/cowboy_revolver.png');
    this.load.spritesheet('dino_walking', 'assets/images/dino_walking.png', 258, 180, 2);
    this.load.spritesheet('finish-line', 'assets/images/finish.png', 384, 384, 2);
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('lab_floor', 'assets/images/lab_floor.png');
    this.load.image('plateau', 'assets/images/plateau.png');
    this.load.image('oasis', 'assets/images/oasis.png');
    this.load.image('warehouse', 'assets/images/warehouse.png');
    this.load.image('stockyard', 'assets/images/stockyard.png');
    this.load.image('shed', 'assets/images/shed.png');
    this.load.image('time_machine', 'assets/images/time_machine.png');

    this.load.audio('main', 'assets/music/main.wav');
    this.load.audio('intro', 'assets/music/intro.wav');
    this.load.audio('stage1', 'assets/music/stage1.wav');
    this.load.audio('stage2', 'assets/music/stage2.wav');
  },
  create: function() {
    this.game.filterHelper = new Main.FilterHelper();
 
  	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  	this.scale.minWidth = 800;
  	this.scale.minHeight = 600;
  	this.scale.maxWidth = 2880;
  	this.scale.maxHeight = 1920;
  	
  	this.scale.pageAlignHorizontally = true;
   
  	this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('Preload');

  }
};