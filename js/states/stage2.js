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

        //loads background music in loop
        this.prepareBackgroundMusic();
    },
    adjustStageWorld: function(){
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    },
    createBackground: function(){
        this.game.stage.backgroundColor = "#4488AA";
    },
    createSprites: function(){
        var scaleRatio = this.game.scaleHelper.getScaleRatio();

        this.ground = this.add.tileSprite(0,this.game.height - 70, this.game.world.width, 70, 'ground');

        var distance_enemies = 100;

        this.player = this.game.add.sprite(0, 0, 'scientist_still');
        this.player.anchor.setTo(0.5, 1);
        this.player.scale.setTo(scaleRatio, scaleRatio);
        this.player.x = this.game.world.centerX - (distance_enemies * scaleRatio);
        this.player.y = this.game.height - this.ground.height;

        this.enemy = this.game.add.sprite(0, 0, 'cowboy_still');
        this.enemy.scale.setTo(scaleRatio, scaleRatio);
        this.enemy.x = this.game.world.centerX + (distance_enemies * scaleRatio);
        this.enemy.y = this.game.height - this.ground.height;
        this.enemy.anchor.setTo(0.5, 0.5);
        this.enemy.scale.x *= -1;
        this.enemy.anchor.setTo(0.5, 1);

        var warehouse = this.game.add.sprite(0, 0, 'warehouse'); 
        warehouse.scale.setTo(scaleRatio, scaleRatio);
        warehouse.x = 50;
        warehouse.y = this.game.height - this.ground.height - warehouse.height + 3;

        var shed = this.game.add.sprite(0, 0, 'shed'); 
        shed.scale.setTo(scaleRatio, scaleRatio);
        shed.x = this.game.width - shed.width - 50;
        shed.y = this.game.height - this.ground.height - shed.height + 5;
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
    prepareBackgroundMusic: function() {
        this.backgroundMusic = this.game.add.audio('stage2');
        this.game.sound.setDecodedCallback([this.backgroundMusic], this.playBackgroundMusic, this);
    },
    playBackgroundMusic: function() {
        this.backgroundMusic.loopFull(0.6);
        this.backgroundMusic._sound.playbackRate.value = 
            this.game.gameController.gameSpeed == 1 ? 1 : 1 + (this.game.gameController.gameSpeed * 0.10);
    },
    playerShoot: function() {
        if(!this.hasFinished){
            var vm = this;

            if(this.isAbleToShoot){
                this.hasFinished = true;
                this.player.loadTexture('scientist_revolver', 0);
                this.game.add.tween(this.enemy).to( { angle: 90 }, 100 / this.game.gameController.gameSpeed, Phaser.Easing.Linear.None, true);

                this.game.gameController.winStage(function(){
                    vm.backgroundMusic.stop();
                });
            } else {
                this.hasFinished = true;
                this.game.add.tween(this.player).to( { angle: 90 }, 100 / this.game.gameController.gameSpeed, Phaser.Easing.Linear.None, true);

                this.game.gameController.loseStage(function(){
                    vm.backgroundMusic.stop();
                });
            }
        }
    },
    enemyShoot: function(){
        if(!this.hasFinished && this.isAbleToShoot){
            this.hasFinished = true;
            this.enemy.loadTexture('cowboy_revolver', 0);
            this.game.add.tween(this.player).to( { angle: 90 }, 100 / this.game.gameController.gameSpeed, Phaser.Easing.Linear.None, true);
            
            var vm = this;
            this.game.gameController.loseStage(function(){
                vm.backgroundMusic.stop();
            });
        }
    }
}