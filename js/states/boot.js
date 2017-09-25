var Main = Main || {};
 
Main.Boot = function(){};

Main.Boot.prototype = {
  preload: function() {
    
  	//loading all assets
    this.load.image('bgtitle', 'assets/images/bg-title.png');
    this.load.image('preloadbar', 'assets/images/loading_bar.png');
    this.load.image('lab_floor', 'assets/images/lab_floor.png');
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