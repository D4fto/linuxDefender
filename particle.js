import { AnimatedObject } from "./AnimatedObject.js";

export class Particle extends AnimatedObject{
    constructor(src, rows, columns, time, scale, x, y, layer, global, ctx, angle, speed, opacity){
        super(src, rows, columns)
        global.particles['layer'+layer].push(this)
        this.time = time
        this.scale = scale
        this.pos = {
            x: x,
            y: y
        }
        this.angle = angle
        this.speed=speed
        this.life = columns
        this.ctx = ctx
        this.opacity = opacity
        this.interval = setInterval(()=>{
            if(this.life==0){
                clearInterval(this.interval)
            }
            this.translateColumn(1)
            this.life-=1
        },time/columns)
    }
    draw(){
        if(this.life>0){
            this.pos.x += Math.cos(this.angle) * this.speed  
            this.pos.y += Math.sin(this.angle) * this.speed  
            this.ctx.save()
            this.ctx.globalAlpha = this.opacity
            this.ctx.translate(this.pos.x,this.pos.y)
            this.ctx.rotate(this.angle)
            this.ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.wSprite/-2*this.scale,this.hSprite/-2*this.scale,this.wSprite*this.scale,this.hSprite*this.scale)
            this.ctx.restore()

        }
    }
}