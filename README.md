# Just TAP to TIME IN TRAVEL
#### A colaborative Phaser game made to an online Game Jam with a time-travel theme

"Just TAP to TIME IN TRAVEL" is a game made originally for a [Yarquen's online Game Jam](https://www.youtube.com/watch?v=GJcB-tKWsJE) with a "time travel" theme.

The main idea was to build a Proof of Concept, and for that, the [Phaser](http://phaser.io/) as framework was chosen because of its ease in development and by the use Javascript and HTML5 elements.

The gameplay is based on "mini-games" games like Wario Ware, where the player must follow an action for a fast reaction on the stage. Each stage is based on a specific era in time, so the player may find yourself running from a Dinosaur or in a gun duel in a western background. Also, this game uses the tap action ("clicking" with a mouse or "tapping" on a mobile screen), so you may tap really fast on a stage, tap only when something appears on screen and etc.

I really want this game to become a collaborative project, so everyone can build new stages or even improve the gameplay or graphics

:arrow_forward: :arrow_forward: :arrow_forward: **[Check it out the live game right here](https://mariotoledo.github.io/just-tap-to-travel-in-time/)** :arrow_backward: :arrow_backward: :arrow_backward:

## Table of Contents

- [Stages](#stages)
- [Project Structure](#project-structure)
- [How to create a stage](#how-to-create-a-stage)
- [What else can I help?](#what-else-can-i-help)

## Stages

| Photo  | Name | Action  | Description | Creator |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| ![ScreenShot](https://mariotoledo.github.io/just-tap-to-travel-in-time/docs/thumb_stage1.jpg) | Stage 1  | Run!  | Escape from the Dinosaur by tapping as fast as you can | [Mario Toledo](https://github.com/mariotoledo)
| ![ScreenShot](https://mariotoledo.github.io/just-tap-to-travel-in-time/docs/thumb_stage2.jpg) | Stage 2  | Shoot!  | Wait for the right time to tap and shoot the villain | [Mario Toledo](https://github.com/mariotoledo)

## Project Structure

- assets: contains all images, videos and any other resources
- controllers: contains all game controllers
  - game-controller: responsible for controlling the game as soon as it starts, controlling what happens when you win or lose a minigame and responsible for transitioning to another stage
- helpers: contains functions, constants and elements to help on other functionalities
- states: every state of the game
  - boot: responsible for loading assets on memory and create initial configuration
  - preload: is loaded jusr after boot is realized and its responsible for loading config while the loading bar appears
  - main-menu: is loaded just after preload and shows the title screen of the game
  - game: the main file that instantiates game-controller, shows number of lifes/points and calls randomsly for a stage
  - stage[n]: a stage of the game (oh, really??)

## How to create a stage?

As told before, I want to make this a collaborative project with a lot of stages created by other people. Of course that I'm looking to help these people by giving all credits and adding its name and github profile in the game and int the project.

If you want to build a stage, first of all, you must clone this repo on your machine...

```bash
> git clone https://github.com/mariotoledo/just-tap-to-travel-in-time.git
```

... and create a new branch from master. It would be really helpful if the branch name starts with "stage-".

```bash
> git branch stage-...
```

You also must start this project on a server. you may configure an Apache Server or even use IIS from Windows. I recommend using [Wamp Server](http://www.wampserver.com/en/), which may give you a faster configuration and virtual server hosts.
It would be good if you already know something about [Phaser](http://phaser.io). The framework page has some good startup tutorials and examples that may help if you are new to it. And, of course, you should know how to program in Javascript.

Create a new stage by adding a new JS file on states folder. It would be good if the file name starts with "stage". You may use the following code as a boilerplate of a stage file (just change "StageNew" to the name of the stage).

```javascript
//constructor
Main.StageNew = function(){};
 
Main.StageNew.prototype = {
  //will be called when the stage is created
  create: function() {
  },
  
  //will be called on every game update cycle (on each frame)
  update: function() {
  }
}
```
From here, you must add your stage script on index.html...

```html
<script type="text/javascript" src="js/states/stage-new.js"></script>
```

... add a new entry on main.js ...

```javascript
Main.game.state.add('StageNew', Main.StageNew);
```
... and add a new entry on stages array from the game.js file

```javascript
var stages = [
  {_id: 'stage1', label: 'Run!', stage: 'Stage1'},
  {_id: 'stage2', label: 'Shoot!', stage: 'Stage2'},
  {_id: 'stageNew', label: 'New Stage', stage: 'StageNew'},
];
```

The "winning" and "lose" functions are called from the Game Controller. Use both inside your winning and losing logic.

```javascript
  //wins a mini-game and go back to game.js
  this.game.gameController.winStage();

 //loses a mini-game and go back to game.js or game-over.js
  this.game.gameController.loseStage();
```

If you have any trouble, you can always look stage1.js and stage2.js

## What else can I help?

There are lots of things that anyone can help on this project, like:
- Create all assets, as we are "using" from Scribblenauts
- Improve general mechanics and engeneering
- Create issues for bugs
