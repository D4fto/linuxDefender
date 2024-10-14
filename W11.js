import { AnimatedObject } from "./animatedObject.js";
import { CollisionShape } from "./CollisionShape.js";
import { LifeBar } from "./LifeBar.js";

export class W11 extends AnimatedObject{
    constructor(src, rows, columns, canvas, player, life=1){
        super(src, rows,  columns)
        this.pos={
            x: Math.random() >= 0.5?Math.floor(Math.random()*(canvas.width*10)+canvas.width):Math.floor(Math.random()*(-canvas.width*10)),
            y: Math.random() >= 0.5?Math.floor(Math.random()*(canvas.height*10)+canvas.height):Math.floor(Math.random()*(-canvas.height*10)),
        }
        this.player = player
        this.speed = 1
        this.angle=0
        this.CollisionShape = new CollisionShape(this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale,this.angle)
        this.lifeTotal=life
        this.life=life
        this.damage=1
        this.LifeBar = new LifeBar()
    }

    #updateAngle(){
        this.angle = Math.atan2(this.player.pos.y-(this.pos.y), this.player.pos.x-(this.pos.x))
    }
    #move(){
        this.pos.x += Math.cos(this.angle) * this.speed  
        this.pos.y += Math.sin(this.angle) * this.speed  
    }
    draw(ctx){
        this.#updateAngle()
        this.#move()
        this.CollisionShape.update(this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale,this.angle)
        this.CollisionShape.draw(ctx, '#f00')
        ctx.beginPath();
        ctx.save()
        ctx.translate(this.pos.x,this.pos.y)
        ctx.rotate(this.angle)
        ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.wSprite/-2*this.scale,this.hSprite/-2*this.scale,this.wSprite*this.scale,this.hSprite*this.scale)
        ctx.restore()
        if(this.life/this.lifeTotal<1&&this.life/this.lifeTotal>0){
            this.LifeBar.draw(ctx,this.pos.x,this.pos.y,this.wSprite,this.hSprite,this.scale,this.life,this.lifeTotal)
        }

    }
}