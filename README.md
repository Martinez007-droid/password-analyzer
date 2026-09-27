# Password Analyzer

Herramienta de línea de comandos escrita en Node.js que analiza la fortaleza de una contraseña **sin almacenarla en ningún momento** (ni en disco, ni en logs, ni en base de datos).

## ¿Qué hace?

Evalúa una contraseña según:

- Longitud
- Presencia de mayúsculas
- Presencia de minúsculas
- Presencia de números
- Presencia de símbolos
- Si aparece en una lista de contraseñas comunes/filtradas en brechas de seguridad conocidas

Y devuelve un resultado de complejidad: **muy débil**, **débil**, **media** o **buena**.

## Ejemplo de uso

```bash
node index.js
```

La contraseña se escribe oculta (se muestra como `****` mientras se teclea, similar a un prompt de login real) y **nunca se guarda**: vive únicamente en memoria mientras el programa corre y se pierde al terminar. No existe un modo alternativo que reciba la contraseña como argumento, precisamente para evitar dejarla expuesta en el historial de la terminal o en la lista de procesos del sistema.

```
Ingresa tu contraseña a analizar: ************

--- ANÁLISIS DE CONTRASEÑA ---
Longitud: 14
Mayúsculas: ✓
Minúsculas: ✓
Números: ✓
Símbolos: ✓
¿Es contraseña común/filtrada?: No
Puntaje: 7/7

Resultado: Contraseña con buena complejidad
```

## Cómo funciona internamente

- **Lectura oculta del input** (`lector.js`): se usa `process.stdin` en modo raw para interceptar cada tecla y mostrar un asterisco en vez del carácter real, en lugar de depender de una librería externa.
- **Análisis con expresiones regulares** (`analizador.js`): se valida cada categoría de carácter con regex simples (`/[A-Z]/`, `/[a-z]/`, `/[0-9]/`, `/[^A-Za-z0-9]/`) y se calcula un puntaje combinando longitud + variedad de caracteres.
- **Chequeo contra contraseñas comunes** (`contraseñas-comunes.js`): lista de las contraseñas más filtradas en brechas de seguridad públicas (concepto similar, a menor escala, a lo que hace [Have I Been Pwned](https://haveibeenpwned.com/Passwords)). Si la contraseña está en esta lista, se marca como muy débil sin importar qué tan "compleja" parezca.

## Por qué lo hice así

Quería practicar validación con regex y, sobre todo, pensar el problema desde la perspectiva de seguridad: una contraseña larga y "compleja" en apariencia (ej. `Password1!`) puede seguir siendo insegura si está en listas de contraseñas filtradas. Combinar ambos chequeos (complejidad + blacklist) refleja mejor cómo se evalúa la fortaleza de contraseñas en sistemas reales.

## Requisitos

- Node.js 14+

## Instalación

```bash
git clone <tu-url-del-repo>
cd password-analyzer
node index.js
```

## Próximas mejoras posibles

- Ampliar la lista de contraseñas comunes cargándola desde un archivo externo
- Estimar tiempo de crackeo aproximado según entropía
- Sugerencias automáticas para mejorar una contraseña débil
