import { AnimatedObject } from "./AnimatedObject.js";
import { CollisionShape } from "./CollisionShape.js";
import { LifeBar } from "./LifeBar.js";

export class Enemy extends AnimatedObject{
    static spawnRate = 1
    constructor(src, rows, columns, canvas, player){
        super(src, rows,  columns)
        this.dist=1000
        if(Math.random()>=0.5){
            this.pos={
                x: Math.floor(Math.random()*(canvas.width+this.dist*2))-this.dist,
                y: Math.random() >= 0.5?canvas.height+this.dist:-this.dist,
            }
        }
        else{
            this.pos={
                x: Math.random() >= 0.5?canvas.width+this.dist:-this.dist,
                y: Math.floor(Math.random()*(canvas.height+this.dist*2))-this.dist,
            }

        }
        this.player = player
        this.speed = 1
        this.angle=0
        this.CollisionShape = new CollisionShape(this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale,this.angle)
        this.lifeTotal=2
        this.life=this.lifeTotal
        this.damage=1
        this.LifeBar = new LifeBar()
        this.scale=.1
        this.value=20
        this.name='Wme'
        this.invincibility=false
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
    mudarVida(value){
        this.life+=value
        if(this.life>this.lifeTotal){
            this.life=this.lifeTotal
        }
        if(this.life<0){
            this.life=0
        }
        return {header: this.name}
    }
    static getSpawnRate(){
        return this.spawnRate
    }
}