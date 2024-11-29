var mario = document.getElementById('mario')  
var x = 665, y = 340 , roty = 0  
var fx = 0, fxx = 0 , fxxx = 0 ,fx3 = 0, fxe = 0   
let fireElement // To store reference to fire element  
var enemylife= 5 
var mariolife = 100
var point = 0  
var freze = false
var isclcik=0

function setPos() {  
    if(freze == false){
        lifepercent.innerHTML = mariolife*10
        document.getElementById('point').innerHTML = point  
        mario.style.marginLeft = x + 'px'  
        mario.style.marginTop = y + 'px'  
        mario.style.height = '360px'  
        mario.style.width = '200px'  
        mario.style.transform = `rotateY(${roty}deg)`  
        mario.style.animation = "move .5s infinite"  
        MarioTouch()
    }
}  

function goRight() {  
    x += 20  
    roty = 0  
    setPos()  
}  

function goLeft() {  
    x -= 20  
    roty = 180  
    setPos()  
}  

document.onkeydown = function (e) {  
    e = e || window.event  
    if (e.keyCode == 39) {  
        goRight()  
    }  
    else if (e.keyCode == 37) {  
        goLeft()  
    }  
    else if(e.keyCode == 32){  
        fire()
    }  
}  

function spawntree() {  
    fx = Math.floor(Math.random() * 1330)  
    fxx = Math.floor(Math.random() * 1330)  
    fxxx = Math.floor(Math.random() * 1330)  
    fx3 = Math.floor(Math.random() *1330)  

    document.getElementById('board').innerHTML += `<div class="tree" style="margin-left: ${fx}px; margin-top: ${450}px;"></div>`+  
    `<div class="tree" style="margin-left: ${fxx}px; margin-top: ${450}px;"></div>`+   
    `<div class="tree" style="margin-left: ${fxxx}px; margin-top: ${450}px;"></div>` +
    `<div class="tree" style="margin-left: ${fx3}px; margin-top: ${450}px;"></div>` 
}  

function spawnenemy() {  
    fxe = Math.floor(Math.random() * 1330)  
    document.getElementById('board').innerHTML += `<div id="enemy" style="margin-left: ${fxe}px; margin-top: ${560}px;"></div>`  
}  

function fire() {  
    if (freze == false){
        if (x > fxe && roty == 180) {
            if(isclcik <= 4 && enemylife !=0){
                isclcik++
                mario.style.backgroundImage = 'url(Resources/firings.png)';  
                mario.style.width = '400px';  
                mario.style.animation = 'none';  
                fireElement = document.createElement('div');  
                fireElement.className = 'fire';  
                fireElement.id = 'fire';  
                fireElement.style.marginLeft = (x - 20) + 'px';  
                fireElement.style.marginTop = '470px';  
                fireElement.style.transform = 'rotate(180deg)';  
                document.getElementById('board').appendChild(fireElement);  
                moveFireToEnemy(fireElement, fxe);  
            }  
        }   
        else if (x < fxe && roty == 0) {  
            if(isclcik <= 4 && enemylife !=0){
                isclcik++
                mario.style.backgroundImage = 'url(Resources/firings.png)';  
                mario.style.width = '400px';  
                mario.style.animation = 'none';  
                fireElement = document.createElement('div');  
                fireElement.className = 'fire';  
                fireElement.id = 'fire';  
                fireElement.style.marginLeft = (x + 200) + 'px';  
                fireElement.style.marginTop = '470px';  
                fireElement.style.transform = 'rotate(-90deg)';  
                document.getElementById('board').appendChild(fireElement);  
                moveFireToEnemy(fireElement, fxe);  
            }
        }   
    }
}  

function moveFireToEnemy(fireElement, targetX) {  
    var enemyElement = document.getElementById('enemy');  
    var heart = document.getElementById(`heart${6-isclcik}`)  
    // enemylife--
    function move() {  
        var firePos = parseInt(fireElement.style.marginLeft);  
        if (firePos < targetX) {  
            fireElement.style.marginLeft = (firePos + 5) + 'px';
        } else if (firePos > targetX) {  
            fireElement.style.marginLeft = (firePos - 5) + 'px';
        }  
        if (Math.abs(firePos - targetX) < 5) {  
            fireElement.remove();
            heart.style.backgroundColor = 'white';  
            enemylife--  
            // isclcik--
            point += 10  
            if(mariolife < 100 && mariolife+ 10 > 100){
                mariolife = 100 
                lifepercent.innerHTML = mariolife*10
                MarioTouch()
            }
            else if(mariolife < 100 && mariolife+ 10 < 100){
                mariolife += 10
                lifepercent.innerHTML = mariolife*10
                MarioTouch()
            }
            document.getElementById('point').innerHTML = point  
            
            if (enemylife == 0) {  
                enemyElement.style.marginTop = '200px'
                enemyElement.remove()  
                fireElement.remove()
                enemylife = 5  
                isclcik = 0
                spawnenemy()  
                for (let i = 1; i <= 5; i++) {  
                    const heart = document.getElementById(`heart${i}`)  
                    if (heart) {  
                        heart.style.backgroundColor = 'red'  
                    }  
                }  
            }  
        } 
        else {  
            requestAnimationFrame(move);
        }  
    }  
    
    move();
}  
function MarioTouch(){
    var xend = x + 200
    var fxeend = fxe + 242
    if (x <= fxe && fxe <= xend) {
        lifeset()
    }
    else if (x <= fxeend && fxeend <= xend) {
        lifeset()
    }
    else if(fxe < x  && x < fxeend){
        lifeset()
    }
    else{
        document.getElementById('lifepercent').style.width = `${mariolife}%`
    }
}
function lifeset(){
    lifepercent = document.getElementById('lifepercent')
    lifepercent.style.width = `${mariolife-1}%`
    lifepercent.innerHTML = mariolife*10
    mariolife--
    if (mariolife == 0){
        document.getElementById('lose').innerHTML = 'loser'
        document.getElementById('refresh').style.marginLeft =  '1200px'
        setPos()
        for (let i = 1; i <= 20; i++) {  
            const heart = document.getElementById(`heart${i}`)  
            if (heart) {  
                heart.style.backgroundColor = 'red'  
            }  
        }  
        for (let i = 1; i <= 10; i++) {  
            spawnenemy()        
        }  
        freze = true
    }
}
function refresh(){
    document.getElementById('lifepercent').style.width = '100%'
    mariolife = 100
    lifepercent.innerHTML = mariolife*10
    point = 0
    document.getElementById('lose').innerHTML = ''
    document.getElementById('board').innerHTML = ''
    spawnenemy()
    spawntree()
    freze = false
    setPos()
    for (let i = 1; i <= 5; i++) {  
        const heart = document.getElementById(`heart${i}`)  
        if (heart) {  
            heart.style.backgroundColor = 'red'  
        }  
    } 
    document.getElementById('refresh').style.marginLeft =  '600px'
    enemylife= 5 
    isclcik = 0
}
setPos()  
spawntree()  
spawnenemy()  