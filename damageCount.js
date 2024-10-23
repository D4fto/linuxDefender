export class DamageCount{
    constructor(ctx,value,pos,speed,fontSize,color){
        this.ctx=ctx
        this.value=value
        this.alive=true
        this.pos = {
            x: pos[0],
            y: pos[1]
        }
        this.speedx=speed[0]
        this.speedy=speed[1]
        this.fontSizeIni = fontSize
        this.fontSize = this.fontSizeIni
        this.color = color
        this.opacity=1
    }
    #move(){
        this.pos.x+=this.speedx
        this.pos.y+=this.speedy
    }
    draw(){
        this.#move()
        this.fontSize -= this.fontSizeIni*.01
        this.opacity -= .01
        if(this.opacity<=.02){
            this.alive=false
        }
        this.ctx.beginPath()
        this.ctx.save()        
        this.ctx.globalAlpha=this.opacity
        this.ctx.fillStyle = this.color
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.font = `${this.fontSize}px PixelFont`
        this.ctx.fillText(this.value,this.pos.x,this.pos.y)
        this.ctx.strokeStyle = '#000'
        this.ctx.font = `${this.fontSize+2}px PixelFont`
        this.ctx.lineWidth = 2
        this.ctx.strokeText(this.value,this.pos.x,this.pos.y)
        this.ctx.restore()
    }
}