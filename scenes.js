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
    xMaxAccel = 25;
    yMaxAccel = 50;
    level;
    goalCounter;



    constructor(key, name){
        super(key);
        this.name = name;
    }



    init(){
        this.width = this.game.config.width;
        this.height = this.game.config.height;

        //timer text
        this.timerText = this.add.text(this.width / 2, this.height / 10, "", {
            fontSize: 50
        });
        this.timerText.setOrigin(.5);
    }


    
    update(time, delta){
        //values and variables
        const mouse = this.input.activePointer;
        this.activeObj;
        this.activeObjInd;
        this.activeTimer;
        this.objCreated;

        //get current time, convert to a readable time
        this.timeElapsed = time;
        this.timeElapsed /= 100;
        this.timeElapsed = Math.round(this.timeElapsed);
        this.timeElapsed /= 10;

        //needs to run all the time, weirdly need to add decimals but whatever
        if( ((this.timeElapsed) * 10 % 10) != 0 ) this.timerText.setText(`Time : ${this.timeElapsed}`);
        else this.timerText.setText(`Time : ${this.timeElapsed}.0`);
        this.destroyBalls();
        this.pullBalls();

        //spawn balls every half second
        if(this.timeElapsed % .5 == 0){
            if(!this.spawned){
                for(let x = 0; x < this.spawners.length; x++) this.spawnBalls(this.spawnerParameters[x]);
            }
            this.spawned = true;
        }else this.spawned = false;

        //move the currently active (clicked) object
        if(this.activeObj !== undefined){
            this.activeTimer += 1;
            this.activeObj.x = mouse.worldX;
            this.activeObj.y = mouse.worldY;
        }else{
            this.activeTimer = 0;
            this.activeObjInd = undefined;
        }

        //spawn a new attractor if nothing is clicked
        if(mouse.isDown && (!this.objCreated || this.objCreated == undefined) && this.activeObj == undefined){
            let hole = this.physics.add.image(mouse.worldX, mouse.worldY, 'attract');
            hole.setInteractive();
            hole.setMaxVelocity(0);
            hole.setScale(2);
            this.gravObj.push(hole);
            this.objCreated = true;
        }else if(!mouse.isDown && this.objCreated){
            this.objCreated = false;
        }

        //check to see if player is clicking and dragging an attractor
        this.gravObj.forEach((obj, i) => {
            obj.on('pointerdown', () => {
                this.activeObj = obj;
                this.activeObjInd = i;
            });
            obj.on('pointerup', () => {
                //destroy the attractor if it's "clicked")
                if(this.activeTimer < 8 && this.activeObj !== undefined){
                    this.gravObj.splice(this.activeObjInd, this.activeObjInd + 1);
                    this.activeObj.destroy();
                }
                this.activeObj = undefined;
                this.activeObjInd = undefined;
            });
        }); 

        //finishLevel MUST BE IMPLEMENTED BY SUBCLASS
        if(this.goalCounter == 0) this.finishLevel();
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
            //if ball is touching goal, destroy goal, decrement goal counter
            if(!b.body.touching.none){
                this.goalCounter--;
                //need to figure out which goal it's touching
                this.goals.forEach((g, i) =>{
                    if(!g.body.touching.none) {
                        g.destroy();
                        this.goals.splice(i, i + 1);
                    }
                })
            }
            //if ball is out of bounds, destroy
            else if(b.x < -25 || b.x > this.width + 20 || b.y > this.height + 20){
                b.destroy();
                this.balls.splice(index, index + 1);
            }
        })
    }



    pullBalls(){
        this.gravObj.forEach((a, i) => {
            this.balls.forEach((b, j) => {
                let distance = Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y);
                let newAc
                if(distance <= this.maxDistance){
                    //all of this is to find the acceleration
                    let angle = this.getAngle(a.x, a.y, b.x, b.y);
                    let distFactor;
                    if(distance <= this.minDistance) distFactor = 1;
                    else distFactor = (1 - (distance / this.maxDistance)) * 2;
                    let xAccel = distFactor * this.xMaxAccel * Math.cos(angle);
                    let yAccel = distFactor * this.yMaxAccel * Math.sin(angle);
                    if((b.x < a.x && xAccel < 0) || (b.x > a.x && xAccel > 0)) xAccel *= -1;
                    if((b.y < a.y && yAccel < 0) || (b.y > a.y && yAccel > 0)) yAccel *= -1;
                    newAc = new Phaser.Math.Vector2();
                    newAc.set(xAccel, yAccel);
                    b.body.acceleration.add(newAc);
                }else{
                    //if a ball is out of range of an attractor, let it continue on its merry way
                    b.body.acceleration.scale(.9);
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
    summaryText;
    width;
    height;

    constructor(key, name){
        super(key);
        this.name = name;
    }
    
    init(data){
        this.time = data.time;
        this.obj = data.obj;
        this.lv = data.lv;
        this.width = this.game.config.width;
        this.height = this.game.config.height;

        this.summaryText = this.add.text(this.width / 2, this.height / 2, "", {
            fontSize: 50,
            align: 'center'
        });
        this.summaryText.setOrigin(.5);
        this.summaryText.setText(`time: ${this.time}\nobjects: ${this.obj}`);
    }
}