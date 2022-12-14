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
var volverInicio = document.getElementById('volver-inicio');

volverInicio.onclick = cancelar;
botonIniciar.onclick = iniciar;
botonAgregarPalabra.onclick = agregarPalabra;
botonNuevoJuego.onclick = nuevoJuego;
botonDesistir.onclick = desistir;
botonGuargarPalabra.onclick = guardarPalabra;
botonCancelar.onclick = cancelar;

var errores; 
var listaPalabras = ['gato', 'ñandu', 'conejo', 'gusano', 'araña', 'hiena','cangrejo', 'caballo','perro','avestruz','oveja','kiwi','orca','delfin','raton','rana','lobo','mono','simio','elefante','flamenco','gacela','gorila','bisonte','buho','coyote','hamster','iguana','nutria','marmota','pantera','pelicano','vicuña','tortuga'];
var palabra;
var contenedorLetra;
var letrasUsadas;
var primerJuego = true;
var aciertos;
var letrasUsadasIncorrectas;
var anchoPantalla = screen.width;

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

function resultadoJuego(resultado){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.font = "70px Inter";
    ctx.fillStyle = 'black';
    ctx.fillRect(0,canvas.height/2-50,canvas.width,100);
    ctx.stroke();
    switch(resultado){
        case 'perdiste':
            ctx.fillStyle = 'red';
            ctx.fillText("PERDISTE",28,canvas.height/2+25);
            break;
        case 'ganaste':
            ctx.fillStyle = 'greenyellow';
            ctx.fillText("GANASTE",28,canvas.height/2+25);
            break;
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
// * evento/mensaje cuando gana cuando pierde
// * colores muñeco
// * responsive
// * tablet
// * movil
// * boton que vuelva al inicio
// * fuentes - colores
// * redes sociales - pie de pagina
// * icono

function crearGuiones() {   
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
    botonDesistir.disabled = false;
    dibujarMuneco(0);
    if(!primerJuego){
        resetearZonaPalabra();
    }
}

function nuevoJuego(){
    volverInicio.style.visibility='visible';
    reiniciarValores();
    palabra = listaPalabras[(Math.floor(Math.random()*listaPalabras.length))].toUpperCase();
    crearGuiones();
        if(anchoPantalla<=1023 && primerJuego){
            mostrarTeclado();
            verificarLetraTeclado();
        }
        else{
            if(anchoPantalla<=1023){
            verificarLetraTeclado();
            }
            else{
                document.addEventListener('keydown',verificarLetra);
            }
        }
        primerJuego = false;
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
    resultadoJuego('ganaste');
    botonDesistir.disabled = true;
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
    resultadoJuego('perdiste');
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
    for(var i=1; i<10; i++){
        dibujarMuneco(i);
    }
    finJuegoPerdiste();
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
    volverInicio.style.visibility='hidden';
}

function guardarPalabra(){
    var nuevaPalabra = palabraIngresada.value;
    if(nuevaPalabra.match(/[a-zñ]$/i)){
        if(!listaPalabras.includes(nuevaPalabra.toLowerCase())){
            listaPalabras.push(nuevaPalabra);
            iniciar();
        }
        else{
            alert('Palabra ya ingresada');
        }  
    }
}

function mostrarTeclado(){
    var teclado = document.getElementById('teclado');
    var contenedorTecla=[];
    var cadenaLetras = 'qwertyuiopasdfghjklñzxcvbnm';
        for(var i=0; i<cadenaLetras.length; i++){
            contenedorTecla[i] = document.createElement("button");
            contenedorTecla[i].className = 'tecla';
            contenedorTecla[i].innerHTML = cadenaLetras.charAt(i).toUpperCase();
            // contenedorTecla[i].style.fontWeight = '700';
            teclado.appendChild(contenedorTecla[i]);
            if(i===20){
                contenedorTecla[i].className = 'tecla item';
            }
        } 
}

function verificarLetraTeclado (){
    var tecla = document.getElementsByClassName('tecla');
    for(i=0 ; i<tecla.length ; i++){
        tecla[i].addEventListener("click", validacionTecla);
        tecla[i].disabled = false;
        tecla[i].style.backgroundColor = 'rgb(170, 222, 235)';
        tecla[i].style.color = 'black';
    }
}   

function validacionTecla(event){
    const teclaPresionada = event.target;
    teclaPresionada.style.backgroundColor = '#D51C1C';
    teclaPresionada.style.color = 'white';
    teclaPresionada.disabled = true;
    const tecla = teclaPresionada.innerHTML;
    if(palabra.includes(tecla)){
        letraCorrecta(tecla);
    }
    else{
        letraIncorrecta(tecla);
    }
}