/* ============================================================
   UD1 · Ejercicios propuestos
   1) Simulador de apuestas con dados
   2) Calculadora de IMC con seguimiento de progreso
   ============================================================ */

console.log('--- Ejercicio 1: Simulador de apuestas con dados ---');

const apuestaTexto = "10";
const apuesta = Number(apuestaTexto);
let saldo = 100;

for (let ronda = 1; ronda <= 10; ronda++) {
  const dado1 = Math.floor(Math.random() * 6) + 1;
  const dado2 = Math.floor(Math.random() * 6) + 1;
  const suma = dado1 + dado2;

  saldo -= apuesta; // se arriesga la apuesta al empezar la ronda

  if (suma === 7) {
    saldo += apuesta * 3; // triple: recupera la apuesta y gana el doble
  } else if (suma % 2 === 0) {
    saldo += apuesta * 2; // doble: recupera la apuesta y gana lo mismo
  }
  // si no entra en ninguna condición, la apuesta ya se ha perdido

  console.log('Ronda ' + ronda + ': dados [' + dado1 + ', ' + dado2 + '] suma ' + suma + ' - saldo: ' + saldo);

  if (saldo <= 0) {
    console.log('Te has quedado sin saldo');
    break;
  }
}

console.log('Saldo final: ' + saldo);
if (saldo > 100) {
  console.log('Terminas en beneficio');
} else if (saldo < 100) {
  console.log('Terminas en pérdidas');
} else {
  console.log('Terminas sin ganar ni perder');
}


console.log('--- Ejercicio 2: Calculadora de IMC con seguimiento ---');

const pesoTexto = "82.5";
const alturaTexto = "1.78";

let peso = Number(pesoTexto);
const altura = Number(alturaTexto);

let imc = Math.round((peso / (altura * altura)) * 10) / 10;
let clasificacion;

if (imc < 18.5) {
  clasificacion = 'Bajo peso';
} else if (imc <= 24.9) {
  clasificacion = 'Normal';
} else if (imc <= 29.9) {
  clasificacion = 'Sobrepeso';
} else {
  clasificacion = 'Obesidad';
}

console.log('IMC inicial: ' + imc + ' (' + clasificacion + ')');

for (let vuelta = 1; vuelta <= 15; vuelta++) {
  peso -= 1;
  imc = Math.round((peso / (altura * altura)) * 10) / 10;

  if (imc < 18.5) {
    clasificacion = 'Bajo peso';
  } else if (imc <= 24.9) {
    clasificacion = 'Normal';
  } else if (imc <= 29.9) {
    clasificacion = 'Sobrepeso';
  } else {
    clasificacion = 'Obesidad';
  }

  console.log('Vuelta ' + vuelta + ': peso ' + peso + 'kg - IMC ' + imc + ' (' + clasificacion + ')');

  if (clasificacion === 'Normal') {
    console.log('IMC normal alcanzado en la vuelta ' + vuelta);
    break;
  }
}
