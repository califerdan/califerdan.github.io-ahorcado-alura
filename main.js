var contenedorPalabra = document.getElementById('palabra');
var botonIniciar = document.getElementById('boton-iniciar');
var botonAgregarPalabra = document.getElementById('boton-agregar');
var botonNuevoJuego = document.getElementById('nuevo-juego');
var botonDesistir = document.getElementById('desistir');
var botonGuargarPalabra = document.getElementById('boton-guardar-palabra');
var botonCancelar = document.getElementById('boton-cancelar');
var paginaInicio = document.getElementById('pagina-inicio');
var paginaJuego = document.getElementById('pagina-juego');
var paginaAgregarPalabra = document.getElementById('pagina-agregar-palabra');
var palabraIngresada = document.getElementById('nueva-palabra');
var letrasIncorrectas = document.getElementById('letras-incorrectas');

botonIniciar.onclick = iniciar;
botonAgregarPalabra.onclick = agregarPalabra;
botonNuevoJuego.onclick = nuevoJuego;
botonDesistir.onclick = desistir;
botonGuargarPalabra.onclick = guardarPalabra;
botonCancelar.onclick = cancelar;

// variables globales
var errores; 
var listaPalabras = ['gato', 'ñandu', 'conejo', 'gusano', 'araña', 'hiena','cangrejo', 'caballo','perro','avestruz','oveja','kiwi','orca','delfin','raton','rana','lobo','mono','simio','elefante','flamenco','gacela','gorila','bisonte','buho','coyote','hamster','iguana','nutria','marmota','pantera','pelicano','vicuña','tortuga'];
var palabra;
var contenedorLetra;
var letrasUsadas;
var primerJuego = true;
var aciertos;
var letrasUsadasIncorrectas;

function dibujarMuneco(cantErrores){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.width= '80%';
    ctx.height= '100%';
    ctx.lineWidth = 8;
    ctx.strokeStyle="darkblue";
    
    switch(cantErrores){
       case 0: 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle="#762E1F";
        ctx.moveTo(40, 340);
        ctx.lineTo(350, 340);
        ctx.stroke();
        break;
       case 1: 
        ctx.beginPath();
        ctx.strokeStyle="#762E1F";
        ctx.moveTo(90, 340);
        ctx.lineTo(90, 10);
        ctx.moveTo(60, 340);
        ctx.lineTo(90, 280);
        ctx.moveTo(120, 340);
        ctx.lineTo(90, 280);
        ctx.stroke(); break; 
       case 2: 
        ctx.beginPath();
        ctx.strokeStyle="#762E1F";
        ctx.moveTo(86, 10);
        ctx.lineTo(280, 10);
        ctx.moveTo(88, 60);
        ctx.lineTo(146, 10);
        ctx.stroke();break; 
       case 3:
        ctx.beginPath();
        ctx.strokeStyle="#762E1F";
        ctx.moveTo(276, 10);
        ctx.lineTo(276, 50);
        ctx.stroke(); break; 
       case 4: 
        ctx.beginPath();
        ctx.arc(276, 90, 40, 0, 2 * Math.PI);
        ctx.stroke();break; 
       case 5: 
        ctx.moveTo(276, 130);
        ctx.lineTo(276, 250);
        ctx.stroke(); break; 
       case 6:
        ctx.beginPath();
        ctx.moveTo(276, 140);
        ctx.lineTo(326, 200); 
        ctx.stroke(); break; 
       case 7:
        ctx.moveTo(276, 140);
        ctx.lineTo(226, 200);
        ctx.stroke(); break; 
       case 8: 
        ctx.moveTo(276, 246);
        ctx.lineTo(326, 316);
        ctx.stroke(); break; 
       case 9: 
        ctx.moveTo(276, 246);
        ctx.lineTo(226, 316);
        ctx.stroke(); break; 
    }
}

//! funcionalidades
// * generar palabra aleatoria de la lista de palabras
// * agregar palabra a la lista, verificar que no se repita
// * funciones de botones
// * boton nuevo juego
// * boton nuevo juego en pagina de inicio
// * boton agregar palabra
// * boton desistir
// * boton cancelar
// * crear div por cada letra
// * verificar las letras ingresadas 
// TODO: evento/mensaje cuando gana cuando pierde
// TODO: animacion/colores muñeco
// TODO: responsive
// TODO: tablet
// TODO: movil
// TODO: Titulo que vuelva al inicio
// TODO: que se guarde la palabra en el localstorage
// * fuentes - colores
// * redes sociales - pie de pagina

function crearElemento () {   
    palabra = listaPalabras[(Math.floor(Math.random()*listaPalabras.length))].toUpperCase();
    contenedorLetra=[];
    for(var i=0; i<palabra.length; i++){
        contenedorLetra[i] = document.createElement("div");
        contenedorLetra[i].className = 'letra';
        contenedorPalabra.appendChild(contenedorLetra[i]);
    } 
}

function reiniciarValores(){
    errores=0;
    letrasUsadas=[];
    aciertos=0;
    letrasIncorrectas.innerHTML ='';
    letrasUsadasIncorrectas=[];
    dibujarMuneco(0);
    if(!primerJuego){
        resetearZonaPalabra();
    }
    primerJuego = false;
}
function nuevoJuego(){
    reiniciarValores();
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
        letrasIncorrectas.innerHTML ='';
        letrasUsadasIncorrectas.push(letra);
        for(var i=0; i<letrasUsadasIncorrectas.length; i++){
            letrasIncorrectas.innerHTML += letrasUsadasIncorrectas[i] +' '; 
        }
    }
    if(errores>8){
        finJuegoPerdiste();
    }
}

function finJuegoPerdiste(){
    mostrarPalabra();    
    console.log('fin del juego, perdiste');
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

function desistir(){
    finJuegoPerdiste();
    for(var i=1; i<10; i++){
        dibujarMuneco(i);
    }
}

function iniciar(){
    paginaInicio.style.display = 'none';
    paginaAgregarPalabra.style.display = 'none';
    paginaJuego.style.display = 'flex';
    nuevoJuego();
}

function agregarPalabra(){
    paginaInicio.style.display = 'none';
    paginaJuego.style.display = 'none';
    paginaAgregarPalabra.style.display = 'flex';
    palabraIngresada.value='';
}

function cancelar(){
    paginaAgregarPalabra.style.display = 'none';
    paginaJuego.style.display = 'none';
    paginaInicio.style.display = 'flex';
}

function guardarPalabra(){
    var nuevaPalabra = palabraIngresada.value;
    if(nuevaPalabra.match(/^[a-zñ]$/i)){
    if(!listaPalabras.includes(nuevaPalabra.toLowerCase())){
        listaPalabras.push(nuevaPalabra);
        alert('correcto');
    }
    else{
        alert('palabra ya ingresada');
    }
}

    palabraIngresada.value='';
    iniciar();
}