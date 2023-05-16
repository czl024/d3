class test extends GameScene{
    constructor() { super('test') }

    create(){
        this.spawners.push(1);
        this.spawners.push(1);
        this.spawnerParameters.push([100, 100, -45, 250]);
        this.spawnerParameters.push([500, 100, 180, 250]);
    }
}



class MainMenu extends Phaser.Scene{
    constructor() { super('menu') }

    preload(){
        this.load.image('ball', "assets/ball.png");
        this.load.image('spawner', "assets/spawner.png");
        this.load.image('goal', "assets/goal.png");
        this.load.image('attract', "assets/attractor.png");
        this.load.image('repulser', "assets/repulser.png");
    }

    create(){
        this.scene.start('test');
    }
}



const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [MainMenu, test],
    title: "Graballty",
    physics: {
        default: 'arcade',
        arcade: { gravity: {y: 200} }
    }
});