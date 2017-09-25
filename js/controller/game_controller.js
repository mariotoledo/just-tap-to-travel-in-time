Main.GameController = function(game, camera){
    this.lifes = 3;
    this.points = 0;
    this.game = game;
    this.camera = camera;
    this.gameSpeed = 1;

    this.win_sfx = this.game.add.audio('win');
    this.win_sfx.volume = 1.5;

    this.lose_sfx = this.game.add.audio('lose');
    this.lose_sfx.volume = 1.5;
    
    this.game.sound.setDecodedCallback([this.win_sfx, this.lose_sfx], this.decodedMusic, this);
};

Main.GameController.prototype = {
    loseStage: function(callback){
        this.lose_sfx.play();
        if(this.lifes > 1){
            this.lifes -= 1;
            this.goToState('Game', callback);
        } else {
            this.goToState('GameOver', callback);
        }
    },
    winStage: function(callback){
        this.win_sfx.play();
        this.points = this.points + (100 * this.gameSpeed);
        this.gameSpeed = this.gameSpeed + 0.5;
        this.goToState('Game', callback);
    },
    goToState: function(stageName, callback) {
        var camera = this.camera;
        var game = this.game;

        this.game.time.events.add(1000, function() {
            camera.fade('#FFFFFF');
            camera.onFadeComplete.add(function(){
                callback();
                game.state.start(stageName);
            },this);
        });
    },
    decodedMusic: function(){
        
    }
}