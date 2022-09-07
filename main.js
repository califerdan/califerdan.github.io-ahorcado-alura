
function dibujarMuneco(cantErrores){
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "darkblue";
    ctx.width= '80%';
    ctx.height= '100%';
    // madera
    ctx.lineWidth = 8;
    ctx.strokeStyle="darkblue";
    
    switch(cantErrores){
        case 0: 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.beginPath();
        ctx.moveTo(40, 340);
        ctx.lineTo(350, 340);
        ctx.stroke();
        break;
       case 1: 
        ctx.beginPath();
        ctx.moveTo(90, 340);
        ctx.lineTo(90, 10);
        ctx.stroke(); break; 
       case 2: 
        ctx.beginPath();
        ctx.moveTo(86, 10);
        ctx.lineTo(280, 10);
        ctx.stroke();break; 
       case 3:
        ctx.beginPath();
        ctx.moveTo(276, 10);
        ctx.lineTo(276, 50);
        ctx.stroke(); break; 
       case 4: 
        ctx.beginPath();
        ctx.arc(274, 90, 40, 0, 2 * Math.PI);
        ctx.stroke();break; 
       case 5: 
        ctx.fillRect(270, 130, 8, 120);
        ctx.stroke(); break; 
       case 6:
        ctx.beginPath();
        ctx.moveTo(274, 140);
        ctx.lineTo(324, 200); 
        ctx.stroke(); break; 
       case 7:
        ctx.moveTo(274, 140);
        ctx.lineTo(224, 200);
        ctx.stroke(); break; 
       case 8: 
        ctx.moveTo(274, 246);
        ctx.lineTo(324, 316);
        ctx.stroke(); break; 
       case 9: ctx.moveTo(274, 246);
        ctx.lineTo(224, 316);
        ctx.stroke(); break; 
    }
}

var contenedorPalabra = document.getElementById('palabra');
var botonNuevoJuego = document.getElementById('nuevo-juego');

botonNuevoJuego.onclick = nuevoJuego;

// variables globales
var errores;
var listaPalabras = ['gato', 'ñandu', 'conejo', 'gusano', 'araña', 'hiena','cangrejo', 'caballo'];
var palabra;
var letra;
var contenedorLetra;
var letrasUsadas;
var primerJuego = true;
var aciertos;

//! funcionalidades
// * generar palabra aleatoria de la lista de palabras
// TODO: agregar palabra a la lista, verificar que no se repita
// TODO: funciones de botones
// * boton nuevo juego
// TODO: boton agregar palabra
// TODO: boton desistir
// TODO: boton cancelar
// * crear div por cada letra
// TODO: verificar las letras ingresadas 


function crearElemento () {   
    palabra = listaPalabras[(Math.floor(Math.random()*listaPalabras.length))].toUpperCase();
    contenedorLetra=[];
    for(var i=0; i<palabra.length; i++){
        contenedorLetra[i] = document.createElement("div");
        contenedorLetra[i].className = 'letra';
        contenedorPalabra.appendChild(contenedorLetra[i]);
    } 
}

function nuevoJuego(){
    errores=0;
    letrasUsadas=[];
    aciertos=0;
    dibujarMuneco(0);
    if(!primerJuego){
        resetearZonaPalabra();
    }
    primerJuego = false;
    crearElemento();
    document.addEventListener('keydown',verificarLetra);
}

function verificarLetra(event){
    letraIngresada = event.key.toUpperCase();
    if(letraIngresada.match(/^[a-zñ]$/i)){
        if(palabra.includes(letraIngresada)){
            letraCorrecta(letraIngresada);  
        }
        else{
            letraIncorrecta(letraIngresada);
        }
    }  
}

function letraCorrecta(letra){
 for(var i=0; i<palabra.length; i++){
    if(letra==(palabra.charAt(i))){
        contenedorLetra[i].innerHTML = letra;
        if(!(letrasUsadas.includes(letra))){
            aciertos++;
        }
    }
 }
 letrasUsadas.push(letra);
 if(aciertos==(palabra.length)){
    finJuegoGanaste();
 }
}

function finJuegoGanaste(){
    console.log('ganaste');
    document.removeEventListener('keydown', verificarLetra);
}

function letraIncorrecta(letra){
    if(!(letrasUsadas.includes(letra))){
        errores++;
        letrasUsadas.push(letra);
        dibujarMuneco(errores);
    }
    if(errores>8){
        finJuegoPerdiste();
    }
}

function finJuegoPerdiste(){
    mostrarPalabra();    
    console.log('fin del juego');
    document.removeEventListener('keydown', verificarLetra);
}

function resetearZonaPalabra(){
    for(var i=0; i<palabra.length; i++){
        contenedorLetra[i].remove();
    }
}

function mostrarPalabra(){
    for(var i=0; i<palabra.length; i++){
            contenedorLetra[i].innerHTML = palabra.charAt(i);
     }
}