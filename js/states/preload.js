var Main = Main || {};
 
//loading the game assets
Main.Preload = function(){};
 
Main.Preload.prototype = {
  preload: function() {
  	//show logo in loading screen
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgtitle');
    this.background.autoScroll(-20, 0);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
 
    this.load.setPreloadSprite(this.preloadBar);
  },
  create: function() {
  	this.state.start('MainMenu', true, false);
  }
};