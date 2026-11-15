// 1. Seleccionamos los controles y los lugares donde mostramos los valores
const rojo = document.querySelector('#rojo');
const verde = document.querySelector('#verde');
const azul = document.querySelector('#azul');

const valorRojo = document.querySelector('#valorRojo');
const valorVerde = document.querySelector('#valorVerde');
const valorAzul = document.querySelector('#valorAzul');
const texto = document.querySelector('#texto');

// 2. Leemos los tres deslizadores, mostramos sus valores y cambiamos el fondo
function actualizarColor() {
  const color = 'rgb(' + rojo.value + ', ' + verde.value + ', ' + azul.value + ')';

  valorRojo.textContent = rojo.value;
  valorVerde.textContent = verde.value;
  valorAzul.textContent = azul.value;
  texto.textContent = color;

  document.body.style.backgroundColor = color;
}

// 3. El evento "input" se dispara MIENTRAS se arrastra (change solo al soltar)
[rojo, verde, azul].forEach((control) => {
  control.addEventListener('input', actualizarColor);
});

// 4. Pintamos el color inicial
actualizarColor();
