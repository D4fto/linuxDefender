import { Player } from "./player.js";
import { Enemies } from "./Enemies.js";
import { Button } from "./Button.js";
import { Global } from "./global.js";
 
const background = document.getElementById('background')
const canvas = document.getElementById('lol')
const ctx = canvas.getContext('2d')
const divCanvas = document.getElementById('divCanvas')

let global = new Global()

let diagonal = 0

let loop = null

let mousePos = {
    x: 0,
    y: 0
}

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})
 
let mouseImage = new Image()
mouseImage.src='./assets/imgs/mouse.png'
function redimensionar(){
    canvas.height=window.innerHeight
    canvas.width=window.innerWidth
    divCanvas.style.height=window.innerHeight+'px'
    divCanvas.style.width=window.innerWidth+'px'
    diagonal = Math.floor(Math.hypot(canvas.height,canvas.width))
    ctx.imageSmoothingEnabled = false;
    background.style.height=diagonal*3+'px'
    background.style.width=diagonal*3+'px'
    background.style.top=(-diagonal)+'px'
    background.style.left=(-diagonal)+'px'
}
const botao = new Button(ctx,canvas.width/2-200,canvas.height/2-40,400,80,'NOVO JOGO')
const music = new Audio('./assets/sounds/music.mp3')
music.volume = global.globalVolume
music.addEventListener('canplaythrough',()=>{
    music.loop = true;
})
canvas.addEventListener('pointermove', function(event) {
    mousePos.x = event.offsetX
    mousePos.y = event.offsetY
    botao.varifyHover(event.offsetX,event.offsetY)
});
function playMusic() {
    music.play().catch(error => {
        console.error("Erro ao tentar tocar a música:", error);
    });
}

const player = new Player('./assets/imgs/narci.png', 2, 9, {x: canvas.width/2, y:canvas.height/2},canvas, global)
player.scale = 3

let level=1
let score = 0
let clickando = false
let SpawnerEnemies = new Enemies(canvas,player,global)
let isMenu = true
canvas.addEventListener('click',(event)=>{
    playMusic()
    if(isMenu){
        if(botao.isClicked(event.offsetX,event.offsetY)&&isMenu){
            stop()
            reset()
            config()
            music.pause()
            let audio = new Audio('./assets/sounds/Windows XP Sound.mp3')
            audio.volume = global.globalVolume
            audio.play()
            audio.addEventListener('ended', () => {
                music.play()
            });
            start(main,60)
        }
    }
})
function config(){
    player.initialize()
    SpawnerEnemies.initialize()
    redimensionar()
}
canvas.addEventListener('pointerdown',()=>{
    clickando=true
})
canvas.addEventListener('pointerup',()=>{
    clickando=false
})
setInterval(()=>{
    if(clickando){
        for (let i = 0; i < 1; i++) {
            player.shoot(mousePos)
        }
    }
},200) 
window.addEventListener('keydown',(event)=>{
    player.verifyMovement(event,true)
})
window.addEventListener('keyup',(event)=>{
    player.verifyMovement(event,false)
})

