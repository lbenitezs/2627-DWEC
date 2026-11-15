// 1. Seleccionamos los elementos
const pantalla = document.querySelector('#tiempo');
const btnIniciar = document.querySelector('#btnIniciar');
const btnPausar = document.querySelector('#btnPausar');
const btnReiniciar = document.querySelector('#btnReiniciar');

// 2. Estado: segundos transcurridos y el identificador del temporizador
//    (null = el cronómetro está parado)
let segundos = 0;
let temporizador = null;

// 3. Añade un cero delante si el número tiene una sola cifra (5 -> "05")
function dosCifras(numero) {
  return String(numero).padStart(2, '0');
}

// 4. Convierte los segundos totales a "HH:MM:SS" y lo muestra
function mostrar() {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const resto = segundos % 60;
  pantalla.textContent = dosCifras(horas) + ':' + dosCifras(minutos) + ':' + dosCifras(resto);
}

// 5. Iniciar: solo crea el temporizador si no hay uno en marcha
//    (si no, cada clic crearía otro y el tiempo iría cada vez más rápido)
function iniciar() {
  if (temporizador !== null) return;
  temporizador = setInterval(() => {
    segundos++;
    mostrar();
  }, 1000);
}

// 6. Pausar: detiene el temporizador pero conserva los segundos
function pausar() {
  clearInterval(temporizador);
  temporizador = null;
}

// 7. Reiniciar: detiene y vuelve a cero
function reiniciar() {
  pausar();
  segundos = 0;
  mostrar();
}

btnIniciar.addEventListener('click', iniciar);
btnPausar.addEventListener('click', pausar);
btnReiniciar.addEventListener('click', reiniciar);
