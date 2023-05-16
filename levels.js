class MainMenu extends Phaser.Scene{
    constructor() { super('menu') }

    create() {

    }
}

class Loader extends Phaser.Scene{
    constructor() { super('loader') }

    preload(){
        //visual feedback
        let progText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "");
        progText.setOrigin(.5);
        this.load.on('progress', value => {
            progText.setText(`Loading : ${value}%`);
        });

        this.load.on('complete', () =>{
            this.add.tween({
                targets: progText,
                alpha: {from: 1, to: 0, ease: 'linear'},
                duration: 1000,
                onComplete: () => {
                    progText.destroy();
                    this.scene.start('menu');
                }
            });
        });

        //load assets

        //create things from assets
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Loader, MainMenu],
    title: "Graballty",
});