Main.MainMenu = function(){};
 
Main.MainMenu.prototype = {
  create: function() {
    this.game.playerManager = new Main.PlayerManager(this.game, this.camera);

    this.logo_pos_y = 0.2;

    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'bgtitle');
    this.background.autoScroll(-20, 0);

    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);

    this.game.world.bringToTop(this.logo);
 
    //start game text
    var press_start = this.game.add.text(this.game.width/2, this.game.height/2 + this.logo.height + 10, 
      "Tap to start", 
      { font: "30px Arial", fill: "#fff", align: "center" }
    );
    press_start.anchor.set(0.5);

    this.enterKey = this.game.input.keyboard
        .addKey(Phaser.Keyboard.ENTER);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.camera.fade('#000000');
        this.camera.onFadeComplete.add(function(){
          this.game.state.start('Game');
        },this);
    }

    if(this.logo.y < 300 || this.logo.y > 350)
      this.logo_pos_y *= -1;

    this.logo.y += this.logo_pos_y;
  }
};