var posicionSakura = 30; //posicion inicial jugador
var posicionbala = 90; //posicion inicial bala
var velocidad = 50; //velocidad jugador
var sakura = document.getElementById('pj');
var posicionMaxPj = document.querySelector("#cabecera").offsetWidth - 150;
var enemigos = document.getElementsByClassName("enemigo");
var enemigosVida = document.getElementsByClassName("enemigoVida");
var enemigosCarta = document.getElementsByClassName("enemigoCarta");
var balas = document.getElementsByClassName("bala");
var anchoEnemigo;
var anchoBala;
var anchoEnemigoVida;
var i;
var puntuacion = 0;
var velocEnemigo = 5;
var score = document.getElementById("puntos");
var numeroAleaVida = Math.ceil((Math.random()*6) + 2);
var numeroAleaCarta = Math.ceil((Math.random()*6)+ 20);
var nE = 0;
const CABE = document.getElementById("cabe")
const CABECERA = document.getElementById("cabecera")
const CUERPO = document.getElementById("cuerpo")
const PIE = document.getElementById("pie")
const SCRIPT = document.getElementById("js");
var cuerpoGanar = document.getElementById("cuerpoGanar");
document.addEventListener("keydown", function(event){ //MENU PARA ACCIONES CUANDO SE PULSA TECLA FLECHA IZQ, DER Y ESPACIO.
    switch (event.keyCode){
        case 37:
            if(posicionSakura > 30){ //mueve a la izquierda
                sakura.src = "img/pjiz.png";
                posicionSakura = posicionSakura - velocidad;
                sakura.style.left = posicionSakura + "px";
            }
            break;
        case 39:
            if(posicionSakura < posicionMaxPj){ // mueve a la derecha
                sakura.src = "img/pjde.png";
                posicionSakura = parseFloat(posicionSakura) + parseFloat(velocidad);
                sakura.style.left = posicionSakura + "px";
            }
            break;
        case 32:  //dispara
            setTimeout(moverMano, 1100);
            tirarbala();
            cambiarSakura();
            break;
    };
});
window.addEventListener("resize", function(event){ //actualizar el ancho maximo y mover el pj al ancho maximo si lo sobrepasa
    posicionMaxPj = document.querySelector("#cabecera").offsetWidth - 150;
    if(sakura.offsetLeft > posicionMaxPj){
        posicionSakura = posicionMaxPj;
        sakura.style.left = posicionMaxPj + "px";
    }
})
function tirarbala(){ 
    let bala = document.createElement("img"); //Para crear la bala
    bala.setAttribute("src", "img/bala.png");
    bala.setAttribute("class", "bala");
    bala.style.display="block";
    bala.style.top= sakura.offsetTop + "px";
    document.getElementById("cuerpo").append(bala);
    anchoBala=balas[0].offsetWidth //Para calcular el ancho de la bala y utilizarlo en el choque

    var posicionbala = parseFloat(posicionSakura) + parseFloat(50); 
    bala.style.left = posicionbala + "px"; //colocar la bala en la posicion del pj

    var temporizador = setInterval(function(){ //Desplazar la bala para arriba
        var dist = bala.offsetTop;
        var velo = 20;
        dist-=velo;
        bala.style.top = dist +"px";
        if (dist-velo<=20){ //Si llega arriba la bala desaparece
            clearInterval(temporizador);
            bala.remove();
        }
        for(var i=0;i<enemigos.length;i++){ //Choque Enemigo
            if((enemigos[i].offsetLeft < bala.offsetLeft) && ((enemigos[i].offsetLeft + anchoEnemigo) > (bala.offsetLeft+anchoBala))&&(bala.offsetTop < (enemigos[i].offsetTop + 100))){
                var topEne = enemigos[i].offsetTop
                var izqEne = enemigos[i].offsetLeft
                enemigos[i].remove();
                let enemMuerto = document.createElement("img"); //----------------------------------Crear el gif que aparece cuando ocurre el choque------------------------------------------------
                enemMuerto.setAttribute("src", "img/gif/kerocomet.gif");
                enemMuerto.setAttribute("class", "enemigoMuerto")
                enemMuerto.style.top = topEne + "px";
                enemMuerto.style.left = izqEne + "px";
                document.getElementById("cuerpo").append(enemMuerto);//-----------------------------------------------------------------------------------------------------------------------------
                setTimeout(enemigoDesaparece, 2000); //--------------------------------------------------Que desaparezca el gif a los dos segundos.--------------------------------------------------
                function enemigoDesaparece(){
                    enemMuerto.remove();
                };
                bala.remove();
                puntuacion+=10;//sumar puntuacion
                score.innerHTML = puntuacion;
                if(puntuacion>=300){//--------------------------------------------------------------------Ganar cuando la puntuacion sea 300----------------------------------------------------------
                    cuerpoGanar.style.display = "grid";
                    CABE.style.visibility= "hidden";
                    CABECERA.style.visibility= "hidden";
                    CUERPO.style.visibility= "hidden";
                    PIE.style.visibility= "hidden";
                    clearInterval(tempoEnemigo);
                    var boton = document.getElementById("jugar");
                       boton.addEventListener("click", function(event){
                       location.href = "../PaginaInicio/index.html";
                    });
                    window.addEventListener("keypress", function(event){
                       if(event.keyCode == 13){
                           location.href = "../PaginaInicio/index.html";
                       }
                    })
                }//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            };
        };
        for(var i=0;i<enemigosVida.length;i++){ //------------------------------------------------Choque Vida-------------------------------------------------------------------------------------------------
            if((enemigosVida[i].offsetLeft < bala.offsetLeft) && ((enemigosVida[i].offsetLeft + anchoEnemigoVida) > (bala.offsetLeft+anchoBala))&&(bala.offsetTop < (enemigosVida[i].offsetTop + 80))){
                enemigosVida[i].remove();
                let enemMuertoV = document.createElement("img"); //Crear la vida que aparece cuando ocurre el choque
                enemMuertoV.setAttribute("src", "img/vida.png");
                enemMuertoV.setAttribute("class", "vida");
                let numeroV = document.getElementsByClassName("vida").length;
                enemMuertoV.setAttribute("id", "v"+(numeroV+=1));
                document.getElementById("cabecera").append(enemMuertoV);
                bala.remove();
            };
        };//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        for(var i=0;i<enemigosCarta.length;i++){ //----------------------------------------------Choque Carta---------------------------------------------------------------------------------------------------
            if((enemigosCarta[i].offsetLeft < bala.offsetLeft) && ((enemigosCarta[i].offsetLeft + (anchoEnemigoCarta+10)) > (bala.offsetLeft+anchoBala))&&(bala.offsetTop < (enemigosCarta[i].offsetTop + 80))){
                enemigosCarta[i].remove();
                velocEnemigo = 5;
                bala.remove();
            };
        };//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    },20);
};
function moverMano(){ //La imagen cambie a la mano abajo.
    var sakuraImg = document.getElementById('pj').getAttribute('src');
    if(sakuraImg == 'img/pjaiz.png' || sakuraImg == 'img/pjiz.png'){
        sakura.src = "img/pjiz.png";
    }else {sakura.src = "img/pjde.png"};
}
function cambiarSakura(){ //Para cambiar la imagen levantando la mano.
    var sakuraImg = document.getElementById('pj').getAttribute('src');
    if(sakuraImg == 'img/pjiz.png' || sakuraImg == 'img/pjaiz.png'){
        sakura.src = "img/pjaiz.png";
    }else {
        sakura.src = "img/pjade.png";
    };
};
setInterval(crearVidaAleatoria, 15000)
function crearVidaAleatoria(){
    numeroAleaVida = nE + 5;
}
setInterval(crearCartaAleatoria, 20000)
function crearCartaAleatoria(){
    numeroAleaCarta = nE + 5;
}
var tempoEnemigo = setInterval(function(){//crear un enemigo y posicionarlo a la izq
    let enemig = document.createElement("img");
    enemig.setAttribute("src", "img/gif/kero.gif");
    enemig.setAttribute("class", "enemigo");
    enemig.style.display="block";
    var aleatorio = Math.ceil((Math.random() * (posicionMaxPj-400)) + 200);
    enemig.style.left = aleatorio + "px";
    document.getElementById("cuerpo").append(enemig);
    anchoEnemigo=enemigos[0].offsetWidth;
    if (puntuacion > 50 && velocEnemigo < 30){ //Aumentar velocidad
        velocEnemigo+=2; 
    }
    nE++;
    if(nE == numeroAleaVida){ //--------------------------------------Crear Vida de enemigo------------------------------------------------------------
        let enemigVida = document.createElement("img");
        enemigVida.setAttribute("src", "img/vida.png");
        enemigVida.setAttribute("class", "enemigoVida");
        var aleatorio = Math.ceil((Math.random() * (posicionMaxPj-600)) + 300);
        enemigVida.style.left = aleatorio + "px";
        document.getElementById("cuerpo").append(enemigVida);
        anchoEnemigoVida = enemigVida.offsetWidth;
        var vidaCaida = setInterval(function(){ //Para que caigan las vidas
            var alto = enemigVida.offsetTop;
            alto+=velocEnemigo;
            enemigVida.style.top = alto + "px";
            var distanciaPj = sakura.offsetTop;
            var altoSakura = sakura.offsetHeight;
            if(alto+velocEnemigo>=distanciaPj+(altoSakura/2)){
                enemigVida.remove();
            };
        },30)
    }; //-------------------------------------------------------------------------------------------------------------------------------------------------
    if(nE == numeroAleaCarta){ //---------------------------------------------------------Crear carta de resetear la velocidad-----------------------------
        let enemigCarta = document.createElement("img");
        enemigCarta.setAttribute("src", "img/carta.png");
        enemigCarta.setAttribute("class", "enemigoCarta");
        var aleatorio = Math.ceil((Math.random() * (posicionMaxPj-600)) + 300);
        enemigCarta.style.left = aleatorio + "px";
        document.getElementById("cuerpo").append(enemigCarta);
        anchoEnemigoCarta = enemigCarta.offsetWidth;
        var cartaCaida = setInterval(function(){ 
            var alto = enemigCarta.offsetTop;
            alto+=velocEnemigo;
            enemigCarta.style.top = alto + "px";
            var distanciaPj = sakura.offsetTop;
            var altoSakura = sakura.offsetHeight;
            if(alto+velocEnemigo>=distanciaPj+(altoSakura/2)){
                enemigCarta.remove();
            };
        },30)
    }; //-------------------------------------------------------------------------------------------------------------------------------------------------
    var tempoCaida = setInterval(function(){ //----------------------------------para que caiga el enemigo------------------------------------------------
        var alto = enemig.offsetTop;
        alto+=velocEnemigo;
        enemig.style.top = alto + "px";
        var distanciaPj = sakura.offsetTop;
        var altoSakura = sakura.offsetHeight;
        if(alto+velocEnemigo>=distanciaPj+(altoSakura/2)){
            var topEne = enemig.offsetTop;
            var izqEne = enemig.offsetLeft;
            enemig.remove();
            var enemigoSuelo = document.createElement("img");
            enemigoSuelo.setAttribute("src", "img/gif/kerosentado.gif");
            enemigoSuelo.style.left = izqEne + "px";
            enemigoSuelo.style.top = topEne + "px";
            enemigoSuelo.setAttribute("class", "enemigoSuelo");
            enemigoSuelo.style.display = "block";
            CUERPO.append(enemigoSuelo);
            setTimeout(eneSueloDesaparece, 2000);
            function eneSueloDesaparece(){
                enemigoSuelo.remove();
            }
            var vidas = document.getElementsByClassName("vida");
            if(vidas.length != 1){//----------------------------para que se borren las vidas cada vez que uno llega al suelo--------------------------------
            var borrarV = vidas.length - 1;
            vidas[borrarV].remove();//----------------------------------------------------------------------------------------------------------------------
            }else{
                location.href="../PaginaFinal/final.html";
            };
            if(puntuacion>=20){
                clearInterval(tempoCaida);
            };
        };
    },30);
},2000);

