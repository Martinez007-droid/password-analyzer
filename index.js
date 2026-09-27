const leerContraseñaOculta = require('./lector');
const analizarContraseña = require('./analizador');

function mostrarCheck(condicion) {
  return condicion ? '✓' : '✗';
}

function mostrarResultado(analisis) {
  console.log('\n--- ANÁLISIS DE CONTRASEÑA ---');
  console.log(`Longitud: ${analisis.longitud}`);
  console.log(`Mayúsculas: ${mostrarCheck(analisis.tieneMayusculas)}`);
  console.log(`Minúsculas: ${mostrarCheck(analisis.tieneMinusculas)}`);
  console.log(`Números: ${mostrarCheck(analisis.tieneNumeros)}`);
  console.log(`Símbolos: ${mostrarCheck(analisis.tieneSimbolos)}`);
  console.log(`¿Es contraseña común/filtrada?: ${analisis.esComun ? 'Sí ⚠️' : 'No'}`);
  console.log(`Puntaje: ${analisis.puntaje}/7`);
  console.log(`\nResultado: ${analisis.resultado}`);
}

async function main() {
  const contraseña = await leerContraseñaOculta('Ingresa tu contraseña a analizar: ');
  const analisis = analizarContraseña(contraseña);
  mostrarResultado(analisis);
}

main();