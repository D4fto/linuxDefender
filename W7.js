import { Enemy } from "./Enemy.js";
export class W7 extends Enemy {
    static spawnRate = .01
    constructor(canvas, player, global) {
        const src = './assets/imgs/Windows7.png';
        const rows = 1;
        const columns = 1;
        super(src, rows, columns, canvas, player, global);
        this.speed = 1;
        this.lifeTotal = 50;
        this.life = this.lifeTotal;
        this.scale = 7;
        this.value=250
        this.name='W7'
    }
}