function mouse(){
    // ctx.beginPath();
    // ctx.fillStyle = '#00f';
    // ctx.drawImage(mouseImage,mousePos.x-mouseImage.width/2, mousePos.y-mouseImage.height/2);
    // ctx.fill();
}
function clear(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
}
function vignette(){
    let power = .7
    let ini = 0.8
    let vignetteGradient = ctx.createLinearGradient(canvas.width/2, canvas.height/2, canvas.width, canvas.height/2);

    vignetteGradient.addColorStop(ini, 'rgba(0, 0, 0, 0)')
    vignetteGradient.addColorStop(1, `rgba(0, 0, 0, ${power})`)

    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    vignetteGradient = ctx.createLinearGradient(canvas.width/2, canvas.height/2, 0, canvas.height/2);

    vignetteGradient.addColorStop(ini, 'rgba(0, 0, 0, 0)')
    vignetteGradient.addColorStop(1, `rgba(0, 0, 0, ${power})`)

    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    vignetteGradient = ctx.createLinearGradient(canvas.width/2, canvas.height/2, canvas.width/2, 0);

    vignetteGradient.addColorStop(ini, 'rgba(0, 0, 0, 0)')
    vignetteGradient.addColorStop(1, `rgba(0, 0, 0, ${power})`)

    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    vignetteGradient = ctx.createLinearGradient(canvas.width/2, canvas.height/2, canvas.width/2, canvas.height);

    vignetteGradient.addColorStop(ini, 'rgba(0, 0, 0, 0)')
    vignetteGradient.addColorStop(1, `rgba(0, 0, 0, ${power})`)

    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
let rotation = 0
function main(){
    clear()
    isMenu=false
    rotation = player.verifyPlayerCollide(SpawnerEnemies)?Math.random()*(.6)-.3:rotation
    if(rotation!=0){
        background.style.transform = `rotate(${rotation}rad)`
        background.style.transformOrigin = `${player.pos.x+(diagonal)}px ${player.pos.y+(diagonal)}px`
    }
    ctx.save();
    ctx.translate(player.pos.x + player.wSprite / 2, player.pos.y + player.hSprite / 2);
    ctx.rotate(rotation);
    ctx.translate(-player.pos.x - player.wSprite / 2, -player.pos.y - player.hSprite / 2);
    
    // ctx.scale(.1,.1)
    rotation = global.drawRams(player)?Math.random()*(.6)-.3:rotation
    SpawnerEnemies.verifyEnemies()
    player.verifyBullets(SpawnerEnemies)
    global.drawDamageCounts()
    for (let i = 0; i < global.particles.layer1.length; i++) {
        let element = global.particles.layer1[i];
        if(element.life<=0){
            global.particles.layer1.splice(i,1)
        }
        element.draw()
    }
    player.draw(mousePos,rotation)
    ctx.restore()
    vignette()
    mouse()
    player.drawBars()
    drawScoreLevel()
    if(rotation>.03){
        rotation-=.0175
    }else if(rotation<-.03){
        rotation+=.0175
    }else{
        rotation=0
    }
    if(player.life<=0){
        stop()
        score=player.getScore()
        level=player.level
        reset()
        redimensionar()
        global.playSound('./assets/sounds/Windows XP  Sound 2.mp3')
        start(menuKill,60)
    }
    
    
}
function drawScoreLevel(){
    ctx.beginPath()
    ctx.font ='50px PixelFont'
    ctx.fillStyle='#fff'
    ctx.textBaseline = 'top'
    ctx.textAlign = 'right'
    ctx.fillText(`SCORE: ${player.getScore()}`,canvas.width-10,10)
    ctx.fillText(`LEVEL: ${player.level}`,canvas.width-10,10+10+50)
}
function menu(){
    isMenu=true
    clear()
    botao.draw(canvas.width/2-200,canvas.height/2-40,400,80)
    ctx.beginPath()
    drawTitle(canvas.width/2,canvas.height/2-50,150)
    vignette()
}
function drawTitle(x,y,font){
    ctx.font =''+font+'px PixelFont'
    ctx.fillStyle='#000'
    ctx.textBaseline = 'bottom'
    ctx.textAlign = 'center'
    ctx.fillText(`LINUX`,x,y-font)
    ctx.fillText(`DEFENDER`,x,y)
    ctx.font =''+(font+5)+'px PixelFont'
    ctx.fillStyle='#ff0'
    ctx.fillText(`LINUX`,x,y-font)
    ctx.fillText(`DEFENDER`,x,y)
    ctx.font =''+(font+5)+'px PixelFont'
    ctx.lineWidth = '3'
    ctx.strokeStyle='#000'
    ctx.strokeText(`LINUX`,x,y-font)
    ctx.strokeText(`DEFENDER`,x,y)
}
function menuKill(){
    menu()
    ctx.beginPath()
    ctx.font ='50px PixelFont'
    ctx.fillStyle='#fff'
    ctx.textBaseline = 'bottom'
    ctx.textAlign = 'center'
    ctx.fillText(`SCORE: ${score}`,canvas.width/2,canvas.height/2+50+50+10+40)
    ctx.fillText(`LEVEL: ${level}`,canvas.width/2,canvas.height/2+50+10+40)
}
function start(scene,fps,transicao=true){
    
    if(transicao){
        let lol = setInterval(()=>{
            ctx.beginPath()
            ctx.fillStyle='#0001'
            ctx.fillRect(0,0,canvas.width,canvas.height)
        },80)
        setTimeout(()=>{
            loop = setInterval(scene,Math.floor(1000/fps))
            clearTimeout(lol)
        },4000)
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
    isMenu=false
    player.reset()
    SpawnerEnemies.reset()
}
stop()
reset()

redimensionar()
start(menu,60,false)

ctx.imageSmoothingEnabled = false;
window.addEventListener('resize',()=>{
    redimensionar()
    if(isMenu){
        menu()
    }
    else{
        main()
    }
})
music.load()