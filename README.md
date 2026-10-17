# Actualización v0.2.0 — Solo la Pokédex

Interfaz móvil sin cabecera, eslogan ni pie exterior. Carcasa roja hasta los bordes, pantallas Pokémon / Datos / Colección y controles de copia de seguridad bajo SISTEMA. En ordenador se conservan los dos paneles. Voz sintetizada más grave y pausada (desactivable); no es la voz original de la serie. El resultado depende de las voces instaladas y del navegador. El botón de audio inicia/detiene la narración; cambiar de Pokémon la detiene.

## Actualizar tu GitHub actual (PCI03/Pokedex)

1. Extrae el ZIP.
2. En el repositorio, usa Add file → Upload files.
3. Arrastra la carpeta `dist` de esta entrega a la raíz y confirma la subida. Acepta actualizar `dist/index.html`.
4. Espera a que termine el despliegue de GitHub Pages.
5. Abre https://pci03.github.io/Pokedex/dist/ y recarga. En SISTEMA debe figurar v0.2.0.

Para mantener el código fuente al día, sube también `src`, `public`, `package.json`, `package-lock.json` e `index.html` a la raíz. No cambies la configuración de Pages si actualmente publicas desde la rama main y la raíz: el enlace sigue siendo `/Pokedex/dist/`. Los archivos antiguos de assets pueden permanecer; el nuevo index apunta a los nuevos.

El registro usa la misma clave local y se conserva al actualizar en el mismo navegador y URL de origen. Por precaución, exporta el progreso antes de actualizar.

En iPhone, Compartir → Añadir a pantalla de inicio permite abrirla sin la barra habitual de Safari. Dentro de una pestaña normal, la app no puede ocultar permanentemente los controles del navegador. No se ha implementado funcionamiento offline.

Validación de esta entrega: compilación TypeScript/Vite y cuatro pruebas automáticas. Sin validación visual en navegador ni de la voz/cámara en un teléfono real en este entorno.

---

# Pokédex · Cuaderno de campo — v0.2.0

Primera versión independiente de CardEX y PCI Stock. TypeScript + React + Vite, interfaz española inspirada en una Pokédex roja de dos paneles. Compatible con alojamiento estático bajo subcarpetas en GitHub Pages.

## Probar en Windows

1. Instala Node.js 22.12 o superior (incluye npm).
2. Extrae este ZIP y abre la carpeta `pokedex` en VS Code o en el Explorador de archivos.
3. Abre una terminal en esa carpeta (donde está `package.json`). Ejecuta:

```sh
npm ci
npm run dev
```

