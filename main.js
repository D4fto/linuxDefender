import { Player } from "./player.js";
import { Linux } from "./linux.js";
import { W11 } from "./W11.js";

const canvas = document.getElementById('lol')
const ctx = canvas.getContext('2d')

let loop

let mousePos = {
    x: 0,
    y: 0
}

canvas.addEventListener('mousemove', function(event) {
    mousePos.x = event.offsetX
    mousePos.y = event.offsetY
});

ctx.imageSmoothingEnabled = false;

const player = new Player('./assets/imgs/narci.png', 1, 9, {x: canvas.width/2, y:canvas.height/2})
player.scale = 3

let linuxs = []
let enemies = []
for(let i = 0; i<3;i++){
    let tempEnemy
    tempEnemy = new W11('./assets/imgs/me.png',1,1,canvas,player)
    tempEnemy.scale = .1
    if(i==0){
        tempEnemy.pos={
            x:500,
            y:-800
        }
    }
    if(i==1){
        tempEnemy.pos={
            x:900,
            y:canvas.height+1500
        }
    }
    if(i==2){
        tempEnemy.pos={
            x:-2500,
            y:canvas.height/2
        }
    }
    enemies.push(tempEnemy)
}
let w11Spanwner = setInterval(()=>{
    let tempEnemy = new W11('./assets/imgs/me.png',1,1,canvas,player)
    tempEnemy.scale = .1
    console.log(Math.random())
    enemies.push(tempEnemy)
    if(Math.random()<0.05){
        tempEnemy=new W11('./assets/imgs/w11.png',1,1,canvas,player,50)
        tempEnemy.speed=.5
        tempEnemy.scale=.75
        enemies.push(tempEnemy)
    }
},1000)


canvas.addEventListener('click',()=>{
if(linuxs.length<15){
    linuxs.push(new Linux('./assets/imgs/linux.png', 1, 1, mousePos, player))
        linuxs[linuxs.length-1].scale=.3
}
})
window.addEventListener('keydown',(event)=>{
    player.verifyMovement(event,true)
})
window.addEventListener('keyup',(event)=>{
    player.verifyMovement(event,false)
})
function main(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    for (let i = linuxs.length - 1; i >= 0; i--) {
        
        const element = linuxs[i];
        element.draw(ctx);
        for (let j = 0; j<enemies.length; j++) {
            const element2=enemies[j]
            if(element.CollisionShape.verifyCollision(element2.pos.x,element2.pos.y,element2.wSprite*element2.scale,element2.hSprite*element2.scale,element2.angle)){
                element2.life-=element.damage;
                element.life-=element2.damage;
            }
        }

        if (!element.isOnScreen(canvas)||element.life<=0) {
            linuxs.splice(i, 1);
        }
    }
    for (let i = enemies.length - 1; i >= 0; i--) {
        const element = enemies[i]
        if(element.life<=0){
            enemies.splice(i, 1);
            continue
        }
        element.draw(ctx)
    }
    player.draw(ctx, mousePos)
    ctx.beginPath();
    ctx.fillStyle = '#00f';
    ctx.arc(mousePos.x, mousePos.y, 5, 0, Math.PI*2,true);
    ctx.fill();

    loop = requestAnimationFrame(main)
}
main()
canvas.height=window.innerHeight
canvas.width=window.innerWidth
ctx.imageSmoothingEnabled = false;
window.addEventListener('resize',()=>{
    canvas.height=window.innerHeight
    canvas.width=window.innerWidth
    ctx.imageSmoothingEnabled = false;
})
// const rect = { x: 150, y: 150, width: 100, height: 50, angle: Math.PI / 4 };
// const circle = { x: 200, y: 200, radius: 30 };

// if (isCollidingRectCircle(rect, circle)) {
//     console.log('Colisão detectada entre retângulo e círculo!');
// } else {
//     console.log('Sem colisão!');
// }