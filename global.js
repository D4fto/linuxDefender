import { Particle } from "./particle.js"
export class Global{
    constructor(){
        this.damageCounts=[]
        this.rams=[]
        this.globalVolume = 1
        this.particles = {
            layer1: [],
            layer2: []
        }
    }

    playSound(src) {
        const audio = new Audio(src);
        audio.volume = this.globalVolume
        audio.play();
    }

    drawDamageCounts(){
        for (let i = 0; i < this.damageCounts.length; i++) {
            const element = this.damageCounts[i];
            element.draw()
            if(!element.alive){
                this.damageCounts.splice(i, 1);
            }
            
        }
    }
    drawRams(player){
        let foi = false
        for (let i = 0; i < this.rams.length; i++) {
            const element = this.rams[i];
            element.draw()
            if(element.CollisionShape.verifyCollision(player.pos.x,player.pos.y,player.wSprite*player.scale,player.hSprite*player.scale,player.angle)){
                player.tomarDano(element.damage);
                foi = true
                this.playSound('/assets/sounds/ramBreaking.mp3')
                new Particle('./assets/imgs/boooomRAM.png',1,9,500,element.scale*2,element.pos.x,element.pos.y,2,element.global,element.ctx, Math.PI/180*Math.floor(Math.random() * (360)), 0)
                this.rams.splice(i, 1);
            }
            for (const element2 of player.bullets) {
                if(element.CollisionShape.verifyCollision(element2.pos.x,element2.pos.y,element2.wSprite*element2.scale,element2.hSprite*element2.scale,element2.angle)){
                    element2.life--
                    this.playSound('/assets/sounds/ramBreaking.mp3')
                    new Particle('./assets/imgs/boooomRAM.png',1,9,500,element.scale*2,element.pos.x,element.pos.y,2,element.global,element.ctx, Math.PI/180*Math.floor(Math.random() * (360)), 0)
                    this.rams.splice(i, 1);
                }
            }
            if(!element.alive){
                this.rams.splice(i, 1);
            }
            
        }
        return foi
    }

}