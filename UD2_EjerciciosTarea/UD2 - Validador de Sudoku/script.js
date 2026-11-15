/* UD2 · Validador de Sudoku · Solución */

function filaValida(numeros) {
  const vistos = [];
  for (let i = 0; i < numeros.length; i++) {
    const num = numeros[i];
    if (vistos.includes(num)) return false;
    vistos.push(num);
  }
  return true;
}

function columnaValida(tablero, indiceColumna) {
  const columna = [];
  for (let f = 0; f < 9; f++) {
    columna.push(tablero[f][indiceColumna]);
  }
  return filaValida(columna);
}

function cuadranteValido(tablero, filaInicio, colInicio) {
  const valores = [];
  for (let f = filaInicio; f < filaInicio + 3; f++) {
    for (let c = colInicio; c < colInicio + 3; c++) {
      valores.push(tablero[f][c]);
    }
  }
  return filaValida(valores);
}

function tableroValido(tablero) {
  for (let f = 0; f < 9; f++) {
    if (!filaValida(tablero[f])) {
      console.log('Fila ' + f + ' inválida'); return false;
    }
  }
  for (let c = 0; c < 9; c++) {
    if (!columnaValida(tablero, c)) {
      console.log('Columna ' + c + ' inválida'); return false;
    }
  }
  for (let f = 0; f < 9; f += 3) {
    for (let c = 0; c < 9; c += 3) {
      if (!cuadranteValido(tablero, f, c)) {
        console.log('Cuadrante en (' + f + ',' + c + ') inválido'); return false;
      }
    }
  }
  return true;
}

const tableroCorrecto = [
  [5,3,4,6,7,8,9,1,2], [6,7,2,1,9,5,3,4,8], [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3], [4,2,6,8,5,3,7,9,1], [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4], [2,8,7,4,1,9,6,3,5], [3,4,5,2,8,6,1,7,9]
];

console.log(tableroValido(tableroCorrecto)); // true

// ----- Prueba con un tablero inválido: repetimos un número en la primera fila -----
const tableroIncorrecto = tableroCorrecto.map((fila) => fila.slice());
tableroIncorrecto[0][1] = 5;   // la fila 0 ya tenía un 5
console.log(tableroValido(tableroIncorrecto)); // false
