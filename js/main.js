var Main = Main || {};
 
Main.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

//including states 
Main.game.state.add('Boot', Main.Boot);
Main.game.state.add('Preload', Main.Preload);
Main.game.state.add('MainMenu', Main.MainMenu);
Main.game.state.add('Stage1', Main.Stage1);
Main.game.state.add('Stage2', Main.Stage2);
Main.game.state.add('GameOver', Main.GameOver);
Main.game.state.add('Game', Main.Game);
 
Main.game.state.start('Boot');

