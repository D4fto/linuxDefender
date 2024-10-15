import { AnimatedObject } from "./AnimatedObject.js";
import { CollisionShape } from "./CollisionShape.js";
import { LifeBar } from "./LifeBar.js";


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
        this.speed=5
        this.lifeTotal=40
        this.life=this.lifeTotal
        this.LifeBar = new LifeBar()
        this.xpBar = new LifeBar()
        this.damage=1
        this.level=1
        this.xp=0
        this.filtros = [1,0,1]
        this.xpTotal=256*this.level
        this.invincibility=false
    }
    #move(){
        this.pos.x+=this.speed*this.right-this.speed*this.left
        this.pos.y+=this.speed*this.bottom-this.speed*this.top
    }
    draw(ctx, mousePos,canvas){
        this.#move()
        this.CollisionShape.update(this.pos.x,this.pos.y,this.wSprite*this.scale/1.5,this.hSprite*this.scale/1.5,Math.atan2(mousePos.x-(this.pos.x), mousePos.y-(this.pos.y))*-1+Math.PI/180)
        this.CollisionShape.draw(ctx, '#0f0')
        
        ctx.beginPath();
        ctx.save()
        ctx.filter = `brightness(${this.filtros[0]}) sepia(${this.filtros[1]}) opacity(${this.filtros[2]})`;
        ctx.translate(this.pos.x,this.pos.y)
        ctx.rotate(Math.atan2(mousePos.x-(this.pos.x), mousePos.y-(this.pos.y))*-1+Math.PI/180)
        ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.wSprite/-2*this.scale,this.hSprite/-2*this.scale,this.wSprite*this.scale,this.hSprite*this.scale)
        ctx.restore()
        this.LifeBar.draw(ctx,5+canvas.width/6,35+5,canvas.width/3,50,1,this.life,this.lifeTotal)
        this.xpBar.draw(ctx,5+canvas.width/6,35+5+50+5,canvas.width/3,50,1,this.xp,this.xpTotal,50,20,['#444','#000','#09f'])
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
        while(this.xp>=this.xpTotal){
            this.xp=this.xp-this.xpTotal
            this.level++
            this.xpTotal=175*Math.pow(1.15,this.level)
            this.life=this.life/this.lifeTotal<.25?this.lifeTotal/4:this.life
            Spawner.updateFreq()
        }

    }
}