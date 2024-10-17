import { Spawner } from "./Spawner.js";
import Allenemies from "./Allenemies.js";

export class Enemies{
    constructor(canvas,player){
        console.log(Allenemies.W7.getSpawnRate())
        this.enemies=[]
        this.timeIni=4000
        this.time=this.timeIni
        this.player = player
        this.Spawner= new Spawner(()=>{
            console.log(this.player.level)
            console.log(this.Spawner.timer)
            if(this.enemies.length<1000){
                if(Math.random()<Allenemies.W7.getSpawnRate()){
                    this.enemies.push(new Allenemies.W7(canvas,player))
                }
                if(Math.random()<Allenemies.W1.getSpawnRate()){
                    this.enemies.push(new Allenemies.W1(canvas,player))
                }
                if(Math.random()<Allenemies.W8.getSpawnRate()){
                    this.enemies.push(new Allenemies.W8(canvas,player))
                }
                this.enemies.push(new Allenemies.Enemy('./assets/imgs/me.png',1,1,canvas,player))
            }
        },this.time)
        this.updateFreq()
    }
    updateFreq(){
        if(this.Spawner.timer>100){
            this.Spawner.timer = this.timeIni - 300 * (Math.pow(1.1, this.player.level-1) - 1)
            this.Spawner.timer = this.Spawner.timer>=100?this.Spawner.timer:100
        }
        this.Spawner.startSpawn()
    }
}