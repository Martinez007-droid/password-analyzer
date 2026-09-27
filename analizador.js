const esContraseñaComun = require('./contraseñas-comunes');

function analizarContraseña(contraseña) {
  const longitud = contraseña.length;
  const tieneMayusculas = /[A-Z]/.test(contraseña);
  const tieneMinusculas = /[a-z]/.test(contraseña);
  const tieneNumeros = /[0-9]/.test(contraseña);
  const tieneSimbolos = /[^A-Za-z0-9]/.test(contraseña);
  const esComun = esContraseñaComun(contraseña);

  const criteriosCumplidos = [
    tieneMayusculas,
    tieneMinusculas,
    tieneNumeros,
    tieneSimbolos,
  ].filter(Boolean).length;

  let puntaje = 0;
  if (longitud >= 8) puntaje += 1;
  if (longitud >= 12) puntaje += 1;
  if (longitud >= 16) puntaje += 1;
  puntaje += criteriosCumplidos;

  let resultado;

  // La blacklist manda sobre todo lo demás: aunque cumpla criterios,
  // si está filtrada en brechas conocidas, es insegura.
  if (esComun) {
    resultado = 'Contraseña muy débil (está en listas de contraseñas filtradas/comunes)';
  } else if (longitud < 8) {
    resultado = 'Contraseña muy débil (demasiado corta)';
  } else if (puntaje <= 3) {
    resultado = 'Contraseña débil';
  } else if (puntaje <= 5) {
    resultado = 'Contraseña con complejidad media';
  } else {
    resultado = 'Contraseña con buena complejidad';
  }

  return {
    longitud,
    tieneMayusculas,
    tieneMinusculas,
    tieneNumeros,
    tieneSimbolos,
    esComun,
    puntaje,
    resultado,
  };
}

module.exports = analizarContraseña;