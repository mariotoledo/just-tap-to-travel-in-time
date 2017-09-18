//title screen
Main.GameOver = function(){};
 
Main.GameOver.prototype = {
    create: function() {
       var game_over = this.game.add.text(this.game.width/2, -80, 
          "Game Over", 
          { font: "80px Arial", fill: "#fff", align: "center" }
        );
        game_over.anchor.set(0.5);
        this.game.stage.backgroundColor = "#000000";

        this.game.add.tween(game_over).to( { y: this.game.height/2 }, 2400, Phaser.Easing.Bounce.Out, true);
    },
  
    update: function() {
        var game = this.game;
        var camera = this.camera;

        this.game.time.events.add(5000, function() {    
            camera.fade('#FFFFFF');
            camera.onFadeComplete.add(function(){
              game.state.start('MainMenu');
            },this);
        }, this);
    }
};