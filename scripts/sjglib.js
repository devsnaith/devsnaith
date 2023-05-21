var show_l = false, visable = false;
const canvas = document.getElementById("screen");
canvas.addEventListener("click", ()=>{
    show_l = !show_l;
})
const ctx = canvas.getContext("2d");
var mov_x = 0, mov_y = 0;
var x = 0, y = 0;
const points = [];
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

for(var i = 0 ; i <= 40 ; i++) {
    var r = getRandomArbitrary(1, 255);
    var g = getRandomArbitrary(1, 255);
    var b = getRandomArbitrary(1, 255);
    var x = getRandomArbitrary(0, canvas.width);
    var y = getRandomArbitrary(0, canvas.height);
    const star = {'bs': 2, 'x': x, 'y':y,'c':"rgb("+r+", "+g+","+b+")"};
    points[i] = star;
}


setInterval(loop, 60);
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var star = 0 ; star < points.length ; star++) {
        
        ctx.fillStyle = points[star].c;
        points[star].x += mov_x;
        points[star].y += mov_y;

        var gx = (canvas.width / 2) - ((points[star].x) + (points[star].bs / 2));
        var gy = (canvas.height / 2) - ((points[star].y) + (points[star].bs / 2));
        if((gx > -8 && gx < 8) && (gy > -8 && gy < 8)){
            showData(points[star]);
            if(points[star].href != undefined){
                resetbtn();
                mov_y = 0;
                mov_x = 0;
            }
        }
        
        var mw = canvas.width;
        var mh = canvas.height;
        var miw = -1;
        var mih = -1;
        var btw = 0;
        var bth = 0;

        if(points[star].bs > 2) {
            mw = canvas.width*2;
            mh = canvas.height*2;
            miw = -canvas.width;
            mih = -canvas.height;
            btw = miw;
            bth = mih;
        }

        if(points[star].x > mw){
            points[star].x = 0;
        }else if(points[star].y > mh){
            points[star].y = 0;
        }
        
        if(points[star].x < miw){
            points[star].x = mw;
        }else if(points[star].y < mih){
            points[star].y = mh;
        }

        ctx.fillRect(points[star].x, points[star].y, points[star].bs, points[star].bs);

        if(show_l){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ffffff";
            ctx.font = "14px monospace";
            ctx.fillText("X: " + Math.trunc(gx), 10, canvas.height - 30);
            ctx.fillText("Y: " + Math.trunc(gy), 10, canvas.height - 10);
        }
    }


    ctx.fillStyle = "#00ff00";
    ctx.fillRect((canvas.width / 2)-1, 0, 2, (canvas.height / 2) - 10);
    ctx.fillRect((canvas.width / 2)-1, (canvas.height / 2) + 10, 2, (canvas.height / 2) - 10);
    ctx.fillRect(0, (canvas.height / 2)-1, (canvas.width / 2) - 10, 2);
    ctx.fillRect((canvas.width - (canvas.width / 2)+10), (canvas.height / 2)-1, (canvas.width / 2) - 10, 2);
}

function action(element) {
    var stop = 1;
    console.log(element.style.backgroundColor);
    if(element.style.backgroundColor == "rgb(150, 230, 255)"){
        element.style.backgroundColor = "rgb(150, 166, 255)";
        stop = 0;
    }

    resetbtn();
    var speed = 2;
    mov_y = 0;
    mov_x = 0;
    switch (element.textContent) {
        case "UP":
            mov_y = speed * stop;
            break;
        case "D":
            mov_y = -speed * stop;
            break;
        case "L":
            mov_x = speed * stop;
            break;
        case "R":
            mov_x = -speed * stop;
            break;
        default:
            break;
    }
    if(stop !=0)
        element.style.backgroundColor = "rgb(150, 230, 255)";
    document.getElementById("connect").classList.add("hide_item");
}

function resetbtn() {
    var es = document.getElementsByClassName("m_btn"); 
    for(var i = 0 ; i < es.length ; i ++) {
        es[i].style.backgroundColor = "rgb(150, 166, 255)";
    }
}

function showData(points) {
    var x = getRandomArbitrary(-(canvas.width), canvas.width*2);
    var y = getRandomArbitrary(-(canvas.height), canvas.height*2);    
    points.x = x;
    points.y = y;

    var oldItems = document.getElementById("connect").getElementsByClassName("connect_item");
    for(var i = 0 ; i < oldItems.length ; i++) {
        oldItems[i].remove();
    }
    
    document.getElementById("connect_header_group").textContent = points.group;
    for(var i = 0 ; i < points.href.length ; i++) {
        var icon = document.createElement("img");
        icon.setAttribute("src", points.href[i].icon);

        var title = document.createElement("a");
        title.setAttribute("href", points.href[i].url);
        title.textContent = points.href[i].title;

        var item = document.createElement("div");
        item.setAttribute("class", "connect_item");
        item.insertAdjacentElement("afterbegin", title);
        item.insertAdjacentElement("afterbegin", icon);

        document.getElementById("connect").insertAdjacentElement("beforeend", item);
    }
    document.getElementById("connect").classList.remove("hide_item");
}