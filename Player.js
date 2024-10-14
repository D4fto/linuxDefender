import { AnimatedObject } from "./animatedObject.js";
import { CollisionShape } from "./CollisionShape.js";

export class Player extends AnimatedObject{
    constructor(src, rows, columns, pos){
        super(src, rows,  columns)
        this.playerAnima = setInterval(()=>{
            this.translateColumn(1)
        },200) 
        this.pos=pos
        this.CollisionShape = new CollisionShape(this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale)
        this.left=0
        this.right=0
        this.top=0
        this.bottom=0
        this.speed=3
    }
    #move(){
        this.pos.x+=this.speed*this.right-this.speed*this.left
        this.pos.y+=this.speed*this.bottom-this.speed*this.top
    }
    draw(ctx, mousePos){
        this.#move()
        this.CollisionShape.update(this.pos.x,this.pos.y,this.wSprite*this.scale/1.5,this.hSprite*this.scale/1.5,Math.atan2(mousePos.x-(this.pos.x), mousePos.y-(this.pos.y))*-1+Math.PI/180)
        this.CollisionShape.draw(ctx, '#0f0')
        ctx.beginPath();
        ctx.save()
        ctx.translate(this.pos.x,this.pos.y)
        ctx.rotate(Math.atan2(mousePos.x-(this.pos.x), mousePos.y-(this.pos.y))*-1+Math.PI/180)
        ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.wSprite/-2*this.scale,this.hSprite/-2*this.scale,this.wSprite*this.scale,this.hSprite*this.scale)
        ctx.restore()
    }
    verifyMovement(event,press){
        if(event.keyCode===65){
            if(press){
                this.left=1
                return
            }
            this.left=0
        }
        if(event.keyCode===68){
            if(press){
                this.right=1
                return
            }
            this.right=0
        }
        if(event.keyCode===87){
            if(press){
                this.top=1
                return
            }
            this.top=0
        }
        if(event.keyCode===83){
            if(press){
                this.bottom=1
                return
            }
            this.bottom=0
        }
    }
}