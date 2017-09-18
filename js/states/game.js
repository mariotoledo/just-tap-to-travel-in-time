var Main = Main || {};
 
//title screen
Main.Game = function(){};
 
Main.Game.prototype = {
  	create: function() {
	    var stages = [
    		{_id: 'stage1', label: 'Run!', stage: 'Stage1'},
        {_id: 'stage2', label: 'Shoot!', stage: 'Stage2'}
	    ];

	    var stageIndex = this.game.rnd.integerInRange(0, stages.length - 1);

	    this.currentStage = stages[stageIndex];

	    this.game_label = this.game.add.text(this.game.width / 2, this.game.height / 2, 
      		this.currentStage.label, 
      		{ font: "60px Arial", fill: "#fff", align: "center", fontWeight: 'bold' }
    	);
    	this.game_label.anchor.set(0.5);
    	this.game_label.alpha = 0;

      this.lifes = this.game.add.text(20, 20, 'Lifes: ' + this.game.gameController.lifes, 
          { font: "30px Arial", fill: "#fff", align: "center" }
      );

      this.points = this.game.add.text(0, 20, 'Points: ' + this.game.gameController.points, 
          { font: "30px Arial", fill: "#fff", align: "center" }
      );
      this.points.x = this.game.width - this.points.width - 20;

      this.timeMachine = this.game.add.sprite(-128, this.game.height / 2, 'time_machine');
      this.timeMachine.standDimensions = {width: this.timeMachine.width, height: this.timeMachine.height};
      this.timeMachine.anchor.setTo(0.5, 0.5);

      var backgroundFragment = this.game.filterHelper.timeTravelFilter();

      this.backgroundFilter = new Phaser.Filter(this.game, null, backgroundFragment);
      this.backgroundFilter.setResolution(this.game.width, this.game.height);

      this.backgroundSprite = this.game.add.sprite();
      this.backgroundSprite.width = this.game.width;
      this.backgroundSprite.height = this.game.height;

      this.backgroundSprite.filters = [ this.backgroundFilter ];

      this.game.world.bringToTop(this.timeMachine);
      this.game.world.bringToTop(this.game_label);
      this.game.world.bringToTop(this.lifes);
      this.game.world.bringToTop(this.points);
  	},
  	update: function() {
      this.backgroundFilter.update(this.game.input.mousePointer);

      if(this.timeMachine.x > this.game.width){
        this.game.add.tween(this.game_label).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);

        this.game.time.events.add(3000, function() {
          this.camera.fade('#FFFFFF');
          this.camera.onFadeComplete.add(function(){
            this.game.state.start(this.currentStage.stage);
          },this);
        }, this);
      } 

      this.timeMachine.x += 8;
      this.timeMachine.angle += 8;
      
  	},
	hasPassedSeconds: function(seconds){
		var timeDifference = new Date().getTime() - this.currentTime;
		return Math.abs(timeDifference / 1000) > seconds;
	}
};