document.addEventListener('DOMContentLoaded', () => {
    const gametotal = document.getElementById("game");
    var size = 23;
    for(var i = 0; i < size; i++){
        game = document.createElement('div');
        game.setAttribute('id', i);
        game.style.display = "block";
        game.style.overflow = "auto";
        game.style.clear = "both";
        gametotal.appendChild(game);
        for(var v = 0; v < size;v++){
            box = document.createElement('div');
            box.setAttribute('id', "a" + ('00'+i).slice(-2) + ('00'+v).slice(-2));
            box.setAttribute('class',"normal");
            box.style.display = "inline-block";
            document.addEventListener('click', function enemysel(event) {
                if(event.target.classList.contains("normal")){
                    event.target.classList.remove("normal");
                    event.target.classList.add("enemy");
                } else if(event.target.classList.contains("enemy")){
                    event.target.classList.remove("enemy");
                    event.target.classList.add("bomb");
                } else if(event.target.classList.contains("bomb")){
                    event.target.classList.remove("bomb");
                    event.target.classList.add("normal");
                } else if(event.target.classList.contains("good")){
                    event.target.classList.remove("good");
                    event.target.classList.add("normal");
                }
            });
            game.appendChild(box);
        }
    }
})

function gen(){
    clear();
    var size = 23;
    for(var t = 0; t < 10;t++){
        var randx = Math.floor(Math.random() * size);
        var randy = Math.floor(Math.random() * size);
        document.getElementById("a" + ('00'+randx).slice(-2) + ('00'+randy).slice(-2)).classList.remove("normal");
        document.getElementById("a" + ('00'+randx).slice(-2) + ('00'+randy).slice(-2)).classList.add("enemy");
    }
}

function clear(){
    size = 23;
    for(i = 0; i<size;i++){
        for(v=0;v<size;v++){
            document.getElementById("a" + ('00'+i).slice(-2) + ('00'+v).slice(-2)).classList.remove("good","bomb","dead","enemy");
            document.getElementById("a" + ('00'+i).slice(-2) + ('00'+v).slice(-2)).classList.add("normal");
        }
    }
}

function play(){
    var size = 23;
    for(i = 0; i<size;i++){
        for(v=0;v<size;v++){
            if(document.getElementById("a" + ('00'+i).slice(-2) + ('00'+v).slice(-2)).classList.contains("bomb")){
                testbomb(i,v,true);
            }
        }
    }
}

function solve(){
    var bombs = 2;
    var best = 0;
    var bestx = 0;
    var besty = 0;
    var size = 23;
    for(i = 0; i<size;i++){
        for(v=0;v<size;v++){
            if(best < testbomb(i,v,false)){
                best = testbomb(i,v,false);
                bestx = i;
                besty = v;
            };
        }
    }
    console.log(best);
    document.getElementById("a" + ('00'+bestx).slice(-2) + ('00'+besty).slice(-2)).classList.remove("normal");
    document.getElementById("a" + ('00'+bestx).slice(-2) + ('00'+besty).slice(-2)).classList.add("good");
}

function testbomb(i,v, blown){
    var killedtiles = [];
    var result = 0;
    var size = 23;
    for(e = 0;e < size;e++){
        if(document.getElementById("a" + ('00'+i).slice(-2) + ('00'+e).slice(-2)).classList.contains("enemy")){
            result++;
            if(killedtiles.includes(document.getElementById("a" + ('00'+i).slice(-2) + ('00'+e).slice(-2))) == false){
                killedtiles.push(document.getElementById("a" + ('00'+i).slice(-2) + ('00'+e).slice(-2)));
            }
        }
        if(document.getElementById("a" + ('00'+e).slice(-2) + ('00'+v).slice(-2)).classList.contains("enemy")){
            result++;
            if(killedtiles.includes(document.getElementById("a" + ('00'+e).slice(-2) + ('00'+v).slice(-2))) == false){
                killedtiles.push(document.getElementById("a" + ('00'+e).slice(-2) + ('00'+v).slice(-2)));
            }
        }
    }
    var f = i;
    var fr = i;
    var g = v;
    var gr = v;
    while(f > 0 && g > 0){
        f--;
        g--;
        fr--;
        gr++;
        console.log("" + f + g);
        if(f >= size || f < 0 || g >= size || g < 0 || fr >= size || fr < 0 || gr >= size || gr < 0){
            break;
        }
        if(document.getElementById("a" + ('00'+f).slice(-2) + ('00'+g).slice(-2)).classList.contains("enemy")){
            result++;
            if(killedtiles.includes(document.getElementById("a" + ('00'+f).slice(-2) + ('00'+g).slice(-2))) == false){
                killedtiles.push(document.getElementById("a" + ('00'+f).slice(-2) + ('00'+g).slice(-2)));
            }
        }
        if(document.getElementById("a" + ('00'+fr).slice(-2) + ('00'+gr).slice(-2)).classList.contains("enemy")){
            result++;
            if(killedtiles.includes(document.getElementById("a" + ('00'+fr).slice(-2) + ('00'+gr).slice(-2))) == false){
                killedtiles.push(document.getElementById("a" + ('00'+fr).slice(-2) + ('00'+gr).slice(-2)));
            }
        }
    }
    f = i;
    fr = i;
    g = v;
    gr = v;
    while(f < size-1 && g < size-1){
        f++;
        g++;
        fr++;
        gr--;
        console.log("" + f + g);
        console.log("" + fr + gr);
        if(f > size || f < 0 || g > size || g < 0 || fr > size || fr < 0 || gr > size || gr < 0){
            break;
        }
        if(document.getElementById("a" + ('00'+f).slice(-2) + ('00'+g).slice(-2)).classList.contains("enemy")){
            result++;
            if(killedtiles.includes(document.getElementById("a" + ('00'+f).slice(-2) + ('00'+g).slice(-2))) == false){
                killedtiles.push(document.getElementById("a" + ('00'+f).slice(-2) + ('00'+g).slice(-2)));
            }
        }
        if(document.getElementById("a" + ('00'+fr).slice(-2) + ('00'+gr).slice(-2)).classList.contains("enemy")){
            result++;
            if(killedtiles.includes(document.getElementById("a" + ('00'+fr).slice(-2) + ('00'+gr).slice(-2))) == false){
                killedtiles.push(document.getElementById("a" + ('00'+fr).slice(-2) + ('00'+gr).slice(-2)));
            }
        }
    }
    if(document.getElementById("a" + ('00'+i).slice(-2) + ('00'+v).slice(-2)).classList.contains("enemy")){
        result = 0;
    }

    if(blown == false){
        return result;
    } else {
        for(y = 0; y < killedtiles.length;y++){
            killedtiles[y].classList.remove("enemy");
            killedtiles[y].classList.add("dead");
        }
    }
}