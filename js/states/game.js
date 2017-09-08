var Main = Main || {};
 
//title screen
Main.Game = function(){};
 
Main.Game.prototype = {
  	create: function() {
	  	this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgtitle');
	    this.background.autoScroll(-20, 0);

	    var stages = [
    		{_id: 'stage1', label: 'Run!', stage: 'Stage1'}
	    ];

	    var stageIndex = this.game.rnd.integerInRange(0, stages.length - 1);

	    this.currentStage = stages[stageIndex];

	    var game_label = this.game.add.text(this.game.width / 2, this.game.height / 2, 
      		this.currentStage.label, 
      		{ font: "30px Arial", fill: "#fff", align: "center" }
    	);
    	game_label.anchor.set(0.5);
    	game_label.alpha = 0;

    	this.game.time.events.add(5000, function() {    
    		this.game.add.tween(game_label).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
    	}, this);

      this.game.time.events.add(8000, function() {
        this.camera.fade('#FFFFFF');
        this.camera.onFadeComplete.add(function(){
          this.game.state.start(this.currentStage.stage);
        },this);
      }, this);
  	},
  	update: function() {
  	},
	hasPassedSeconds: function(seconds){
		var timeDifference = new Date().getTime() - this.currentTime;
		return Math.abs(timeDifference / 1000) > seconds;
	}
};