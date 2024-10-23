import { Enemy } from "./Enemy.js";
export class WVista extends Enemy {
    static spawnRate = .1
    constructor(canvas, player) {
        const src = './assets/imgs/wVista.png';
        const rows = 1;
        const columns = 1;
        super(src, rows, columns, canvas, player);
        this.speed = 0;
        this.lifeTotal = 5;
        this.life = this.lifeTotal;
        this.scale = 2;
        this.value = 60;
        this.name = 'WVista';
        this.rotationSpeed = 0;
        this.unDash = this.unDash.bind(this);
        this.dash = this.dash.bind(this);
        this.unDash();
        this.timer=setInterval(()=>{
            this.rotationSpeed+=1
        },10)
    }
    
    dash() {
        this.speed = 60;
        this.rotationSpeed = 0;
        clearInterval(this.timer)
        setTimeout(this.unDash, 125);
    }
    
    unDash() {
        this.speed = 0;
        this.timer=setInterval(()=>{
            this.rotationSpeed+=1
        },200)
        setTimeout(this.dash, 3500);
    }
    #updateAngle(){
        this.angle = (this.angle+Math.PI/180*this.rotationSpeed)%(Math.PI*2)
    }
    #move(){
        this.pos.x += Math.cos(Math.atan2(this.player.pos.y-(this.pos.y), this.player.pos.x-(this.pos.x))) * this.speed  
        this.pos.y += Math.sin(Math.atan2(this.player.pos.y-(this.pos.y), this.player.pos.x-(this.pos.x))) * this.speed  
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
}