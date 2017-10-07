var Main = Main || {};
 
//loading the game assets
Main.Preload = function(){};
 
Main.Preload.prototype = {
  preload: function() {
    this.load.image('title', 'assets/images/title.png');
    
    this.load.spritesheet('scientist_walking', 'assets/images/scientist_walking.png', 128, 128, 2);
    this.load.image('scientist_still', 'assets/images/scientist_still.png');
    this.load.image('scientist_revolver', 'assets/images/scientist_revolver.png');
    this.load.image('cowboy_still', 'assets/images/cowboy_still.png');
    this.load.image('cowboy_revolver', 'assets/images/cowboy_revolver.png');
    this.load.spritesheet('dino_walking', 'assets/images/dino_walking.png', 258, 180, 2);
    this.load.spritesheet('finish-line', 'assets/images/finish.png', 384, 384, 2);
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('time_travel_mobile_bg', 'assets/images/time_travel_mobile_bg.jpg');
    
    this.load.image('plateau', 'assets/images/plateau.png');
    this.load.image('warehouse', 'assets/images/warehouse.png');
    this.load.image('shed', 'assets/images/shed.png');
    this.load.image('time_machine', 'assets/images/time_machine.png');

    this.load.audio('main', 'assets/music/main.wav');
    this.load.audio('intro', 'assets/music/intro.wav');
    this.load.audio('stage1', 'assets/music/stage1.wav');
    this.load.audio('stage2', 'assets/music/stage2.wav');
    this.load.audio('gameover', 'assets/music/gameover.wav');

    this.load.audio('menu_selection', 'assets/sfx/menu_selection.wav');
    this.load.audio('teleport', 'assets/sfx/teleport.wav');
    this.load.audio('win', 'assets/sfx/win.wav');
    this.load.audio('lose', 'assets/sfx/lose.wav');

    this.game.stage.backgroundColor = "#91B185";

    this.ground = this.add.tileSprite(0,this.game.height - 70,this.game.world.width, 70, 'lab_floor');
    this.game.world.bringToTop(this.ground);

    this.helpUs = this.game.add.text(this.game.world.centerX, 0, 'This is a open-source and colaborative game.\nHelp us at: https://github.com/mariotoledo/just-tap-to-travel-in-time', 
        { font: "18px Arial", fill: "#fff", align: "center" }
    );
    this.helpUs.anchor.setTo(0.5);
    this.helpUs.y = this.game.world.centerY - this.helpUs.height - 30;

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.helpUs.y + this.helpUs.height + 20, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
 
    this.load.setPreloadSprite(this.preloadBar);
  },
  create: function() {
  	this.state.start('MainMenu', true, false);
  }
};