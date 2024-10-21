import { AnimatedObject } from "./AnimatedObject.js";
import { CollisionShape } from "./CollisionShape.js";
import { LifeBar } from "./LifeBar.js";
import { Linux } from "./linux.js";


export class Player extends AnimatedObject{
    #score
    #ready
    constructor(src, rows, columns, pos, canvas){
        super(src, rows,  columns)
        this.playerAnima
        this.pos=pos
        this.CollisionShape = new CollisionShape(canvas,this.pos.x,this.pos.y,this.wSprite*this.scale,this.hSprite*this.scale)
        this.angle=0
        this.left=0
        this.right=0
        this.top=0
        this.bottom=0
        this.speed=8
        this.lifeTotal=40
        this.life=this.lifeTotal
        this.LifeBar = new LifeBar(canvas)
        this.LifeBar.text='HP'
        this.xpBar = new LifeBar(canvas)
        this.xpBar.text='XP'
        this.damage=1
        this.level=1
        this.xp=0
        this.filtros = [1,0,1]
        this.xpTotal=256*this.level
        this.invincibility=false
        this.username='Narci'
        this.#score = 0
        this.bullets = []
        this.canvas=canvas
        this.#ready=true
        this.ctx=this.canvas.getContext('2d')
    }
    #move(){
        this.pos.x+=this.speed*this.right-this.speed*this.left
        this.pos.y+=this.speed*this.bottom-this.speed*this.top
    }
    draw(mousePos,rotation){
        this.#move()
        this.angle=Math.atan2(mousePos.x-(this.pos.x), mousePos.y-(this.pos.y))*-1+Math.PI/180
        this.CollisionShape.update(this.pos.x,this.pos.y,this.wSprite*this.scale/1.5,this.hSprite*this.scale/1.5,Math.atan2(mousePos.x-(this.pos.x), mousePos.y-(this.pos.y))*-1+Math.PI/180)
        this.CollisionShape.draw(this.ctx, '#0f0')
        this.ctx.beginPath();
        this.ctx.font =`25px sans-serif`
        this.ctx.fillStyle='#fff'
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'bottom'
        this.ctx.fillText(this.username,this.pos.x,this.pos.y+this.hSprite/-2*this.scale)
        this.ctx.save()
        this.ctx.filter = `brightness(${this.filtros[0]}) sepia(${this.filtros[1]}) opacity(${this.filtros[2]})`
        this.ctx.translate(this.pos.x,this.pos.y)
        this.ctx.rotate(this.angle)
        this.ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.wSprite/-2*this.scale,this.hSprite/-2*this.scale,this.wSprite*this.scale,this.hSprite*this.scale)
        this.ctx.restore()
        this.ctx.save()
        if(rotation!=0){
            this.ctx.translate(this.pos.x+this.wSprite/2,this.pos.y+this.hSprite/2)
            this.ctx.rotate(-rotation)
            this.ctx.translate(-this.pos.x-this.wSprite/2,-this.pos.y-this.hSprite/2)
        }
        this.LifeBar.draw(5+this.canvas.width/6,35+5,this.canvas.width/3,50,1,this.life,this.lifeTotal)
        this.xpBar.draw(5+this.canvas.width/6,35+5+50+5,this.canvas.width/3,50,1,this.xp,this.xpTotal,50,20,['#444','#000','#09f'])
        this.ctx.restore()
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
    tomarDano(damage){
        if(!this.invincibility){
            this.life-=damage
            this.life=this.life<0?0:this.life
            this.invincibility=true
            this.filtros=[10,1,1]
            setTimeout(()=>{
                this.filtros=[1,0,.5]
            },25)
            setTimeout(()=>{
                this.filtros=[1,0,1]
                this.invincibility=false
            },125)
        }
    }
    updateXp(value,Spawner){
        this.xp+=value
        this.#score+=value/5
        while(this.xp>=this.xpTotal){
            this.xp=this.xp-this.xpTotal
            this.level++
            this.xpTotal=175*Math.pow(1.15,this.level)
            this.life=this.life/this.lifeTotal<.25?this.lifeTotal/4:this.life
            Spawner.updateFreq()
        }

    }
    getScore(){
        return this.#score
    }
    resetScore(){
        this.#score=0
    }
    shoot(mousePos){
        if(this.#ready){
            this.bullets.push(new Linux(this.canvas,'./assets/imgs/linux.png', 1, 1, mousePos, this))
            this.bullets[this.bullets.length-1].scale=.3
            clearInterval(this.playerAnima)
            this.setRow(1)
            this.playerAnima = setInterval(()=>{
                this.translateColumn(1)
                if(this.column==this.columns-1){
                    this.setRow(0)
                    clearInterval(this.playerAnima)
                    this.playerAnima = setInterval(()=>{
                        this.translateColumn(1)
                    },200) 
                }
            },200/9) 
        }
    }
    verifyBullets(SpawnerEnemies){
        for (let i = this.bullets.length - 1; i >= 0; i--) {
        
            const element = this.bullets[i];
            element.draw(this.ctx);
            for (let j = 0; j<SpawnerEnemies.enemies.length; j++) {
                const element2=SpawnerEnemies.enemies[j]
                if(element.CollisionShape.verifyCollision(element2.pos.x,element2.pos.y,element2.wSprite*element2.scale,element2.hSprite*element2.scale,element2.angle)&&!element.enemies.includes(element2)){
                    element2.takeDamage(element2,element,SpawnerEnemies)
                    element.life--;
                    element.enemies.push(element2)
                    if(element.life<=0){
                        break
                    }
                }
            }
    
            if (!element.isOnScreen(this.canvas)||element.life<=0) {
                this.bullets.splice(i, 1);
            }
        }
    }
    verifyPlayerCollide(SpawnerEnemies){
        if(!this.invincibility){
            for (let j = 0; j<SpawnerEnemies.enemies.length; j++) {
                const element=SpawnerEnemies.enemies[j]
                if(this.CollisionShape.verifyCollision(element.pos.x,element.pos.y,element.wSprite*element.scale,element.hSprite*element.scale,element.angle)){
                    element.takeDamage(element,this,SpawnerEnemies)
                    this.tomarDano(element.damage);
                    return true
                }
            }
        }
        return false
    }
    resetLevel(){
        this.level=1
        this.xp=0
        this.xpTotal=256*this.level
    }
    resetLife(){
        this.lifeTotal=40
        this.life=this.lifeTotal
    }
    reset(){
        this.resetLevel()
        this.resetLife()
        this.resetScore()
        clearInterval(this.playerAnima)
        this.#ready=false
        this.bullets=[]
    }
    initialize(){
        this.#ready=true
        this.playerAnima = setInterval(()=>{
            this.translateColumn(1)
        },200) 
    }
    
}

