import { Spawner } from "./Spawner.js";
import Allenemies from "./Allenemies.js";

export class Enemies{
    constructor(canvas,player, global){
        this.enemies=[]
        this.timeIni=2250
        this.time=this.timeIni
        this.player = player
        this.global = global
        this.Spawner= new Spawner(()=>{
            if(this.enemies.length<1000){
                if(player.level>0&&Math.random()<Allenemies.W7.getSpawnRate()){
                    this.enemies.push(new Allenemies.W7(canvas, player, global))
                }
                if(player.level>0&&Math.random()<Allenemies.W11.getSpawnRate()){
                    this.enemies.push(new Allenemies.W11(canvas, player, global))
                }
                if(player.level>2&&Math.random()<Allenemies.W1.getSpawnRate()){
                    this.enemies.push(new Allenemies.W1(canvas, player, global))
                }
                if(player.level>0&&Math.random()<Allenemies.W8.getSpawnRate()){
                    this.enemies.push(new Allenemies.W8(canvas, player, global))
                }
                if(player.level>0&&Math.random()<Allenemies.WVista.getSpawnRate()){
                    this.enemies.push(new Allenemies.WVista(canvas, player, global))
                }
                this.enemies.push(new Allenemies.Enemy('./assets/imgs/me.png',1,1,canvas, player, global))
            }
        },this.time)
        this.updateFreq()
    }
    updateFreq(){
        this.Spawner.clearSpawn()
        if(this.Spawner.timer>100){
            this.Spawner.timer = this.timeIni - 300 * (Math.pow(1.2, this.player.level-1) - 1)
            this.Spawner.timer = this.Spawner.timer>=100?this.Spawner.timer:100
        }
        this.Spawner.startSpawn()
    }
    verifyEnemies(){
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const element = this.enemies[i]
            if(element.life<=0){
                this.player.updateXp(this.enemies[i].value,this)
                this.enemies.splice(i, 1);
                continue
            }
            element.draw()
        }
    }
    clearEnemies(){
        this.enemies=[]
    }
    reset(){
        this.Spawner.clearSpawn()
        this.Spawner.timer=this.timeIni
        this.time=this.timeIni
        for (const item of this.enemies) {
            if(item.name == 'W11'){
                clearInterval(item.loop)
            }
        }
        this.clearEnemies()
    }
    initialize(){
        this.Spawner.startSpawn()
    }
}