export class Global{
    constructor(){
        this.damageCounts=[]
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

}