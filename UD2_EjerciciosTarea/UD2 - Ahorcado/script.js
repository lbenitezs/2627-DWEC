/* UD2 · Ahorcado  · Solución */

function Juego(palabra) {
  this.palabra = palabra;
  this.letrasUsadas = [];
  this.intentosRestantes = 6;
}

Juego.prototype.intentarLetra = function(letra) {
  this.letrasUsadas.push(letra);
  if (!this.palabra.includes(letra)) {
    this.intentosRestantes--;
  }
};

Juego.prototype.mostrarPalabra = function() {
  let visible = '';
  for (let i = 0; i < this.palabra.length; i++) {
    const letra = this.palabra[i];
    visible += this.letrasUsadas.includes(letra) ? letra : '_';
  }
  return visible;
};

Juego.prototype.haGanado = function() {
  return this.mostrarPalabra().indexOf('_') === -1;
};

Juego.prototype.haPerdido = function() {
  return this.intentosRestantes <= 0;
};

// ----- Partida 1: secuencia de letras que hace ganar -----
const palabras = ['javascript', 'ordenador', 'funcion', 'variable', 'arreglo'];
const palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];

let letrasUnicas = [];
for (let i = 0; i < palabraSecreta.length; i++) {
  const letra = palabraSecreta[i];
  if (!letrasUnicas.includes(letra)) letrasUnicas.push(letra);
}

const juego1 = new Juego(palabraSecreta);
let indice = 0;
while (!juego1.haGanado() && !juego1.haPerdido() && indice < letrasUnicas.length) {
  const letra = letrasUnicas[indice];
  juego1.intentarLetra(letra);
  console.log(letra, juego1.mostrarPalabra(), juego1.intentosRestantes);
  indice++;
}
console.log(juego1.haGanado() ? 'Ganado' : 'Perdido');

// ----- Partida 2: seis letras que NO están en la palabra -> pierde -----
const juego2 = new Juego(palabraSecreta);
const letrasFalladas = [];
const abecedario = 'abcdefghijklmnopqrstuvwxyz';
for (let i = 0; i < abecedario.length && letrasFalladas.length < 6; i++) {
  if (!palabraSecreta.includes(abecedario[i])) letrasFalladas.push(abecedario[i]);
}
let j = 0;
while (!juego2.haGanado() && !juego2.haPerdido() && j < letrasFalladas.length) {
  juego2.intentarLetra(letrasFalladas[j]);
  console.log(letrasFalladas[j], juego2.mostrarPalabra(), juego2.intentosRestantes);
  j++;
}
console.log(juego2.haGanado() ? 'Ganado' : 'Perdido');
