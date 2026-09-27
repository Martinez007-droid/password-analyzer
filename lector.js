function leerContraseñaOculta(pregunta) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    let contraseña = '';

    process.stdout.write(pregunta);

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function onData(char) {
      char = char.toString();

      switch (char) {
        case '\n':
        case '\r':
        case '\u0004':
          stdin.setRawMode(false);
          stdin.pause();
          stdin.removeListener('data', onData);
          process.stdout.write('\n');
          resolve(contraseña);
          break;
        case '\u0003':
          process.exit();
          break;
        case '\u007f':
        case '\b':
          if (contraseña.length > 0) {
            contraseña = contraseña.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          contraseña += char;
          process.stdout.write('*');
          break;
      }
    });
  });
}

module.exports = leerContraseñaOculta;