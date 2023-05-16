class GameScene extends Phaser.Scene{
    goals = [];
    gravObj = [];
    balls = [];
    timerText;
    width;
    height;
    timeElapsed;

    constructor(key, name){
        super(key);
        this.name = name;
    }

    init(){
        this.width = this.game.config.width;
        this.height = this.game.config.height;

        this.timerText = this.add.text(this.width / 2, this.height / 10, "", {
            fontSize: 50
        });
        this.timerText.setOrigin(.5);

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            loop: true
        });
    }

    create(){

    }

    update(time, delta){
        this.timeElapsed = time;
        this.timeElapsed /= 100;
        this.timeElapsed = Math.round(this.timeElapsed);
        this.timeElapsed /= 10;
        if( ((this.timeElapsed) * 10 % 10) != 0 ) this.timerText.setText(`Time : ${this.timeElapsed}`);
        else this.timerText.setText(`Time : ${this.timeElapsed}.0`);
    }

    finishLevel(){
        
    }
}

class SummaryScene extends Phaser.Scene{
    constructor(key, name){
        super(key);
        this.name = name;
    }
    
    init(data){

    }

    create(){

    }
}