import { Enemy } from "./Enemy.js";
export class W8 extends Enemy {
    static spawnRate = .2
    constructor(canvas, player, global) {
        const src = './assets/imgs/windows8.png';
        const rows = 1;
        const columns = 1;
        super(src, rows, columns, canvas, player, global);
        this.speed = 7;
        this.lifeTotal = .5;
        this.life = this.lifeTotal;
        this.damage=2
        this.scale = 0.5;
        this.value=5
        this.name='W8'
    }
}