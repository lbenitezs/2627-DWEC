// 1. Seleccionamos los elementos
const formulario = document.querySelector('#formulario');
const campo = document.querySelector('#nuevaTarea');
const lista = document.querySelector('#lista');

// 2. Crea un <li> con casilla, texto y botón de eliminar
function crearTarea(texto) {
  const li = document.createElement('li');

  const casilla = document.createElement('input');
  casilla.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = texto;

  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar';

  // Marcar / desmarcar como completada
  casilla.addEventListener('change', () => {
    li.classList.toggle('completada', casilla.checked);
  });

  // Eliminar la tarea de la lista
  btnEliminar.addEventListener('click', () => {
    li.remove();
  });

  li.append(casilla, span, btnEliminar);
  return li;
}

// 3. Añadir una tarea al enviar el formulario (botón o tecla Enter)
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();             // evita que la página se recargue

  const texto = campo.value.trim();
  if (texto === '') return;            // no añadimos tareas vacías

  lista.append(crearTarea(texto));
  campo.value = '';
  campo.focus();
});
