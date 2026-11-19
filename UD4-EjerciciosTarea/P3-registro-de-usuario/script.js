// ---------------------------------------------------------------
// Registro de usuario · UD4 · (SOLUCIÓN)
// ---------------------------------------------------------------

const form = document.querySelector('#registro');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const ver = document.querySelector('#ver');
const barra = document.querySelector('#barra');
const textoFortaleza = document.querySelector('#texto-fortaleza');
const acepto = document.querySelector('#acepto');
const enviar = document.querySelector('#enviar');
const resumen = document.querySelector('#resumen');
const datos = document.querySelector('#datos');

const REGEX_USUARIO = /^[a-z0-9_]{3,15}$/i;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_CP = /^\d{5}$/;
const EDAD_MINIMA = 18;

// Solo estos datos se muestran en el resumen: nunca las contraseñas
const ETIQUETAS = { usuario: 'Usuario', email: 'Email', cp: 'Código postal', fecha: 'Fecha de nacimiento' };

// ---------- validaciones ----------
/**
 * @param {string} valor - Usuario escrito.
 * @returns {string} Mensaje de error, o '' si es válido.
 */
function validarUsuario(valor) {
  if (valor === '') return 'El usuario es obligatorio.';
  if (!REGEX_USUARIO.test(valor)) return 'Entre 3 y 15 caracteres: letras, números y guion bajo.';
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
 * Indica qué le falta a la contraseña (mínimo 8 caracteres, una mayúscula y un número).
 * @param {string} valor - Contraseña escrita (sin recortar).
 * @returns {string} Mensaje de error, o '' si es válida.
 */
function validarPassword(valor) {
  if (valor === '') return 'La contraseña es obligatoria.';

  const faltan = [];
  if (valor.length < 8) faltan.push('8 caracteres');
  if (!/[A-Z]/.test(valor)) faltan.push('una mayúscula');
  if (!/\d/.test(valor)) faltan.push('un número');

  return faltan.length > 0 ? 'Falta: ' + faltan.join(', ') + '.' : '';
}

/**
 * @param {string} valor - Segunda contraseña escrita (sin recortar).
 * @returns {string} Mensaje de error, o '' si coincide con la primera.
 */
function validarPassword2(valor) {
  if (valor === '') return 'Repite la contraseña.';
  if (valor !== password.value) return 'Las contraseñas no coinciden.';
  return '';
}

/**
 * @param {string} valor - Código postal escrito.
 * @returns {string} Mensaje de error, o '' si es válido.
 */
function validarCP(valor) {
  if (valor === '') return 'El código postal es obligatorio.';
  if (!REGEX_CP.test(valor)) return 'Son 5 dígitos.';
  return '';
}

/**
 * Convierte 'AAAA-MM-DD' en una fecha local (evita desfases de zona horaria).
 * @param {string} texto - Fecha en formato AAAA-MM-DD.
 * @returns {Date} Fecha local a las 00:00.
 */
function parsearFecha(texto) {
  const [anio, mes, dia] = texto.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

/**
 * Calcula los años cumplidos.
 * @param {Date} nacimiento - Fecha de nacimiento.
 * @param {Date} [hoy=new Date()] - Fecha de referencia.
 * @returns {number} Edad en años.
 */
function calcularEdad(nacimiento, hoy = new Date()) {
  const edad = hoy.getFullYear() - nacimiento.getFullYear();
  const aunNoCumple = hoy.getMonth() < nacimiento.getMonth()
    || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
  return aunNoCumple ? edad - 1 : edad;
}

/**
 * @param {string} valor - Fecha escrita (AAAA-MM-DD).
 * @returns {string} Mensaje de error, o '' si es válida.
 */
function validarFecha(valor) {
  if (valor === '') return 'La fecha de nacimiento es obligatoria.';

  const nacimiento = parsearFecha(valor);
  if (nacimiento > new Date()) return 'La fecha no puede ser futura.';
  if (calcularEdad(nacimiento) < EDAD_MINIMA) return 'Debes ser mayor de ' + EDAD_MINIMA + ' años.';
  return '';
}

const validadores = {
  usuario: validarUsuario,
  email: validarEmail,
  password: validarPassword,
  password2: validarPassword2,
  cp: validarCP,
  fecha: validarFecha,
};

// ---------- mostrar errores ----------
/**
 * @param {HTMLElement} campo - Campo del formulario.
 * @param {string} texto - Mensaje de error; '' lo limpia.
 */
function mostrarError(campo, texto) {
  document.querySelector('#error-' + campo.id).textContent = texto;
  campo.classList.toggle('invalido', texto !== '');
}

/**
 * Valida un campo y muestra su error. Las contraseñas no se recortan: un espacio cuenta.
 * @param {HTMLElement} campo - Campo del formulario.
 * @returns {boolean} true si es válido.
 */
function validarCampo(campo) {
  const valor = campo.type === 'password' ? campo.value : campo.value.trim();
  const error = validadores[campo.name](valor);
  mostrarError(campo, error);
  return error === '';
}

// ---------- fortaleza de la contraseña ----------
/**
 * Cuenta cuántas condiciones cumple: 8 caracteres, mayúscula, número y símbolo.
 * @param {string} valor - Contraseña escrita.
 * @returns {number} Puntos de 0 a 4.
 */
function calcularFortaleza(valor) {
  let puntos = 0;
  if (valor.length >= 8) puntos++;
  if (/[A-Z]/.test(valor)) puntos++;
  if (/\d/.test(valor)) puntos++;
  if (/[^A-Za-z0-9]/.test(valor)) puntos++;
  return puntos;
}

/**
 * Cambia la clase de la barra (el CSS decide el aspecto) y su texto.
 * @param {string} valor - Contraseña escrita.
 */
function mostrarFortaleza(valor) {
  const puntos = calcularFortaleza(valor);
  const nivel = valor === '' ? '' : puntos <= 1 ? 'debil' : puntos <= 3 ? 'media' : 'fuerte';
  const textos = { '': '', debil: 'Débil', media: 'Media', fuerte: 'Fuerte' };

  barra.className = nivel;
  textoFortaleza.textContent = textos[nivel];
}

// ---------- resumen ----------
/**
 * @param {Object<string,string>} valores - Datos del formulario.
 */
function mostrarResumen(valores) {
  datos.innerHTML = '';
  Object.entries(valores).forEach(([clave, valor]) => {
    if (!ETIQUETAS[clave] || valor === '') return;
    const dt = document.createElement('dt');
    dt.textContent = ETIQUETAS[clave];
    const dd = document.createElement('dd');
    dd.textContent = clave === 'fecha' ? valor.split('-').reverse().join('/') : valor;
    datos.append(dt, dd);
  });
  resumen.hidden = false;
}

// ---------- eventos ----------
ver.addEventListener('click', () => {
  const estabaOculta = password.type === 'password';
  password.type = estabaOculta ? 'text' : 'password';
  ver.textContent = estabaOculta ? 'Ocultar' : 'Mostrar';
});

password.addEventListener('input', () => {
  mostrarFortaleza(password.value);
  if (password2.value !== '') validarCampo(password2);
});

acepto.addEventListener('change', () => {
  enviar.disabled = !acepto.checked;
});

// focusout burbujea (blur no): un solo listener para todo el formulario
form.addEventListener('focusout', (e) => {
  if (validadores[e.target.name]) validarCampo(e.target);
});

form.addEventListener('input', (e) => {
  if (e.target.classList.contains('invalido')) validarCampo(e.target);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const campos = Array.from(form.elements).filter((el) => validadores[el.name]);
  const invalidos = campos.filter((campo) => !validarCampo(campo));

  if (invalidos.length > 0) {
    invalidos[0].focus();
    return;
  }

  mostrarResumen(Object.fromEntries(new FormData(form)));

  form.reset();
  campos.forEach((campo) => mostrarError(campo, ''));
  mostrarFortaleza('');
  password.type = 'password';
  ver.textContent = 'Mostrar';
  enviar.disabled = true;
});
