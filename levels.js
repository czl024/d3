class Level1 extends GameScene{
    constructor() { super('lv1') }

    create(){
        //establish level parameters
        this.level = 1;
        this.goalCounter = 1;

        //create level
        //spawners
        let s1 = this.add.image(this.width / 3, this.height / 2, 'spawner');
        this.spawners.push(s1);
        this.spawnerParameters.push([s1.x, s1.y, -45, 250]);
        //goals
        let goal = this.physics.add.image(2 * this.width / 3, this.height / 2, 'goal');
        goal.setOrigin(.5);
        goal.setScale(2);
        goal.setMaxVelocity(0);
        this.goals.push(goal);
    }

    finishLevel(){
        this.scene.start('sum', {time: this.timeElapsed, obj: this.gravObj.length, lv: this.level});
    }
}



class Level2 extends GameScene{
    constructor() { super('lv2') }

    create(){
        //establish level parameters
        this.level = 2;
        this.goalCounter = 1;

        //create level
        //spawners
        let s1 = this.add.image(this.width / 3, this.height / 2, 'spawner');
        this.spawners.push(s1);
        this.spawnerParameters.push([s1.x, s1.y, -45, 250]);
        //goals
        let goal = this.physics.add.image(2 * this.width / 3, this.height / 2, 'goal');
        goal.setOrigin(.5);
        goal.setScale(2);
        goal.setMaxVelocity(0);
        this.goals.push(goal);
    }

    finishLevel(){
        this.scene.start('sum', {time: this.timeElapsed, obj: this.gravObj.length, lv: this.level});
    }
}



class Level3 extends GameScene{
    constructor() { super('lv3') }

    create(){
        //establish level parameters
        this.level = 3;
        this.goalCounter = 1;

        //create level
        //spawners
        let s1 = this.add.image(this.width / 3, this.height / 2, 'spawner');
        this.spawners.push(s1);
        this.spawnerParameters.push([s1.x, s1.y, -45, 250]);
        //goals
        let goal = this.physics.add.image(2 * this.width / 3, this.height / 2, 'goal');
        goal.setOrigin(.5);
        goal.setScale(2);
        goal.setMaxVelocity(0);
        this.goals.push(goal);
    }

    finishLevel(){
        this.scene.start('sum', {time: this.timeElapsed, obj: this.gravObj.length, lv: this.level});
    }
}



class Summary extends SummaryScene{
    constructor() { super('sum') }

    create(){
        let button = this.add.text(this.width / 2, 3 * this.height / 4, "", {
            fontSize: 50
        });
        button.setInteractive();
        button.setOrigin(.5);
        switch(this.lv){
            case 1:
                button.setText("To Level 2");
                button.on('pointerdown', () =>{
                    this.scene.start('lv2');
                })
                break;
            case 2:
                button.setText("To Level 3");
                button.on('pointerdown', () =>{
                    this.scene.start('lv3');
                })
                break;
            case 3:
                button.setText("Back to Level 1");
                button.on('pointerdown', () =>{
                    this.scene.start('lv1');
                })
                break;
            default:
        }
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
        this.scene.start('lv1');
    }
}



const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [MainMenu, Level1, Level2, Level3, Summary],
    title: "Graballty",
    physics: {
        default: 'arcade',
        arcade: { gravity: {y: 150}, debug: true }
    }
});