var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "darkblue";

// madera
ctx.lineWidth = 8;
ctx.strokeStyle="darkblue";

ctx.beginPath();
ctx.moveTo(40, 340);
ctx.lineTo(350, 340);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(90, 340);
ctx.lineTo(90, 10);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(86, 10);
ctx.lineTo(280, 10);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(276, 10);
ctx.lineTo(276, 50);
ctx.stroke();

ctx.beginPath();
ctx.arc(274, 90, 40, 0, 2 * Math.PI);
ctx.stroke();
//cuerpo
ctx.fillRect(270, 130, 8, 120);
//brazo derecho
ctx.beginPath();
ctx.moveTo(274, 140);
ctx.lineTo(324, 200);
//brazo izquierdo
ctx.moveTo(274, 140);
ctx.lineTo(224, 200);
ctx.stroke();
//pierna derecha
ctx.beginPath();
ctx.moveTo(274, 246);
ctx.lineTo(324, 316);
//pierna izquierda
ctx.moveTo(274, 246);
ctx.lineTo(224, 316);
ctx.stroke();

// variables globales
var errores;
var record;
var listaPalabras = ['comer', 'beber', 'comiendo', 'espalda'];
var palabra;

//! funcionalidades
// * generar palabra aleatoria de la lista de palabras
// TODO: agregar palabra a la lista, verificar que no se repita
// TODO: funciones de botones
// TODO: boton nuevo juego
// TODO: boton agregar palabra
// TODO: boton desistir
// TODO: boton cancelar
// * crear div por cada letra
// TODO: verificar las letras ingresadas 

function palabraAleatoria(){
    palabra = listaPalabras[(Math.floor(Math.random()*listaPalabras.length))].toUpperCase();
}

function crearElemento () {

    var nuevoDiv=[];
    var padre = document.getElementById('palabra');

    // var letras = palabra.split('');

    for(var i=0; i<palabra.length; i++){
        nuevoDiv[i] = document.createElement("div");
        nuevoDiv[i].className = 'letra';
        padre.appendChild(nuevoDiv[i]);
        //document.getElementsByClassName("letra")[i].innerHTML = letras[i];
    } 

}


palabraAleatoria();
crearElemento();
