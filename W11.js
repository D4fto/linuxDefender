import { Enemy } from "./Enemy.js";
import { Ram } from "./ram.js";
export class W11 extends Enemy {
    static spawnRate = .1
    constructor(canvas, player, global) {
        const src = './assets/imgs/w11.png';
        const rows = 1;
        const columns = 1;
        super(src, rows, columns, canvas, player, global);
        this.speed = 3;
        this.lifeTotal = 10;
        this.life = this.lifeTotal;
        this.scale = 1;
        this.value=120
        this.name='W11'
        this.loop = setInterval(()=>{
            this.#shoot()
        },850)
    }
    #shoot(){
        this.global.rams.push(new Ram(this.canvas,this.pos,this.angle))
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
            clearInterval(this.loop)
        }
        return {header: this.name}
    }
}