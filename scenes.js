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
    maxDistance = 600;
    minDistance = 300;
    xMaxAccel = 400;
    yMaxAccel = 1000;

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
        this.pullBalls();

        if(this.timeElapsed % .5 == 0){
            if(!this.spawned){
                for(let x = 0; x < this.spawners.length; x++) this.spawnBalls(this.spawnerParameters[x]);
            }
            this.spawned = true;
        }else this.spawned = false;
    }

    finishLevel(){
        
    }

    spawnBalls(a){
        let newBall = this.physics.add.image(a[0], a[1], 'ball');
        this.physics.add.overlap(newBall, this.goals);
        //this.physics.add.overlap(newBall);
        this.physics.velocityFromRotation(a[2], a[3], newBall.body.velocity);
        this.balls.push(newBall);
    }

    destroyBalls(){
        this.balls.forEach((b, index) => {
            if(b.x < -25 || b.x > this.width + 20 || b.y > this.height + 20 || !b.body.touching.none){
                b.destroy();
                this.balls.splice(index, index + 1);
            }
        })
    }

    pullBalls(){
        this.gravObj.forEach((a, i) => {
            this.balls.forEach((b, j) => {
                let distance = Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y);
                if(distance <= this.maxDistance){
                    let angle = this.getAngle(a.x, a.y, b.x, b.y);
                    let distFactor;
                    if(distance <= this.minDistance) distFactor = 1;
                    else distFactor = (1 - (distance / this.maxDistance)) * 2;
                    b.setAcceleration(-1 * distFactor * this.xMaxAccel * Math.cos(angle), -1 * distFactor * this.yMaxAccel * Math.sin(angle));
                    b.setScale(3 * distFactor + 1);
                }else{
                    b.setScale(1);
                    b.setAcceleration(0);
                }
            })
        })
    }

    getAngle(x1, y1, x2, y2){
        let dx = x1 - x2;
        let dy = y1 - y2;
        return(Math.atan(dy/dx));
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