export class Spawner{
    constructor(functio,timer){
        this.function = functio
        this.timer = timer
        this.intervalId
    }
    startSpawn(){
        this.intervalId = setInterval(this.function,this.timer)
    }
    pauseSpawn(){
        clearInterval(this.intervalId)
        this.intervalId=null
    }
    resumeSpawn(){
        this.startSpawn()
    }
}