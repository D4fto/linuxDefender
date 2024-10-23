import Allenemies from "./Allenemies.js";
import { Enemy } from "./Enemy.js";
export class W1 extends Enemy {
    static spawnRate = .04
    constructor(canvas, player, global) {
        const src = './assets/imgs/w1.png';
        const rows = 1;
        const columns = 1;
        super(src, rows, columns, canvas, player, global);
        this.speed = 1.2;
        this.lifeTotal = 10;
        this.life = this.lifeTotal;
        this.scale = 1.2;
        this.value=100
        this.name='W1'
    }
    mudarVida(value){
        this.life+=value
        if(value<0){
            this.tomouDano(value)
        }
        if(this.life>this.lifeTotal){
            this.life=this.lifeTotal
        }
        if(this.life<0){
            this.life=0
        }
        if(this.life<=0){
            let tempEnemies=[]
            for(let i = 0;i<10;i++){
                let tempEnemy
                if(Math.random()<Allenemies.W7.getSpawnRate()){
                    tempEnemy = new Allenemies.W7(this.canvas,this.player,this.global)
                    tempEnemy.pos={x: this.pos.x+((Math.random()-0.5)*300), y: this.pos.y+((Math.random()-0.5)*300)}
                    tempEnemies.push(tempEnemy)
                    continue
                
                }
                if(Math.random()<Allenemies.WVista.getSpawnRate()){
                    tempEnemy = new Allenemies.WVista(this.canvas,this.player,this.global)
                    tempEnemy.pos={x: this.pos.x+((Math.random()-0.5)*300), y: this.pos.y+((Math.random()-0.5)*300)}
                    tempEnemies.push(tempEnemy)
                    continue
                
                }
                if(Math.random()<Allenemies.W8.getSpawnRate()){
                    tempEnemy = new Allenemies.W8(this.canvas,this.player,this.global)
                    tempEnemy.pos={x: this.pos.x+((Math.random()-0.5)*300), y: this.pos.y+((Math.random()-0.5)*300)}
                    tempEnemies.push(tempEnemy)
                    continue
                }
                tempEnemy = new Allenemies.Enemy('./assets/imgs/me.png',1,1,this.canvas,this.player,this.global)
                tempEnemy.pos={x: this.pos.x+((Math.random()-0.5)*300), y: this.pos.y+((Math.random()-0.5)*300)}
                tempEnemies.push(tempEnemy)
            }
            return {
                header: 'W1Spawn',
                enemies: tempEnemies
            }
        }
        return {header: this.name}
    }
    spawn(enemy,SpawnerEnemies){
        for (const element of enemy.enemies) {
            SpawnerEnemies.enemies.push(element)
        }
    }
}