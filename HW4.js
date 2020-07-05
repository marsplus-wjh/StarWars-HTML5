var rank = [];
var Final = 50;
var life;
var score;
var flag;
var nowWay;
function selectPlan(plan)
{
    var select = document.getElementsByClassName("selected");
    if(select.length > 0)
    {
        select[0].style.border="solid 2px white";
        select[0].className = "gameover";
    }
    plan.style.border="solid 3px green";
    plan.className = "selected";
}
var bad = [];
var dan = [];
var TimeA;
var TimeB;
var TimeE;
var TimeZ;
function ok()
{
    life = 3;
    nowWay = Final;
    flag = true;
    score = 0;
    if(document.getElementsByClassName("selected").length <= 0)
    {
        alert("Are you sure you will filgt by yourself?");
        return false;
    }
    var music = document.getElementById("music");
    music.play();
    var stop = document.getElementById("stop");
    stop.style.display="none";
    var over = document.getElementById("over");
    over.style.display = "none";
    var rank = document.getElementById("ranktext");
    rank.style.display = "none";
    var user = document.getElementById("user");
    var pic = document.getElementsByClassName("selected");
    user.src = pic[0].childNodes[0].src;
    user.style.top = "300px";
    user.style.left = "200px";
    document.getElementById("gameDiv").style.display = "block";
    document.getElementById("gameDiv").focus();
    zidan();
    TimeA = record();
    TimeB = finaldiv();
    TimeE = makeEnemy();
    TimeZ = zidan();
    var dropimg = document.getElementById("drop_img");
    if(dropimg) {
        topEnemy = dropimg.src;
    }
    for(var i = 0; i < bad.length; i++)
    {
        bad[i].parentNode.removeChild(bad[i]);
        clearInterval(bad[i].T);
    }
    for(var j = 0; j < dan.length;j++)
    {
        dan[j].parentNode.removeChild(dan[j]);
        clearInterval(dan[j].T);
    }
    bad.splice(0,bad.length);
    dan.splice(0,dan.length);
    var T = setInterval(function(){
        if(life <= 0 || nowWay <= 0 || Final <=0)
        {
            gameover();
            clearInterval(T);
        }
    },200);
}
function zidan(){
    var T = setInterval(function(){
        var user = document.getElementById("user")
        var x = pxToint(getStyle(user,"left")) + 37;
        var y = pxToint(getStyle(user,"top")) - 15;
        var ob = newImg(x,y,3,8,"green","",-1);
        ob.style.borderRadius = "5px";
        var T = setInterval(function(){
            var x = pxToint(getStyle(ob,"top"));
            for(var i = 0; i < bad.length; i++)
            {
                var B = bad[i];
                var flag = false;
                for(var j = 0; j < dan.length; j++)
                    if(dan[j] == ob) flag = true;
                if(!flag)
                {
                    clearInterval(T);
                    return;
                }
                if(Px(B,pxToint(getStyle(ob,"left")),pxToint(getStyle(ob,"top"))))
                {
                    score++;
                    ob.parentNode.removeChild(ob);
                    bad[i].parentNode.removeChild(bad[i]);
                    bad.splice(i,1);
                    for(var j = 0; j < dan.length; j++)
                    {
                        if(dan[j] == ob)
                            dan.splice(j,1);
                    }
                    clearInterval(T);
                    return;
                }
            }
            x -= 10;
            ob.style.top = intTopx(x);
        },50);
        dan.push(ob);
    },300);
}
function getStyle(element, attr)
{
    if(element.currentStyle){
        return element.currentStyle[attr];
    }else{
        return window.getComputedStyle(element,null)[attr];
    }
}
function newImg(left,top,width,height,color,img,op)
{
    var element = document.createElement("img");
    element.style.position = "absolute";
    element.style.left = intTopx(left);
    element.style.top = intTopx(top);
    element.style.width = intTopx(width);
    element.style.height = intTopx(height);
    element.style.backgroundColor = color;
    if(img) {
        element.src = img;
    }
    element.style['z-index'] = 1002;
    var game = document.getElementById("game");
    game.appendChild(element);
    element.op = op;
    return element;
}
function pxToint(a){
    return parseInt(a.replace('px',''));
}
function intTopx(a){
    return a + 'px';
}
function rule()
{
    pause();
    document.getElementById("ruletext").style.display ="block";
}
function ranklist()
{
    pause();
    var ranktext = document.getElementById("ranktext");
    ranktext.style.display = "block";
    rank.sort(function(x,y)
    {
        return x.score < y.score;
    });
    var html = "<p style='font-size: 20px;color: #CA9D3F;margin-left: 15%'>Name Score Survival</p>";
    for(var i = 0; i < 3; i++)
    {
        if(i < rank.length) {
            html += "<p>Rank" + (i + 1) + " " + rank[i].name + " " + rank[i].score + " " + (Final - nowWay) + "m";
        }
        else {
            html += "<p>Rank" + (i + 1) + " XXXXXXX 0 0m</p>";
        }

    }
    html += "<button id=\"close\" onclick=\"return_button()\" style='width: 80%;height: 15%'>Return</button>";
    ranktext.innerHTML = html;
}
function return_button()
{
    var ruletext = document.getElementById("ruletext");
    ruletext.style.display ="none";
    var runktext = document.getElementById("ranktext");
    runktext.style.display ="none";
    var gameDiv = document.getElementById("gameDiv");
    gameDiv.focus();
}
function control()
{
    if(!flag && event.keyCode != 32) {
        return false;
    }
    var user = document.getElementById("user");
    if(event.keyCode == 32){
        pause();
    }
    else if(event.keyCode == 37){
        var x = pxToint(getStyle(user,"left")) - 20;
        if(x >= 0){
            x = x
        }else{
            x = 0
        }
        user.style.left = intTopx(x);
        boom();
    }
    else if(event.keyCode == 38){
        var x = pxToint(getStyle(user,"top")) - 20;
        if(x >= 0){
            x = x
        }else {
            x = 0
        }
        user.style.top = intTopx(x);
        boom();}
    else if(event.keyCode == 39){
        var x = pxToint(getStyle(user,"left")) + 20;
        if(x >= 450){
            x = 450
        }else{
            x = x
        }
        user.style.left = intTopx(x);
        boom();
    }
    else if(event.keyCode == 40){
        var x = pxToint(getStyle(user,"top")) + 20;
        if(x >= 400){
            x = 400
        }else{
            x = x
        }
        user.style.top = intTopx(x);
        boom();
    }
    else if(event.keyCode == 82){
        ok();
    }
}
function Px(ob,x,y)
{
    if(x < pxToint(getStyle(ob,"left"))){
        return false;
    }
    if(x > (pxToint(getStyle(ob,"left")) + pxToint(getStyle(ob,"width")))){
        return false;
    }
    if(y < pxToint(getStyle(ob,"top"))){
        return false;
    }
    if(y > (pxToint(getStyle(ob,"top")) + pxToint(getStyle(ob,"height")))){
        return false;
    }
    return true;
}
function boom()
{
    for(var i = 0; i < bad.length; i++)
    {
        var user = document.getElementById("user");
        if(Px(user,pxToint(getStyle(bad[i],"left")),pxToint(getStyle(bad[i],"top"))))
        {
            life--;
            bad[i].parentNode.removeChild(bad[i]);
            clearInterval(bad[i].T);
            bad.splice(i,1);
        }
    }
}
function finaldiv()
{
    var T = setInterval(function(){
        var x = pxToint(getStyle(gamebg,"top"));
        x += 5;
        nowWay--;
    },200)
    return T;
}
var topEnemy = "images/defalut enemy.png";
var leftEnemy = "images/left enemy.png";
var rightEnemy = "images/right enemy.png";
function makeEnemy()
{
    T = setInterval(function(){
        var div = Math.random() * 10;
        var x = Math.round(div) % 3;
        if(x == 0){
            var i = Math.round(Math.random() * 10);
            var enemy1 = new newImg(70 * i,0,60,60,"",topEnemy,0);
            var ob = enemy1;
            ob.T = T
            var T = setInterval(function(){
                var x = pxToint(getStyle(ob,"top"));
                if(x >= 480)
                {
                    clearInterval(T);
                    ob.parentNode.removeChild(ob);
                    for(var i = 0; i < bad.length; i++)
                    {
                        if(bad[i] == ob)
                            bad.splice(i,1);
                    }
                    return;
                }
                x += 4;
                ob.style.top = intTopx(x);
            },100);
            bad.push(ob);
        }
        else if(x == 1){
            var i = Math.round(div);
            var enemy2 = new newImg(0,40 * i,40,40,"",leftEnemy,1);
            var ob = enemy2;
            ob.T = T;
            var T = setInterval(function () {
                var x = pxToint(getStyle(ob, "left"));
                if (x >= 500) {
                    clearInterval(T);
                    ob.parentNode.removeChild(ob);
                    for (var i = 0; i < bad.length; i++) {
                        if (bad[i] == ob)
                            bad.splice(i, 1);
                    }
                    return;
                }
                x += 5;
                ob.style.left = intTopx(x);
                return T;
            }, 150);
            bad.push(ob);
        }
        else if(x == 2){
            var i = Math.round(div);
            var enemy3 = new newImg(410,40 * i,40,40,"",rightEnemy,2);
            var ob = enemy3;
            ob.T = T;
            var T = setInterval(function(){
                var x = pxToint(getStyle(ob,"left"));
                if(x <= -40)
                {
                    clearInterval(T);
                    ob.parentNode.removeChild(ob);
                    for(var i = 0; i < bad.length; i++)
                    {
                        if(bad[i] == ob)
                            bad.splice(i,1);
                    }
                    return;
                }
                x -= 5;
                ob.style.left = intTopx(x);
            },150);
            bad.push(ob);
        }
    },1200);
    return T;
}
function pause()
{
    if(!flag)
    {
        TimeA = record();
        TimeB = finaldiv();
        TimeE = makeEnemy();
        TimeZ = zidan();
    }
    else
    {
        var stop = document.getElementById("stop");
        stop.style.display="block";
        clearInterval(TimeA);
        clearInterval(TimeB);
        clearInterval(TimeE);
        clearInterval(TimeZ);
    }
    if(flag == true){
        flag = false;
    }else{
        flag = true;
    }
}
function gameover()
{
    pause();
    var music = document.getElementById("music");
    music.pause();
    document.getElementById("over").style.display = "block";
    var user = new Object();
    user.name = prompt("You get " + score + " point(s). Please input your name:");
    user.score = score;
    rank.push(user);
}
function record()
{
    var T = setInterval(function(){
        var li = document.getElementById("life");
        li .innerHTML = "Life: " + life + " / 3";
        var sc = document.getElementById("score");
        sc.innerHTML = "Score: " + score;
        var final = document.getElementById("Final");
        final.innerHTML = "Final: " + nowWay;
    },100);
    return T;
}