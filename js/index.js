let inputDir={x: 0, y: 0};
const moneySound=new Audio('music/food.mp3');
const fucksound=new Audio('music/BWTF.mp3');
const movesound=new Audio('music/move.mp3');
const musicSound=new Audio('music/music.mp3'); 
let score=0;
let speed=19;

let lastPaintTime=0;
let bitchArr=[
    { x: 13, y: 15}
];

money = {x: 6, y: 7};

// game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }

    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(bitch) {
    // If you bump into yourself 
    for (let i = 1; i < bitchArr.length; i++) {
        if(bitch[i].x === bitch[0].x && bitch[i].y === bitch[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(bitch[0].x >= 18 || bitch[0].x <=0 || bitch[0].y >= 18 || bitch[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine()
{
    if(isCollide(bitchArr)){
        fucksound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        bitchArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }
    // If you have eaten the money, increment the score and regenerate the money
    if(bitchArr[0].y === money.y && bitchArr[0].x ===money.x){
        money.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        bitchArr.unshift({x: bitchArr[0].x + inputDir.x, y: bitchArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        money = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the bitch
    for (let i = bitchArr.length - 2; i>=0; i--) { 
        bitchArr[i+1] = {...bitchArr[i]};
    }

    bitchArr[0].x += inputDir.x;
    bitchArr[0].y += inputDir.y;
    
    
    //part2:display

    board.innerHTML="";
    bitchArr.forEach((e,index)=>{
        bitchElement=document.createElement('div');
        bitchElement.style.gridRowStart=e.y;
        bitchElement.style.ColumnStart=e.x;

        if(index === 0)
        {
            bitchElement.classList.add('head');

        }
        else{
            bitchElement.classList.add('bitch');
        }
      
        board.appendChild(bitchElement);
       
    });

    moneyElement=document.createElement('div');
    moneyElement.style.gridRowStart= money.y;
    moneyElement.style.ColumnStart= money.x;
    moneyElement.classList.add('money') 
    board.appendChild(moneyElement);
    //part2:display
}
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main) ;
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
