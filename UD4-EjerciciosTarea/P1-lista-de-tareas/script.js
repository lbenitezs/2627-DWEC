// ---------------------------------------------------------------
// Lista de tareas 2.0 · UD4 (SOLUCIÓN)
// ---------------------------------------------------------------

const form = document.querySelector('#form-tarea');
const campo = document.querySelector('#tarea');
const mensaje = document.querySelector('#mensaje');
const lista = document.querySelector('#lista');
const contador = document.querySelector('#contador');
const filtros = document.querySelector('#filtros');

/**
 * Valida el texto de una tarea nueva.
 * @param {string} texto - Texto escrito, sin espacios sobrantes.
 * @returns {string} Mensaje de error, o '' si es válida.
 */
function validarTarea(texto) {
  if (texto === '') return 'Escribe una tarea.';
  if (texto.length < 3) return 'La tarea debe tener al menos 3 caracteres.';

  const repetida = Array.from(lista.querySelectorAll('li span'))
    .some((span) => span.textContent.toLowerCase() === texto.toLowerCase());
  if (repetida) return 'Esa tarea ya está en la lista.';

  return '';
}

/**
 * Muestra (o limpia) el mensaje de error junto al campo.
 * @param {string} texto - Mensaje de error; '' lo limpia.
 */
function mostrarMensaje(texto) {
  mensaje.textContent = texto;
  campo.classList.toggle('invalido', texto !== '');
}

/**
 * Crea una tarea y la añade al final de la lista.
 * @param {string} texto - Texto de la tarea.
 */
function crearTarea(texto) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = texto;

  const borrar = document.createElement('button');
  borrar.type = 'button';
  borrar.className = 'borrar';
  borrar.setAttribute('aria-label', 'Borrar tarea');
  borrar.textContent = '✕';

  li.append(span, borrar);
  lista.append(li);
}

/**
 * Actualiza el texto con las tareas que quedan por hacer.
 */
function actualizarContador() {
  const pendientes = lista.querySelectorAll('li:not(.hecha)').length;
  contador.textContent = pendientes === 1
    ? 'Queda 1 tarea pendiente'
    : 'Quedan ' + pendientes + ' tareas pendientes';
}

// PASO 1 y 3 · submit: validar, crear la tarea y dejar el formulario listo
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const texto = campo.value.trim();
  const error = validarTarea(texto);
  mostrarMensaje(error);
  if (error !== '') return;

  crearTarea(texto);
  form.reset();
  campo.focus();
  actualizarContador();
});

// PASO 4 · el error desaparece al escribir; Escape limpia el campo
campo.addEventListener('input', () => mostrarMensaje(''));

campo.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    form.reset();
    mostrarMensaje('');
  }
});

// PASO 5 · delegación: un solo listener atiende a todas las tareas, también a las nuevas
lista.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  if (e.target.closest('button.borrar')) {
    li.remove();
  } else {
    li.classList.toggle('hecha');
  }
  actualizarContador();
});

// AMPLIACIÓN · filtros: solo cambian una clase de la lista (el CSS decide qué se ve)
filtros.addEventListener('click', (e) => {
  const boton = e.target.closest('button[data-filtro]');
  if (!boton) return;

  filtros.querySelectorAll('button').forEach((b) => b.classList.toggle('activo', b === boton));
  lista.className = boton.dataset.filtro === 'todas' ? '' : 'filtro-' + boton.dataset.filtro;
});

actualizarContador();
