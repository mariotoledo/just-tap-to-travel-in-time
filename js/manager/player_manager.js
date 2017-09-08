Main.PlayerManager = function(game, camera){
    this.lifes = 3;
    this.game = game;
    this.camera = camera;
};

Main.PlayerManager.prototype = {
    loseStage: function(){
        if(this.lifes > 1){
            this.lifes -= 1;
            this.goToState('Game');
        } else {
            this.goToState('GameOver');
        }
    },
    winStage: function(){
        this.goToState('Game');
    },
    goToState(stageName) {
        var camera = this.camera;
        var game = this.game;

        this.game.time.events.add(1000, function() {
            camera.fade('#FFFFFF');
            camera.onFadeComplete.add(function(){
              game.state.start(stageName);
            },this);
        });
    }
}