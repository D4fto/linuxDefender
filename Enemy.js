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
        this.speed = 2
        this.angle=0
        this.CollisionShape = new CollisionShape(canvas,this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale,this.angle)
        this.lifeTotal=2
        this.life=this.lifeTotal
        this.damage=1
        this.LifeBar = new LifeBar(canvas)
        this.scale=1
        this.value=20
        this.name='Wme'
        this.canvas=canvas
        this.ctx=this.canvas.getContext('2d')
        this.invincibility=false
    }

    #updateAngle(){
        this.angle = Math.atan2(this.player.pos.y-(this.pos.y), this.player.pos.x-(this.pos.x))
    }
    #move(){
        this.pos.x += Math.cos(this.angle) * this.speed  
        this.pos.y += Math.sin(this.angle) * this.speed  
    }
    draw(){
        this.#updateAngle()
        this.#move()
        this.CollisionShape.update(this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale,this.angle)
        this.CollisionShape.draw(this.ctx, '#f00')
        this.ctx.beginPath();
        this.ctx.save()
        this.ctx.translate(this.pos.x,this.pos.y)
        this.ctx.rotate(this.angle)
        this.ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.wSprite/-2*this.scale,this.hSprite/-2*this.scale,this.wSprite*this.scale,this.hSprite*this.scale)
        this.ctx.restore()
        if(this.life/this.lifeTotal<1&&this.life/this.lifeTotal>0){
            this.LifeBar.draw(this.pos.x,this.pos.y-this.scale*40,this.wSprite*4,this.hSprite,this.scale/4,this.life,this.lifeTotal)
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
    takeDamage(element, font, SpawnerEnemies){
        const enemy = element.mudarVida(-font.damage,this.canvas,this);
        if(enemy.header=='W1Spawn'){
            element.spawn(enemy,SpawnerEnemies)
        }
    }
}