Main.Stage2 = function(){};
 
Main.Stage2.prototype = {
    create: function() {
        var gravity = 1000;

        this.game.world.setBounds(0, 0, this.game.height, this.game.height);

        this.ground = this.add.tileSprite(0,this.game.height - 70, this.game.world.width, 70, 'ground');

        this.player = this.game.add.sprite(100, this.game.height-128, 'scientist_standing');
        this.player.anchor.setTo(0.5, 1);

        this.enemy = this.game.add.sprite(this.game.width - 100, this.game.height-128, 'scientist_standing');
        this.enemy.anchor.setTo(0.5, 1);

        this.game.world.bringToTop(this.ground);
        this.game.world.bringToTop(this.player);
        this.game.world.bringToTop(this.enemy);

        this.game.stage.backgroundColor = "#4488AA";

        this.game.physics.arcade.enable(this.player);
        this.game.physics.arcade.enable(this.enemy);
        this.game.physics.arcade.enable(this.ground);

        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        this.player.body.gravity.y = gravity;
        this.enemy.body.gravity.y = gravity;

        var ready_label = this.game.add.text(this.game.width / 2, this.game.height / 2, 
            'Ready...', 
            { font: "40px Arial", fill: "#fff", align: "center" }
        );
        ready_label.anchor.set(0.5);
        this.game.time.events.add(1500, function() { 
            this.game.add.tween(ready_label).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
        }, this);
    },
    update: function() {
    }
}