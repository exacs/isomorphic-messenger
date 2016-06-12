# Una aplicación web isomórfica en JavaScript

En el mundo de las aplicaciones cliente-servidor, siempre se han caracterizado
por ser de dos tipos: clientes ligeros o clientes pesados. La diferencia es
sencillamente quién de los dos elementos (cliente o servidor) efectúa la mayor
parte del trabajo.

Sin embargo, cuando se trata de hacer una aplicación web, es mucho más sensible
esta dualidad y los beneficios y problemas que pueden surgir se acentúan.

El objetivo de este proyecto es crear una aplicación web medianamente compleja
combinando lo bueno de ambos mundos e intentando usar teconologías que sean
compatibles para el servidor y para el cliente.

## Ecosistema
Para maximizar la compartición de código y librerías entre cliente y servidor,
es necesario que los entornos de ejecución compartan algo. Por ello se ha
elegido que el servidor sea ExpressJS montado sobre NodeJS, es decir un servidor
en JavaScript.

Esta será la estructura de ficheros

```
- /app
- /client
   - index.js
- /server
   - index.js
- index.js
```

Tres directorios: `client`, `server` y `app`, que albergan el código del
cliente, el servidor y el código común entre ambas respectivamente. Los
directorios `client` y `server` tienen un fichero llamado `index.js` que unirá
todo lo necesario para ejecutar el cliente y servidor.

Adicionalmente se han incluido unos scripts en el fichero `package.json` para
ayudar en el despliegue y ejecución de los programas.

## Código servidor

Si bien es cierto, que el servidor es JavaScript y por tanto no necesitaríamos
*compilar* el código, en este proyecto se ha optado por escribir sintaxis en
ES6. Esto significa que el código debe ser *transpilado* a ES5 incluso en el
lado del servidor.

Si bien existen técnicas para transpilar el código dinámicamente, por eficiencia
se ha optado por una transpilación estática.

De dicha transpilación se encargan los scripts siguientes (en package.json):

```
"build-server": "babel -d ./server-es5 ./server -s",
"build-app": "babel -d ./app-es5 ./app -s",
```

Nótese que *Babel* solo realiza una transpilación, es decir, no genera un
fichero único con todas las dependencias, tan solo traduce sintaxis ES6 a
sintaxis ES5.

Adicionalmente, existe un fichero en raíz llamado `index.js`, el ejecutable del
servidor. Para poder ejecutar dicho fichero, es necesario que el directorio
`app-es5` esté en el `NODE_PATH`. De configurar la variable y ejecutar el script
se encarga este otro script (en package.json)

```
"start": "NODE_PATH=$NODE_PATH:./app-es5 node ."
```

## Interfaz de Usuario

Para la gestión de las interfaces de usuario, se ha optado por usar React. Una
de las ventajas de React es que su librería incluye funciones para renderizar
interfaces de usuario desde el cliente y desde el servidor.

El objetivo primero es poder crear dos componentes React y que servidor y
cliente sean capaces de mostrarlos al usuario.

Primero, se crean ambos componentes `HelloServer` y `HelloClient`. Se pueden ver
en el directorio `app/components`.

Después, se modifica el código del servidor `server/index.js` para utilizar la
función `renderToString` de la librería React.
