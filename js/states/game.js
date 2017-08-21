var Main = Main || {};
 
//title screen
Main.Game = function(){};
 
Main.Game.prototype = {
  	create: function() {
	  	this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgtitle');
	    this.background.autoScroll(-20, 0);

	    var stages = [
    		{_id: 'stage1', label: 'Collect'},
    		{_id: 'stage2', label: 'Jump'},
    		{_id: 'stage3', label: 'Protect'}
	    ];

	    var stageIndex = this.game.rnd.integerInRange(0, 2);

	    console.log('stageIndex', stageIndex);
	    console.log('stages', stages);

	    this.currentStage = stages[stageIndex];

	    console.log('this.currentStage ', this.currentStage );

	    this.currentTime = new Date().getTime();

	    var game_label = this.game.add.text(this.game.width / 2, this.game.height / 2, 
      		this.currentStage.label, 
      		{ font: "30px Arial", fill: "#fff", align: "center" }
    	);
    	game_label.anchor.set(0.5);
    	game_label.alpha = 0;

    	this.game.time.events.add(5000, function() {    
    		this.game.add.tween(game_label).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
    	}, this);
  	},
  	update: function() {

  		if(this.hasPassedSeconds(8)){
  		}
  	},
	hasPassedSeconds: function(seconds){
		var timeDifference = new Date().getTime() - this.currentTime;
		return Math.abs(timeDifference / 1000) > seconds;
	}
};