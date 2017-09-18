Main.MainMenu = function(){};
 
Main.MainMenu.prototype = {
  create: function() {
    this.game.gameController = new Main.GameController(this.game, this.camera);

    this.title_pos_y = 0.3;

    this.game.world.setBounds(0, 0, this.game.width, this.game.height);

    this.game.stage.backgroundColor = "#91B185";

    this.copyright = this.game.add.text(0, 0, 'by Mario Toledo', 
        { font: "18px Arial", fill: "#fff", align: "left" }
    );

    this.copyright.x = this.game.width - this.copyright.width - 20;
    this.copyright.y = this.game.height - this.copyright.height - 20;

    this.ground = this.add.tileSprite(0,this.game.height - 70,this.game.world.width, 70, 'lab_floor');
    this.game.world.bringToTop(this.ground);
    this.game.physics.arcade.enable(this.ground);

    this.scientist = this.game.add.sprite(-128, this.game.height-70, 'scientist_walking');
    this.scientist.alpha = 0;
    this.scientist.animations.add('walk');
    this.scientist.standDimensions = {width: this.scientist.width, height: this.scientist.height};
    this.scientist.anchor.setTo(0.5, 1);
    this.scientist.animations.play('walk', 24, true);

    this.timeMachine = this.game.add.sprite(this.game.world.centerX - 50, this.game.height - 370, 'time_machine');

    this.title = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 70, 'title');
    this.title.anchor.setTo(0.5);

    this.game.world.bringToTop(this.title);
    this.game.world.bringToTop(this.scientist);
    this.game.world.bringToTop(this.copyright);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.add.tween(this.title).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);

      var vm = this;

      this.game.time.events.add(500, function() { 
        vm.scientist.alpha = 1;
        vm.enable_scientist_running = true;
      });
    }

    if(this.enable_scientist_running){
      this.scientist.x += 8;
    }

    if(this.scientist.x >= this.game.world.centerX){
      this.timeTravel();
    }

    if(this.title.y < this.game.world.centerY - 70 || this.title.y > this.game.world.centerY - 40)
      this.title_pos_y *= -1;

    this.title.y += this.title_pos_y;
  },
  timeTravel: function(){
    this.enable_scientist_running = false;
    this.scientist.loadTexture('scientist_still', 0);
    this.game.add.tween(this.scientist).to({alpha: 0}, 50, Phaser.Easing.Linear.None, true);

    var vm = this;
    this.game.time.events.add(50, function() { 
      vm.camera.fade('#FFFFFF');
      vm.camera.onFadeComplete.add(function(){
        vm.game.state.start('Game');
      },vm); 
    });
  }
};