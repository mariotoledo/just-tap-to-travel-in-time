Main.MainMenu = function(){};
 
Main.MainMenu.prototype = {
  create: function() {
    this.game.gameController = new Main.GameController(this.game, this.camera);

    this.started = false;
    this.teleported = false;

    this.title_pos_y = 0.3;

    //stage world settings
    this.adjustStageWorld();

    //create stage background
    this.createBackground();

    //create all stage HUDs
    this.createStageLabels();

    //create all stage sprites
    this.createSprites();

    //bring to front all important elements
    this.orderStageElements();

    //loads background music in loop and sfx
    this.prepareBackgroundMusic();
  },
  createSprites: function(){
    var scaleRatio = this.game.scaleHelper.getScaleRatio();

    this.ground = this.add.tileSprite(0, this.game.height - 70, this.game.world.width, 70, 'lab_floor');
    this.game.world.bringToTop(this.ground);
    this.game.physics.arcade.enable(this.ground);

    this.scientist = this.game.add.sprite(0, 0, 'scientist_walking');
    this.scientist.scale.setTo(scaleRatio, scaleRatio);
    this.scientist.x = -this.scientist.width;
    this.scientist.y = this.game.height - this.ground.height;
    this.scientist.alpha = 0;
    this.scientist.animations.add('walk');
    this.scientist.standDimensions = {width: this.scientist.width, height: this.scientist.height};
    this.scientist.anchor.setTo(0.5, 1);
    this.scientist.animations.play('walk', 24, true);

    this.timeMachine = this.game.add.sprite(0, 0, 'time_machine');
    this.timeMachine.scale.setTo(scaleRatio, scaleRatio);
    this.timeMachine.x = this.game.world.centerX - (this.timeMachine.width / 2);
    this.timeMachine.y = this.game.height - this.timeMachine.height - this.ground.height;

    this.title = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 70, 'title');
    this.title.scale.setTo(scaleRatio, scaleRatio);
    this.title.anchor.setTo(0.5);
  },
  orderStageElements: function() {
    this.game.world.bringToTop(this.title);
    this.game.world.bringToTop(this.scientist);
    this.game.world.bringToTop(this.copyright);
    this.game.world.bringToTop(this.helpUs);
  },
  adjustStageWorld: function(){
    this.game.world.setBounds(0, 0, this.game.width, this.game.height);
  },
  createBackground: function(){
    this.game.stage.backgroundColor = "#91B185";
  },
  createStageLabels: function() {
    var fontSize = this.game.device.desktop ? '14px' : '10px';

    console.log('this.game.device', this.game.device);

    this.copyright = this.game.add.text(0, 0, 'Development by Mario Toledo\nBackground Music by SketchyLogic', 
        { font: fontSize + " Arial", fill: "#fff", align: "left" }
    );

    this.copyright.x = this.game.width - this.copyright.width - 20;
    this.copyright.y = this.game.height - this.copyright.height - 10;

    this.helpUs = this.game.add.text(20, 0, 'This is an open-source and colaborative game. (v 1.0.3b)\nHelp us at: github.com/mariotoledo/just-tap-to-travel-in-time', 
        { font: fontSize + " Arial", fill: "#fff", align: "left" }
    );
    this.helpUs.y = this.game.height - this.helpUs.height - 10;
  },
  prepareBackgroundMusic: function() {
    this.backgroundMusic = this.game.add.audio('main');

    this.menuSfx = this.game.add.audio('menu_selection');
    this.menuSfx.volume = 1.5;

    this.teleportSfx = this.game.add.audio('teleport');
    this.teleportSfx.volume = 0.7;

    var sounds = [this.backgroundMusic, this.menuSfx, this.teleportSfx]

    this.game.sound.setDecodedCallback(sounds, this.playBackgroundMusic, this);
  },
  playBackgroundMusic: function() {
    this.backgroundMusic.loopFull(0.6);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed() && this.started == false) {
      this.started = true;
      this.menuSfx.play();
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
    if(this.teleported === false){
      this.teleported = true;
      this.teleportSfx.play();

      this.enable_scientist_running = false;
      this.scientist.loadTexture('scientist_still', 0);
      this.game.add.tween(this.scientist).to({alpha: 0}, 50, Phaser.Easing.Linear.None, true);

      var vm = this;
      this.game.time.events.add(50, function() { 
        vm.camera.fade('#FFFFFF');
        vm.camera.onFadeComplete.add(function(){
          this.backgroundMusic.stop();
          vm.game.state.start('Game');
        },vm); 
      });
    }
  }
};