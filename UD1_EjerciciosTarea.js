/* ============================================================
   UD1 · Ejercicios Tarea
   Solución completa (los 5 ejercicios en un único archivo)

   ============================================================ */


/* ------------------------------------------------------------
   Ejercicio 1 — Variables y tipos
   ------------------------------------------------------------ */
console.log('--- Ejercicio 1: Variables y tipos ---');

const titulo = 'StarWars';        // título de la película (string)
const duracionMinutos = 121;          // duración en minutos (number)
const disponibleEnStreaming = false;  // ¿está en streaming? (boolean)

console.log(titulo, typeof titulo);
console.log(duracionMinutos, typeof duracionMinutos);
console.log(disponibleEnStreaming, typeof disponibleEnStreaming);


/* ------------------------------------------------------------
   Ejercicio 2 — Conversión y operadores
   ------------------------------------------------------------ */
console.log('\n--- Ejercicio 2: Conversión y operadores ---');

const temperaturaTexto = "23.4";

// 1. Convertimos el texto a número (conversión explícita)
const temperatura = Number(temperaturaTexto);

// 2. Aplicamos la fórmula F = C * 9/5 + 32
const fahrenheit = temperatura * 9 / 5 + 32;

// 3. Redondeamos a 1 decimal: multiplicar por 10, redondear, dividir por 10
const resultadoF = Math.round(fahrenheit * 10) / 10;

console.log(resultadoF); // 74.1


/* ------------------------------------------------------------
   Ejercicio 3 — Decisiones simples
   (cambia el valor de velocidad para probar cada caso)
   ------------------------------------------------------------ */
console.log('\n--- Ejercicio 3: Decisiones simples ---');

const velocidad = 128;

if (velocidad > 140) {
  console.log('Multa grave');
} else if (velocidad > 120) {
  console.log('Multa');
} else if (velocidad > 100) {
  console.log('Aviso');
} else {
  console.log('Correcto');
}
// Con 128 se muestra: Multa


/* ------------------------------------------------------------
   Ejercicio 4 — Bucles
   ------------------------------------------------------------ */
console.log('\n--- Ejercicio 4: Bucles ---');

const n = 20;

// Versión con for
console.log('Versión con for:');
let paresFor = 0;
for (let i = 1; i <= n; i++) {
  if (i % 2 === 0) {
    console.log(i);
    paresFor++;
  }
}
console.log('Total de pares (for):', paresFor); // 10

// Versión con while
console.log('Versión con while:');
let paresWhile = 0;
let j = 1;
while (j <= n) {
  if (j % 2 === 0) {
    console.log(j);
    paresWhile++;
  }
  j++; // sin este incremento, el bucle no terminaría nunca
}
console.log('Total de pares (while):', paresWhile); // 10


/* ------------------------------------------------------------
   Ejercicio 5 — Combinando todo: números primos del 1 al 50
   ------------------------------------------------------------ */
console.log('\n--- Ejercicio 5: Números primos ---');

let totalPrimos = 0;

// Empezamos en 2: el 1 no se considera primo
for (let numero = 2; numero <= 50; numero++) {
  let esPrimo = true;

  // Buscamos algún divisor entre 2 y numero - 1
  for (let divisor = 2; divisor < numero; divisor++) {
    if (numero % divisor === 0) {
      esPrimo = false;
      break; // con un divisor basta: no hace falta seguir buscando
    }
  }

  if (esPrimo) {
    console.log(numero);
    totalPrimos++;
  }
}

console.log('Total de números primos entre 1 y 50:', totalPrimos); // 15
