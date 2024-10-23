export class Button{
    constructor(ctx, x, y, width, height, text, backgroundColor='#0f0', color='#000', border=[5,'#000']){
        this.ctx = ctx
        this.x = x
        this.y = y 
        this.height = height
        this.width = width
        this.text = text
        this.backgroundColor = backgroundColor
        this.color = color
        this.border = border
        this.isHovered = false
    }
    draw(x, y, width, height){
        this.x=x
        this.y=y
        this.width=width
        this.height=height
        this.ctx.beginPath()
        if(this.isHovered){
            this.ctx.filter = `brightness(.75)`
        }
        else{
            this.ctx.filter = `brightness(1)`
        }
        this.ctx.fillStyle = this.border[1]
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.fillStyle = this.backgroundColor
        this.ctx.fillRect(this.x+this.border[0], this.y+this.border[0], this.width-this.border[0]*2, this.height-this.border[0]*2)
        this.ctx.fillStyle = this.color
        this.ctx.font = `${(this.height-this.border[0]*2)*.75}px PixelFont`
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(this.text,this.x+this.width/2,this.y+this.height/2-5,this.width-this.border[0]*2-5)
        this.ctx.filter = `brightness(1)`
    }
    varifyHover(mouseX, mouseY) {
        this.isHovered = mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
    }
    isClicked(mouseX, mouseY) {
        return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
    }
}