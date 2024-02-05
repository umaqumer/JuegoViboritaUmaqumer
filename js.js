var filas = 12;
var columnas = 12;
var m = [];
var v1=[0,0,0];
var v2=[0,1,2];
var fr = "";
var finalizar = 0;
var iau = 0;var jau=2;var contarFrutosComidos = 0;
document.getElementById("frutosComidos").innerHTML = "<h3 style='color:orange'>Puntos: " + contarFrutosComidos + "</h3>";
verificarChoqueFruto();
pantalla();
function reiniciar(){
  v1=[0,0,0];
  v2=[0,1,2];
  fr = "";
  contarFrutosComidos = 0;
  finalizar = 0;
  iau = 0;jau=2;
  document.getElementById("frutosComidos").innerHTML = "<h3 style='color:orange'>Puntos: " + contarFrutosComidos + "</h3>";
  verificarChoqueFruto();
  pantalla();
}
document.addEventListener("keydown", function(event) {
  if(finalizar == 0){
    switch(event.code) {
       case "ArrowUp":
          iau = iau-1;
         mover = "arriba";
         eliminarAumentar();
         break;
       case "ArrowDown":
          iau=iau+1;
          mover = "abajo";
          eliminarAumentar();
         break;
       case "ArrowLeft":
         jau=jau-1;
         mover = 'izquierda';
         eliminarAumentar();
         break;
       case "ArrowRight":
         jau=jau+1;
         mover = 'derecha';
         eliminarAumentar();
         break;
     }
  }
 });

function eliminarAumentar(){
  v1.push(iau);v2.push(jau);//añadimos una nueva posicion a la cabeza
  var r = verificarChoqueMuro();
  if(r==1){alert("choque con el muro");alert("juego finalizado");return;}
  r = verificarChoqueCuerpo();
  if(r==1){alert("choque inesperado");alert("juego finalizado");return;}
  var comer = ComioVibora();
  if(comer == "comio"){
    contarFrutosComidos++;
    document.getElementById("frutosComidos").innerHTML = "<h3 style='color:orange'>Puntos: " + contarFrutosComidos + "</h3>";
    verificarChoqueFruto();//generar un nuevo fruto
    //v1.push(fr[0]);v2.push(fr[1]);//añadimos una nueva posicion a la cabeza
  }else{
    v1.shift();v2.shift();//eliminamos de la cola
  }
  var miDiv = document.getElementById("cuerpo");//eliminamos el div
  miDiv.innerHTML = "";
  pantalla();//mostramos la nueva serpiente
}


function pantalla(){
  crearMatriz();
  visualizarPantalla();
}
//funcion para ingresar  a la matrix los botones
  // Crear la matriz bidimensional de forma automática
function crearMatriz(){
  for (var i = 0; i < filas; i++) {
    m[i] = [];
    for (var j = 0; j < columnas; j++) {
      // Inicializar cada elemento con valores automáticos (por ejemplo, i * columnas + j + 1)
      var existe = 0;
      for(var k=0;k<v1.length;k++){
        if(i == v1[k] && j== v2[k]){
          m[i][j] = " <span style=' border: 2px solid white;background-color:red'>&nbsp;&nbsp;&nbsp;&nbsp;</span>";
          existe = 1;
        }
      }
      if(existe == 0){
        if(i == fr[0] && j == fr[1]){
          m[i][j] = " <span style=' border: 2px solid white;background-color:green'>&nbsp;&nbsp;&nbsp;&nbsp;</span>";
        }else{
          m[i][j] = " <span style=' border: 2px solid white;background-color:black'>&nbsp;&nbsp;&nbsp;&nbsp;</span>";
        }
      }
    }
  }
}

function visualizarPantalla(){
  // Obtener el div donde mostrar la matriz
   var miDiv = document.getElementById("cuerpo");
   // Crear el contenido de texto para mostrar la matriz
   var contenidoTexto = "";

   for (var i = 0; i < filas; i++) {
     for (var j = 0; j < columnas; j++) {
       contenidoTexto += m[i][j]+" ";
     }
     contenidoTexto += "<br>";
   }
   // Asignar el contenido de texto al div
   miDiv.innerHTML = contenidoTexto;
}

function fruto() {
  return [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)];
}


function verificarChoqueFruto(){
    fr = fruto();//generamos el fruto
    var ee = "";//verificamos si no choca con el cuerpo de la vibora
    for(var k=0;k<v1.length;k++){
      if(v1[k] == fr[0] && v2[k] == fr[1]){
        ee="choque";
        break;
      }
    }
    if(ee == "choque"){
      verificarChoqueFruto();
    }
}

function  ComioVibora(){
  var come = "no comio";
  if(v1[v1.length-1] == fr[0] && v2[v1.length-1] == fr[1]){
    come = "comio";
  }
  return come;
}
function verificarChoqueCuerpo(){
  var si = "no";
  for(var k=0;k<v1.length-1;k++){
    if(iau == v1[k] && jau == v2[k]){
      si = "si";
    }
  }
  if(si== "si"){
    finalizar = 1;
    return 1;
  }
}
function verificarChoqueMuro(){
  if(iau<0 || jau<0){
    finalizar = 1;
    return 1;
  }
  if(iau>=filas || jau>=columnas){
    finalizar = 1;
    return 1;
  }
}
