import { Player } from "./player.js";
import { Enemies } from "./Enemies.js";
import { Button } from "./Button.js";
 
const canvas = document.getElementById('lol')
const ctx = canvas.getContext('2d')

let loop = null

let mousePos = {
    x: 0,
    y: 0
}


let mouseImage = new Image()
mouseImage.src='./assets/imgs/mouse.png'
ctx.imageSmoothingEnabled = false;
canvas.height=window.innerHeight
canvas.width=window.innerWidth
const botao = new Button(ctx,canvas.width/2-200,canvas.height/2-40,400,80,'Iniciar Jogo')

canvas.addEventListener('mousemove', function(event) {
    mousePos.x = event.offsetX
    mousePos.y = event.offsetY
    botao.varifyHover(event.offsetX,event.offsetY)
});

const player = new Player('./assets/imgs/narci.png', 1, 9, {x: canvas.width/2, y:canvas.height/2},canvas)
player.scale = 3

let level=1
let score = 0
let clickando = false
let SpawnerEnemies = new Enemies(canvas,player)
let isMenu = true
canvas.addEventListener('click',(event)=>{
    if(isMenu){
        if(botao.isClicked(event.offsetX,event.offsetY)){
            stop()
            reset()
            config()
            start(main,60)
        }
    }
})
function config(){
    player.initialize()
    SpawnerEnemies.initialize()
    ctx.imageSmoothingEnabled = false;
    canvas.height=window.innerHeight
    canvas.width=window.innerWidth
    ctx.imageSmoothingEnabled = false;
}
canvas.addEventListener('mousedown',()=>{
    clickando=true
})
canvas.addEventListener('mouseup',()=>{
    clickando=false
})
setInterval(()=>{
    if(clickando){
        player.shoot(mousePos)
    }
},200)
window.addEventListener('keydown',(event)=>{
    player.verifyMovement(event,true)
})
window.addEventListener('keyup',(event)=>{
    player.verifyMovement(event,false)
})
function mouse(){
    ctx.beginPath();
    ctx.fillStyle = '#00f';
    ctx.drawImage(mouseImage,mousePos.x-mouseImage.width/2, mousePos.y-mouseImage.height/2);
    ctx.fill();
}
function clear(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
}
function vignette(){
    ctx.beginPath()
    const vignetteGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width / 4,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
    );

    vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
    
    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function main(){
    // ctx.scale(.1,.1)
    // ctx.translate(canvas.width*5,canvas.height*5)
    isMenu=false
    clear()
    SpawnerEnemies.verifyEnemies()
    player.verifyBullets(SpawnerEnemies)
    player.verifyPlayerCollide(SpawnerEnemies)
    player.draw(mousePos)
    vignette()
    mouse()
    drawScoreLevel()
    if(player.life<=0){
        stop()
        score=player.getScore()
        level=player.level
        reset()
        start(menuKill,60)
    }
    // ctx.translate(-canvas.width*5,-canvas.height*5)
    // ctx.scale(10,10)
}
function drawScoreLevel(){
    ctx.beginPath()
    ctx.font ='50px sans-serif'
    ctx.fillStyle='#fff'
    ctx.textBaseline = 'top'
    ctx.textAlign = 'right'
    ctx.fillText(`SCORE: ${player.getScore()}`,canvas.width-10,10)
    ctx.fillText(`LEVEL: ${player.level}`,canvas.width-10,10+10+50)
}
function menu(){
    isMenu=true
    clear()
    vignette()
    botao.draw(canvas.width/2-200,canvas.height/2-40,400,80)
    ctx.beginPath()
    ctx.font ='50px sans-serif'
    ctx.fillStyle='#fff'
    ctx.textBaseline = 'bottom'
    ctx.textAlign = 'center'
    ctx.fillText(`SCORE: ${score}`,canvas.width/2,canvas.height/2-50-10-40)
    ctx.fillText(`LEVEL: ${level}`,canvas.width/2,canvas.height/2-10-40)
    mouse()
}
function menuKill(){
    menu()
}
function start(scene,fps,transicao=true){
    if(transicao){
        let lol = setInterval(()=>{
            ctx.beginPath()
            ctx.fillStyle='#0001'
            ctx.fillRect(0,0,canvas.width,canvas.height)
        },20)
        setTimeout(()=>{
            loop = setInterval(scene,Math.floor(1000/fps))
            clearTimeout(lol)
        },1000)
    }
    else{
        scene()
        loop = setInterval(scene,Math.floor(1000/fps))
    }
}
function stop(){
    clearInterval(loop)
    loop=null
}
function reset(){
    player.reset()
    SpawnerEnemies.reset()
}
stop()
reset()
start(menu,60,false)

ctx.imageSmoothingEnabled = false;
window.addEventListener('resize',()=>{
    canvas.height=window.innerHeight
    canvas.width=window.innerWidth
    ctx.imageSmoothingEnabled = false;
    if(isMenu){
        menu()
    }
    else{
        main()
    }
})
