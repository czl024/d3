class test extends GameScene{
    constructor() { super('test') }
}



class MainMenu extends Phaser.Scene{
    constructor() { super('menu') }

    create() {

    }
}



const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [test],
    title: "Graballty",
});