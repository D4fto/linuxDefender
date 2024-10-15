import { AnimatedObject } from "./AnimatedObject.js";
import { CollisionShape } from "./CollisionShape.js";


export class Linux extends AnimatedObject{
    constructor(src, rows, columns, mousePos, player){
        super(src, rows,  columns)
        this.angle = Math.atan2(mousePos.x-(player.pos.x), mousePos.y-(player.pos.y))*-1+Math.PI/180*90
        this.pos = {x: player.pos.x, y: player.pos.y}
        this.speed = 15
        this.life=4
        this.damage = 1
        this.enemies=[]
        this.CollisionShape = new CollisionShape(this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale)
    }
    #move(){
        this.pos.x += Math.cos(this.angle) * this.speed  
        this.pos.y += Math.sin(this.angle) * this.speed  
    }
    draw(ctx){
        this.#move()
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