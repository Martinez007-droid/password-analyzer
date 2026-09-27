// Top contraseñas más comunes según listados de brechas de seguridad públicas
const CONTRASEÑAS_COMUNES = [
  '123456', '123456789', 'qwerty', 'password', '12345',
  '12345678', '111111', '1234567', 'sunshine', 'iloveyou',
  'admin', 'welcome', 'monkey', 'login', 'abc123',
  'starwars', '123123', 'dragon', 'passw0rd', 'master',
  'hello', 'freedom', 'whatever', 'qazwsx', 'trustno1',
  'letmein', 'football', 'jordan23', 'harley', 'ranger',
  'contraseña', 'contraseña123', '1234', '000000', 'password1'
];

function esContraseñaComun(contraseña) {
  return CONTRASEÑAS_COMUNES.includes(contraseña.toLowerCase());
}

module.exports = esContraseñaComun;