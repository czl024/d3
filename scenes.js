class GameScene extends Phaser.Scene{
    spawners = [];
    spawnerParameters = [];
    goals = [];
    gravObj = [];
    balls = [];
    timerText;
    width;
    height;
    timeElapsed;
    spawned = false;

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

    update(time, delta){
        this.timeElapsed = time;
        this.timeElapsed /= 100;
        this.timeElapsed = Math.round(this.timeElapsed);
        this.timeElapsed /= 10;
        if( ((this.timeElapsed) * 10 % 10) != 0 ) this.timerText.setText(`Time : ${this.timeElapsed}`);
        else this.timerText.setText(`Time : ${this.timeElapsed}.0`);
        this.destroyBalls();

        if(this.timeElapsed % .5 == 0){
            this.timerText.setAlpha(.5);
            if(!this.spawned){
                for(let x = 0; x < this.spawners.length; x++){
                    this.spawnBalls(this.spawnerParameters[x]);
                }
            }
            this.spawned = true;
        }else{
            this.spawned = false;
            this.timerText.setAlpha(1);
        }
        console.log(this.balls.length);
    }

    finishLevel(){
        
    }

    spawnBalls(a){
        let newBall = this.physics.add.image(a[0], a[1], 'ball');
        this.physics.velocityFromRotation(a[2], a[3], newBall.body.velocity);
        this.balls.push(newBall);
    }

    destroyBalls(){
        this.balls.forEach((b, index) => {
            if(b.x < -25 || b.x > this.width + 20 || b.y > this.height + 20){
                b.destroy();
                this.balls.splice(index, index + 1);
            }
        })
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