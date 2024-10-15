import { Enemy } from "./Enemy.js";
export class W7 extends Enemy {
    static spawnRate = .01
    constructor(canvas, player) {
        const src = './assets/imgs/Windows7.png';
        const rows = 1;
        const columns = 1;
        super(src, rows, columns, canvas, player);
        this.speed = .4;
        this.lifeTotal = 50;
        this.life = this.lifeTotal;
        this.scale = 0.6;
        this.value=250
        this.name='W7'
    }
}