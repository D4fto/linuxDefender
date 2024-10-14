export class LifeBar{
    draw(ctx,x,y,width,height,scale,life,lifeTotal,param1=50,param2=20,colors=['#444','#000','#0f0']){
        ctx.beginPath();
        ctx.fillStyle=colors[0]
        ctx.fillRect(x-width*scale/2,y-height*scale/2-10,width*scale,Math.floor(scale*50))
        ctx.beginPath();
        ctx.fillStyle=colors[1]
        ctx.fillRect(x-width*scale/2+Math.floor(scale*param2/2),y-height*scale/2-10+Math.floor(scale*param2/2),width*scale-Math.floor(scale*param2),Math.floor(scale*param1)-Math.floor(scale*param2))
        ctx.beginPath();
        ctx.fillStyle=colors[2]
        ctx.fillRect(x-width*scale/2+Math.floor(scale*param2/2),y-height*scale/2-10+Math.floor(scale*param2/2),(width*scale-Math.floor(scale*param2))*(life/lifeTotal),Math.floor(scale*param1)-Math.floor(scale*param2))
    }
}