4. Abre la dirección localhost que imprime Vite (normalmente http://localhost:5173).
5. Detén el servidor con Ctrl+C. No abras `index.html` con doble clic: necesita un servidor.

GitHub almacena el código; `npm run dev` lo ejecuta en tu ordenador. GitHub Pages permite probarlo desde el teléfono mediante HTTPS.

## Publicar en tu repositorio GitHub

1. Crea un repositorio vacío. Sube **el contenido** de `pokedex` a la raíz: `package.json`, `package-lock.json`, `index.html`, `src`, `vite.config.ts`, `tsconfig.json`, `.github` y `.gitignore`.
2. La carpeta `.github` debe subirse también: contiene el despliegue. No subas `node_modules`. El ZIP incluye `dist` ya compilado; el workflow lo vuelve a generar.
3. En **Settings → Pages → Build and deployment → Source**, selecciona **GitHub Actions**.
4. En **Actions**, ejecuta “Publicar Pokédex en GitHub Pages”, o sube un cambio a la rama `main`.
5. Cuando termine, abre el enlace mostrado por GitHub Pages. La URL sirve por HTTPS y permite pedir acceso a la cámara del móvil.

El workflow presupone una rama `main`. Si usas otra, modifica `branches` en `.github/workflows/pages.yml`. No se ha creado ni publicado un repositorio desde esta entrega.

## Funciones implementadas

- Catálogo nacional integrado: exactamente 1.025 especies, de Bulbasaur a Pecharunt. No cuenta formas regionales como nuevas especies.
- Galería paginada (24 por página), búsqueda por nombre/número, regiones y estado.
- Todos empiezan sin registrar y en gris. Los registrados aparecen en color.
- Ficha con ilustración, tipos, descripción, altura y peso obtenidos de PokéAPI. Se consulta la variedad predeterminada de cada especie.
- Audio de la descripción mediante la voz disponible en el navegador.
- Botón Registrar / quitar registro, persistencia local, exportación JSON e importación que fusiona progreso.
- Cámara trasera preferida, encuadre fijo, captura manual y subida de fotografía.
- OCR experimental del encabezado con Tesseract.js; coincidencias de nombres por palabras completas y selección explícita. Búsqueda manual de respaldo.
- Gestión de permisos, errores de red y tiempos de espera; se apaga la cámara al cerrar el escáner.

## Qué NO hace aún

**No se ha implementado identificación visual por ilustración, ni un sistema fiable de reconocimiento de cartas.** El OCR es una primera prueba funcional y no satisface por sí solo el reconocimiento multimodal final. Puede fallar por brillos, inclinación, fuentes especiales, idiomas distintos o nombres poco legibles. No reconoce edición, rareza, autenticidad ni estado de conservación. Puede ofrecer varios nombres (por ejemplo, el texto de evolución); nunca registra automáticamente.

La primera lectura descarga el motor y datos OCR. La foto se procesa en el navegador y no se sube a ningún servicio. No se guarda la foto. Las fichas, sprites, tipografías y el motor OCR requieren conexión a servicios externos. No es una aplicación sin conexión.

PokéAPI puede no tener descripción española para algunas especies recientes: se muestra la inglesa con indicación. El motor OCR inicial usa caracteres latinos; las cartas japonesas no están cubiertas.

El progreso pertenece al navegador y origen (dominio + puerto); no se comparte entre móvil y ordenador. Si borras los datos del navegador lo perderás. Usa Exportar / Importar para trasladarlo. No hay cuenta ni sincronización.

En un móvil, una dirección local `http://192.168...` normalmente no permite cámara. Usa el enlace HTTPS de GitHub Pages. En el ordenador funciona `localhost`.

## Validación y siguientes pruebas

```sh
npm test
npm run build
```

Las pruebas comprueban el catálogo, nombres que se solapan (Mew/Mewtwo), variantes tipográficas e importación de registros. La compilación comprueba TypeScript. No se han realizado pruebas reales de cámara ni evaluación visual en navegador en el entorno de creación.

Prueba en tu teléfono:
1. Abre la galería, busca el nº 1025 y vuelve a Bulbasaur.
2. Registra uno, comprueba el color y recarga.
3. Exporta el progreso e impórtalo en otro navegador.
4. Permite la cámara y captura una carta frontal bien iluminada.
5. Revisa el candidato y registra; después prueba una foto borrosa y deniega el permiso de cámara para verificar los mensajes.

Siguiente fase: contrastar cartas de prueba reales, crear un conjunto de referencia de ilustraciones y añadir reconocimiento visual combinado con texto. Eso puede requerir un servicio de inferencia; no deben añadirse claves privadas al repositorio ni al JavaScript público.

## Estructura

- `src/main.tsx`: interfaz, consulta de fichas, persistencia y escáner.
- `src/style.css`: carcasa, pantallas LCD y adaptación al móvil.
- `src/species.json`: índice nacional integrado.
- `src/match.ts`: normalización, coincidencias y validación del progreso.
- `src/match.test.ts`: pruebas de los casos anteriores.
- `.github/workflows/pages.yml`: construcción y despliegue.
- `dist/`: versión compilada de esta entrega.

## Fuentes y créditos

- PokéAPI: https://pokeapi.co/docs/v2/ (datos y nombres; índice consultado en octubre de 2026).
- Sprites e ilustraciones: https://github.com/PokeAPI/sprites
- OCR: https://github.com/naptha/tesseract.js
- Iconos Lucide; tipografías DM Sans y Space Grotesk con fuentes de sistema de respaldo.

Proyecto fan no oficial, sin afiliación con Nintendo, Game Freak o The Pokémon Company. Los nombres e ilustraciones pertenecen a sus respectivos titulares.
