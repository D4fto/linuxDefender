import { Player } from "./player.js";
import { Linux } from "./linux.js";
import { Enemy } from "./Enemy.js";
import { W7 } from "./W7.js";
import { Enemies } from "./Enemies.js";


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
let mouseImage = new Image()
mouseImage.src='./assets/imgs/mouse.png'
ctx.imageSmoothingEnabled = false;
canvas.height=window.innerHeight
canvas.width=window.innerWidth

const player = new Player('./assets/imgs/narci.png', 1, 9, {x: canvas.width/2, y:canvas.height/2})
player.scale = 3

let linuxs = []

let SpawnerEnemies = new Enemies(canvas,player)

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
    // ctx.scale(.1,.1)
    // ctx.translate(canvas.width*5,canvas.height*5)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    for (let i = linuxs.length - 1; i >= 0; i--) {
        
        const element = linuxs[i];
        element.draw(ctx);
        for (let j = 0; j<SpawnerEnemies.enemies.length; j++) {
            const element2=SpawnerEnemies.enemies[j]
            if(element.CollisionShape.verifyCollision(element2.pos.x,element2.pos.y,element2.wSprite*element2.scale,element2.hSprite*element2.scale,element2.angle)&&!element.enemies.includes(element2)){
                const enemy = element2.mudarVida(-player.damage,canvas,player);
                if(enemy.header=='W1Spawn'){
                    for (const element3 of enemy.enemies) {
                        SpawnerEnemies.enemies.push(element3)
                    }
                }
                element.life-=element2.damage;
                element.enemies.push(element2)
                if(element.life<=0){
                    break
                }
            }
        }

        if (!element.isOnScreen(canvas)||element.life<=0) {
            linuxs.splice(i, 1);
        }
    }
    if(!player.invincibility){
        for (let j = 0; j<SpawnerEnemies.enemies.length; j++) {
            const element2=SpawnerEnemies.enemies[j]
            if(player.CollisionShape.verifyCollision(element2.pos.x,element2.pos.y,element2.wSprite*element2.scale,element2.hSprite*element2.scale,element2.angle)){
                const enemy = element2.mudarVida(-player.damage,canvas,player);
                if(enemy.header=='W1Spawn'){
                    for (const element3 of enemy.enemies) {
                        SpawnerEnemies.enemies.push(element3)
                    }
                }
                player.tomarDano(element2.damage);
            }
        }
    }
    for (let i = SpawnerEnemies.enemies.length - 1; i >= 0; i--) {
        const element = SpawnerEnemies.enemies[i]
        if(element.life<=0){
            player.updateXp(SpawnerEnemies.enemies[i].value,SpawnerEnemies)

            SpawnerEnemies.enemies.splice(i, 1);
            continue
        }
        element.draw(ctx)
    }
    player.draw(ctx, mousePos,canvas)
    ctx.beginPath();
    ctx.fillStyle = '#00f';
    ctx.drawImage(mouseImage,mousePos.x-mouseImage.width/2, mousePos.y-mouseImage.height/2);
    ctx.fill();
    // ctx.translate(-canvas.width*5,-canvas.height*5)
    // ctx.scale(10,10)
    loop = window.requestAnimationFrame(main)
}
main()


ctx.imageSmoothingEnabled = false;
window.addEventListener('resize',()=>{
    canvas.height=window.innerHeight
    canvas.width=window.innerWidth
    ctx.imageSmoothingEnabled = false;
})
