class GameScene extends Phaser.Scene{
    time = 0;
    objects = [];
    balls = []

    constructor(key, name){
        super(key);
        this.name = name;
    }

    create(){
        this.timerEvents.push(this.time.addEvent({
            delay: 1000,
            loop: true
        }));
    }

    update(){
        
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