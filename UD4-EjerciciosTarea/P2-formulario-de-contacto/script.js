// ---------------------------------------------------------------
// Formulario de contacto · UD4  (SOLUCIÓN)
// ---------------------------------------------------------------

const form = document.querySelector('#contacto');
const motivo = document.querySelector('#motivo');
const campoOtro = document.querySelector('#campo-otro');
const otro = document.querySelector('#otro');
const mensaje = document.querySelector('#mensaje');
const contador = document.querySelector('#contador');
const acepto = document.querySelector('#acepto');
const enviar = document.querySelector('#enviar');
const resumen = document.querySelector('#resumen');
const datos = document.querySelector('#datos');

const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]{3,40}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONO = /^[6-9]\d{8}$/;

const ETIQUETAS = {
  nombre: 'Nombre', email: 'Email', telefono: 'Teléfono',
  motivo: 'Motivo', otro: 'Detalle', mensaje: 'Mensaje',
};

/**
 * Pinta los datos enviados en el resumen.
 * Usa textContent: nunca innerHTML con texto que escribe el usuario.
 * @param {Object<string,string>} valores - Datos del formulario.
 */
function mostrarResumen(valores) {
  datos.innerHTML = '';
  Object.entries(valores).forEach(([clave, valor]) => {
    if (!ETIQUETAS[clave] || valor === '') return;
    const dt = document.createElement('dt');
    dt.textContent = ETIQUETAS[clave];
    const dd = document.createElement('dd');
    dd.textContent = valor;
    datos.append(dt, dd);
  });
  resumen.hidden = false;
}

// ---------- PASO 1 · comportamiento ----------
motivo.addEventListener('change', () => {
  const esOtro = motivo.value === 'otro';
  campoOtro.hidden = !esOtro;
  if (!esOtro) {
    otro.value = '';
    mostrarError(otro, '');
  }
});

mensaje.addEventListener('input', () => {
  contador.textContent = mensaje.value.length + '/' + mensaje.maxLength;
});

acepto.addEventListener('change', () => {
  enviar.disabled = !acepto.checked;
});

// ---------- PASO 2 · funciones de validación ----------
/**
 * @param {string} valor - Nombre escrito.
 * @returns {string} Mensaje de error, o '' si es válido.
 */
function validarNombre(valor) {
  if (valor === '') return 'El nombre es obligatorio.';
  if (!REGEX_NOMBRE.test(valor)) return 'Usa solo letras (entre 3 y 40 caracteres).';
  return '';
}

/**
 * @param {string} valor - Email escrito.
 * @returns {string} Mensaje de error, o '' si es válido.
 */
function validarEmail(valor) {
  if (valor === '') return 'El email es obligatorio.';
  if (!REGEX_EMAIL.test(valor)) return 'Escribe un email válido, por ejemplo ana@correo.es.';
  return '';
}

/**
 * El teléfono es opcional: vacío es válido, pero si se escribe debe tener formato.
 * @param {string} valor - Teléfono escrito.
 * @returns {string} Mensaje de error, o '' si es válido.
 */
function validarTelefono(valor) {
  if (valor === '') return '';
  if (!REGEX_TELEFONO.test(valor)) return 'Son 9 dígitos y empieza por 6, 7, 8 o 9.';
  return '';
}

/**
 * @param {string} valor - Motivo elegido.
 * @returns {string} Mensaje de error, o '' si es válido.
 */
function validarMotivo(valor) {
  return valor === '' ? 'Elige un motivo.' : '';
}

/**
 * Solo se exige si el motivo elegido es «otro».
 * @param {string} valor - Detalle escrito.
 * @returns {string} Mensaje de error, o '' si es válido.
 */
function validarOtro(valor) {
  if (motivo.value === 'otro' && valor.length < 3) return 'Cuéntanos el motivo (mínimo 3 caracteres).';
  return '';
}

/**
 * @param {string} valor - Mensaje escrito.
 * @returns {string} Mensaje de error, o '' si es válido.
 */
function validarMensaje(valor) {
  return valor.length < 10 ? 'Escribe al menos 10 caracteres.' : '';
}

// Cada campo (por su name) con su función de validación
const validadores = {
  nombre: validarNombre,
  email: validarEmail,
  telefono: validarTelefono,
  motivo: validarMotivo,
  otro: validarOtro,
  mensaje: validarMensaje,
};

// ---------- PASO 3 · mostrar errores ----------
/**
 * Escribe el error junto al campo y marca el campo como inválido.
 * @param {HTMLElement} campo - Campo del formulario.
 * @param {string} texto - Mensaje de error; '' lo limpia.
 */
function mostrarError(campo, texto) {
  document.querySelector('#error-' + campo.id).textContent = texto;
  campo.classList.toggle('invalido', texto !== '');
}

/**
 * Valida un campo y muestra su error.
 * @param {HTMLElement} campo - Campo del formulario.
 * @returns {boolean} true si es válido.
 */
function validarCampo(campo) {
  const error = validadores[campo.name](campo.value.trim());
  mostrarError(campo, error);
  return error === '';
}

// ---------- PASO 4 · validación en tiempo real (delegación) ----------
// focusout es como blur, pero sí burbujea: un solo listener para todo el formulario
form.addEventListener('focusout', (e) => {
  if (validadores[e.target.name]) validarCampo(e.target);
});

// Si el campo ya estaba mal, se vuelve a validar mientras se corrige
form.addEventListener('input', (e) => {
  if (e.target.classList.contains('invalido')) validarCampo(e.target);
});

// ---------- PASO 5 · enviar ----------
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const campos = Array.from(form.elements)
    .filter((el) => validadores[el.name] && !el.closest('[hidden]'));
  const invalidos = campos.filter((campo) => !validarCampo(campo));

  if (invalidos.length > 0) {
    invalidos[0].focus();
    return;
  }

  mostrarResumen(Object.fromEntries(new FormData(form)));

  // ---------- PASO 6 · dejar el formulario como nuevo ----------
  form.reset();
  campos.forEach((campo) => mostrarError(campo, ''));
  campoOtro.hidden = true;
  contador.textContent = '0/' + mensaje.maxLength;
  enviar.disabled = true;
});
