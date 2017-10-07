var Main = Main || {};
 
Main.Boot = function(){};

Main.Boot.prototype = {
  preload: function() {
    
  	//loading all assets
    this.load.image('preloadbar', 'assets/images/loading_bar.png');
    this.load.image('lab_floor', 'assets/images/lab_floor.png');
  },
  create: function() {
    this.game.filterHelper = new Main.FilterHelper();
    this.game.scaleHelper = new Main.ScaleHelper();
 
  	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

  	this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    if (!this.game.device.desktop)
    {
        //iphone 4, 5 scale fix
        if(this.game.scaleHelper.getScaleRatio() == 1)
          this.game.scaleHelper.getScaleRatio = function() {
            return 0.5;
        }

        this.scale.forceOrientation(true, false);
        this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
    }
    this.game.scale.setMaximum();

  	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start('Preload'); 
  },
  enterIncorrectOrientation: function () {
    document.getElementById('rotate').style.display = 'block';
    this.game.paused = true;
  },
  leaveIncorrectOrientation: function () {
    window.location.reload();
  }
};