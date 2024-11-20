import { AnimatedObject } from "./AnimatedObject.js";
import { CollisionShape } from "./CollisionShape.js";
import { Particle } from "./particle.js";

export class Linux extends AnimatedObject{
    constructor(canvas,src, rows, columns, mousePos, player, global){
        super(src, rows,  columns)
        this.precision=2
        this.pos = {x: player.pos.x+Math.cos(player.angle)*-7*player.scale, y: player.pos.y+Math.sin(player.angle)*-7*player.scale}
        this.angle = Math.atan2(mousePos.x-(this.pos.x), mousePos.y-(this.pos.y))*-1+Math.PI/180*(Math.random()*((90+this.precision)-(90-this.precision))+(90-this.precision))
        this.speed = 40
        this.life=3
        this.damage = 1
        this.global = global
        this.enemies=[]
        this.canvas=canvas
        this.ctx=this.canvas.getContext('2d')
        this.CollisionShape = new CollisionShape(canvas,this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale)
    }
    #move(){
        this.pos.x += Math.cos(this.angle) * this.speed  
        this.pos.y += Math.sin(this.angle) * this.speed  
    }
    draw(ctx){
        this.#move()
        // for (let i = 0; i < 3; i++) {
        //     new Particle('./assets/imgs/boooom.png',1,9,150,this.scale*2,this.pos.x,this.pos.y,2,this.global,this.ctx, this.angle+Math.PI+Math.PI/180*Math.floor(Math.random() * (20 + 20) - 20), 10+Math.floor(Math.random() * (5 + 5) - 5),.5)
        // }
        this.CollisionShape.update(this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale/1.5,this.angle)
        this.CollisionShape.draw(ctx, '#0f0')
        ctx.beginPath();
        ctx.save()
        ctx.translate(this.pos.x,this.pos.y)
        ctx.rotate(this.angle+Math.PI/180*90)
        ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.wSprite/-2*this.scale,this.hSprite/-2*this.scale,this.wSprite*this.scale,this.hSprite*this.scale)
        ctx.restore()
    }
    isOnScreen(canvas){
        if(this.pos.x<this.wSprite/-2*this.scale||this.pos.x>canvas.width+this.wSprite/2*this.scale||this.pos.y<this.hSprite/-2*this.scale||this.pos.y>canvas.height+this.hSprite/2*this.scale){
            return false
        }
        return true
    }
}
