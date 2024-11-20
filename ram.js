import { AnimatedObject } from "./AnimatedObject.js"
import { CollisionShape } from "./CollisionShape.js";

export class Ram extends AnimatedObject{
    constructor(canvas, pos, angle, global) {
        const src = './assets/imgs/ram.png';
        const rows = 1;
        const columns = 1;
        super(src, rows, columns);
        this.pos = {
            x: pos.x,
            y: pos.y
        }
        this.global = global
        this.angle = angle
        this.speed = 25
        this.alive = true
        this.scale = 1
        this.damage=.5
        setTimeout(()=>{
            this.alive = false
        },1000)
        this.ctx=canvas.getContext('2d')
        this.CollisionShape = new CollisionShape(canvas,this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale)
    }
    #move(){
        this.pos.x += Math.cos(this.angle) * this.speed  
        this.pos.y += Math.sin(this.angle) * this.speed  
    }
    draw(){
        this.#move()
        this.CollisionShape.update(this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale/1.5,this.angle)
        this.CollisionShape.draw(this.ctx, '#0f0')
        this.ctx.beginPath();
        this.ctx.save()
        this.ctx.translate(this.pos.x,this.pos.y)
        this.ctx.rotate(this.angle+Math.PI)
        this.ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.wSprite/-2*this.scale,this.hSprite/-2*this.scale,this.wSprite*this.scale,this.hSprite*this.scale)
        this.ctx.restore()
    }
}