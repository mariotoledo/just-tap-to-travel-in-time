var Main = Main || {};
 
Main.Game = function(){};
 
Main.Game.prototype = {
	create: function() {
    //randomsly choose a new stage
    this.raffleStage();

    //create all stage HUDs
    this.createStageLabels();

    //create all stage sprites
    this.createSprites();

    //create stage background
    this.createBackground();

    //bring to front all important elements
    this.orderStageElements();
	},
  raffleStage: function() {
    //array of stages, they will be chosen randomsly on each time this stage is started
    var stages = [
      //{_id: 'stage1', label: 'Run!', stage: 'Stage1'},
      {_id: 'stage2', label: 'Shoot!', stage: 'Stage2'}
    ];

    //generating a random index to determine current stage
    var stageIndex = this.game.rnd.integerInRange(0, stages.length - 1);

    //retriving current stage randomsly
    this.currentStage = stages[stageIndex];
  },
  createStageLabels: function() {
    //creating the selected stage label
    this.game_label = this.game.add.text(this.game.width / 2, this.game.height / 2, 
        this.currentStage.label, 
        { font: "60px Arial", fill: "#fff", align: "center", fontWeight: 'bold' }
    );
    this.game_label.anchor.set(0.5);
    this.game_label.alpha = 0;

    //number of lifes label
    this.lifes = this.game.add.text(20, 20, 'Lifes: ' + this.game.gameController.lifes, 
        { font: "30px Arial", fill: "#fff", align: "center" }
    );

    //number of points label
    this.points = this.game.add.text(0, 20, 'Points: ' + this.game.gameController.points, 
        { font: "30px Arial", fill: "#fff", align: "center" }
    );
    this.points.x = this.game.width - this.points.width - 20;
  },
  createSprites: function() {
    this.timeMachine = this.game.add.sprite(-128, this.game.height / 2, 'time_machine');
    this.timeMachine.standDimensions = {width: this.timeMachine.width, height: this.timeMachine.height};
    this.timeMachine.anchor.setTo(0.5, 0.5);
  },
  createBackground: function() {
    this.backgroundFilter = new Phaser.Filter(this.game, null, this.game.filterHelper.timeTravelFilter());
    this.backgroundFilter.setResolution(this.game.width, this.game.height);

    this.backgroundSprite = this.game.add.sprite();
    this.backgroundSprite.width = this.game.width;
    this.backgroundSprite.height = this.game.height;

    this.backgroundSprite.filters = [ this.backgroundFilter ];
  },
  orderStageElements: function() {
    this.game.world.bringToTop(this.timeMachine);
    this.game.world.bringToTop(this.game_label);
    this.game.world.bringToTop(this.lifes);
    this.game.world.bringToTop(this.points);
  },
	update: function() {
    this.backgroundFilter.update(this.game.input.mousePointer);

    //displays current stage label just after the time machine has run over the stage
    if(this.timeMachine.x > this.game.width){
      this.game.add.tween(this.game_label).to({alpha: 1}, 500 / this.game.gameController.gameSpeed, Phaser.Easing.Linear.None, true);

      //switching to new stage after stage label was displayed
      this.game.time.events.add(3000 / this.game.gameController.gameSpeed, function() {
        this.camera.fade('#FFFFFF');
        this.camera.onFadeComplete.add(function(){
          this.game.state.start(this.currentStage.stage);
        },this);
      }, this);
    } 

    this.timeMachine.x += 8 * this.game.gameController.gameSpeed;
    this.timeMachine.angle += 8 * this.game.gameController.gameSpeed;
	}
};