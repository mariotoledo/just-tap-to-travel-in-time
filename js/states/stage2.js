Main.Stage2 = function(){};
 
Main.Stage2.prototype = {
    create: function() {
        var gravity = 1000;
        this.hasFinished = false;
        this.isAbleToShoot = false;

        //stage world settings
        this.adjustStageWorld();

        //create stage background
        this.createBackground();

        //create all stage sprites
        this.createSprites();

        //creating labels to indicate actions to the player
        this.createStageLabels();

        //bring to front all important elements
        this.orderStageElements();

        //add phisics to elements (oh, really?)
        this.addPhisicsToElements();

        //sets times for events to happen
        this.prepareShowdown();
    },
    adjustStageWorld: function(){
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    },
    createBackground: function(){
        this.game.stage.backgroundColor = "#4488AA";
    },
    createSprites: function(){
        this.ground = this.add.tileSprite(0,this.game.height - 70, this.game.world.width, 70, 'ground');

        this.player = this.game.add.sprite(400, this.game.height - 70, 'scientist_still');
        this.player.anchor.setTo(0.5, 1);

        this.enemy = this.game.add.sprite(this.game.width - 400, this.game.height - 70, 'cowboy_still');
        this.enemy.anchor.setTo(0.5, 0.5);
        this.enemy.scale.x *= -1;
        this.enemy.anchor.setTo(0.5, 1);

        this.game.add.sprite(50, this.game.height - 310, 'warehouse'); 
        this.game.add.sprite(this.game.width - 300, this.game.height - 260, 'shed'); 
    },
    addPhisicsToElements: function(gravity){
        this.game.physics.arcade.enable(this.player);
        this.game.physics.arcade.enable(this.enemy);
        this.game.physics.arcade.enable(this.ground);

        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        this.player.body.gravity.y = gravity;
        this.enemy.body.gravity.y = gravity;
    },
    createStageLabels: function() {
        this.ready_label = this.game.add.text(this.game.width / 2, this.game.height / 2, 
            'Ready...', 
            { font: "40px Arial", fill: "#fff", align: "center" }
        );
        this.ready_label.anchor.set(0.5);
        this.game.time.events.add(2000 / this.game.gameController.gameSpeed, function() { 
            this.game.add.tween(this.ready_label).to({alpha: 0}, 500 / this.game.gameController.gameSpeed, Phaser.Easing.Linear.None, true);
        }, this);

        this.shoot_label = this.game.add.text(this.game.width / 2, this.game.height / 2, 
            'Shoot!', 
            { font: "40px Arial", fill: "#fff", align: "center" });
        this.shoot_label.anchor.set(0.5);
        this.shoot_label.alpha = 0;
    },
    prepareShowdown: function(){
        var shoot_delay = this.game.rnd.integerInRange(0, 5) * 500;

        var vm = this;

        this.game.time.events.add((3000 + shoot_delay) / this.game.gameController.gameSpeed, function() {
            this.game.add.tween(this.shoot_label).to({alpha: 1}, 100 / this.game.gameController.gameSpeed, Phaser.Easing.Linear.None, true);

            this.game.time.events.add(100, function() {
                this.game.add.tween(this.shoot_label).to({alpha: 0}, 100 / this.game.gameController.gameSpeed, Phaser.Easing.Linear.None, true);

                this.isAbleToShoot = true;

                var enemy_shoot_delay = this.game.rnd.integerInRange(0, 5) * 70;

                this.game.time.events.add(enemy_shoot_delay / this.game.gameController.gameSpeed, function() {
                    vm.enemyShoot();
                });
            }, this);
        }, this);
    },
    update: function() {
        this.game.physics.arcade.collide(this.player, this.ground, this.playerHit, null, this);
        this.game.physics.arcade.collide(this.enemy, this.ground, this.playerHit, null, this);

        if(this.game.input.activePointer.justPressed()){
            this.playerShoot();
        }
    },
    orderStageElements: function() {
        this.game.world.bringToTop(this.ground);
        this.game.world.bringToTop(this.player);
        this.game.world.bringToTop(this.enemy);
    },
    playerShoot: function() {
        if(!this.hasFinished){
            if(this.isAbleToShoot){
                this.hasFinished = true;
                this.player.loadTexture('scientist_revolver', 0);
                this.game.add.tween(this.enemy).to( { angle: 90 }, 100 / this.game.gameController.gameSpeed, Phaser.Easing.Linear.None, true);
                this.game.gameController.winStage();
            } else {
                this.hasFinished = true;
                this.game.add.tween(this.player).to( { angle: 90 }, 100 / this.game.gameController.gameSpeed, Phaser.Easing.Linear.None, true);
                this.game.gameController.loseStage();
            }
        }
    },
    enemyShoot: function(){
        if(!this.hasFinished && this.isAbleToShoot){
            this.hasFinished = true;
            this.enemy.loadTexture('cowboy_revolver', 0);
            this.game.add.tween(this.player).to( { angle: 90 }, 100 / this.game.gameController.gameSpeed, Phaser.Easing.Linear.None, true);
            this.game.gameController.loseStage();
        }
    }
}