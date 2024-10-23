export class LifeBar{
    text=''
    constructor(canvas){
        this.canvas=canvas
        this.ctx=this.canvas.getContext('2d')
    }
    draw(x,y,width,height,scale,life,lifeTotal,param1=50,param2=20,colors=['#444','#000','#0f0']){
        this.ctx.beginPath();
        this.ctx.fillStyle=colors[0]
        this.ctx.fillRect(x-width*scale/2,y-height*scale/2-10,width*scale,Math.floor(scale*50))
        this.ctx.beginPath();
        this.ctx.fillStyle=colors[1]
        this.ctx.fillRect(x-width*scale/2+Math.floor(scale*param2/2),y-height*scale/2-10+Math.floor(scale*param2/2),width*scale-Math.floor(scale*param2),Math.floor(scale*param1)-Math.floor(scale*param2))
        this.ctx.beginPath();
        this.ctx.fillStyle=colors[2]
        this.ctx.fillRect(x-width*scale/2+Math.floor(scale*param2/2),y-height*scale/2-10+Math.floor(scale*param2/2),(width*scale-Math.floor(scale*param2))*(life/lifeTotal),Math.floor(scale*param1)-Math.floor(scale*param2))
        if(this.text!=''){
            this.ctx.font =`${(Math.floor(scale*param1)-Math.floor(scale*param2))*.75}px PixelFont`
            this.ctx.fillStyle='#fff'
            this.ctx.textAlign = 'right'
            this.ctx.textBaseline = 'middle'
            this.ctx.fillText(this.text,(x-width*scale/2+Math.floor(scale*param2/2))+(width*scale-Math.floor(scale*param2))-5,((Math.floor(scale*param1)*.5-Math.floor(scale*param2)*.5))+(y-height*scale/2-10+Math.floor(scale*param2/2)))
        }
    }
}