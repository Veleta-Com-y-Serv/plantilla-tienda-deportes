# Tienda de deportes y montaña: brief de diseño

Plantilla `tienda-deportes` creada el 10/11/2026 a partir de `tienda-moda` con `php artisan plantillas:nueva` y rediseñada
entera con el tema **Piste** de la skill Hallmark (género playful). De la base solo queda la estructura técnica.
Este fichero se queda en el repo: es lo que lee quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: tiendas de deportes independientes y especializadas (sectores `tienda-deportes`, `tienda-montana`,
  `alquiler-esqui`, `tienda-bicis`, `tienda`): material de montaña, esquí y escalada, running y trail, bici (venta y taller),
  alquiler de esquís, raquetas, bicis o material de ferrata, reparación y encerado, equipación de clubes, atendidas por gente
  que practica lo que vende. Su cliente entra para ver qué secciones y servicios tiene la tienda, los precios de alquiler y
  del taller, el horario y dónde está, y para preguntar por un producto. No es una tienda online con carrito.
- **Qué tiene que conseguir la web**: que **pregunten** (WhatsApp o teléfono) y que **vengan**. «Pregunta por WhatsApp» en la
  portada, «Pregúntanos» en la cabecera, «Reservar por WhatsApp» bajo el alquiler; en móvil, barra fija con «Llamar» y
  «WhatsApp». El teléfono, enorme, en el contacto.
- **Tono**: el parte de la mañana en la estación: la hora, el precio del día, dicho claro. Sí: un tablón de tarifas de
  remontes, fotos de montaña con luz de día. No: el folleto de estación con destellos, degradados deportivos ni una app de
  esquinas redondas. De tú, frases cortas.

## Tema Hallmark y cómo se ha traducido

Piste (`references/themes/piste.md`, postura `committed`, suelo `snow`): papel blanco nieve, tinta casi negra y fría,
Barlow Condensed 800 en mayúsculas para titulares y cifras sobre Barlow 400/500, esquinas rectas sobre filetes de tinta de
2 px, sin sombras ni texturas, y un cobalto que hace todo el trabajo de color (botón, cifras y una banda entera).

- **Cuatro colores** → `fondo` = papel nieve (`#f8f9fc`), `texto` = tinta (`#12161e`), `acento` = cobalto (`#2448e6`: botón,
  cifras del tablero, precio del día y la banda «Quién te atiende»), `primario` = banda de noche (`#151a24`, el pie; el suelo
  `night-piste` del tema).
- **Derivados** (`src/styles/global.css`): `--papel-2` (bajo la tabla del alquiler y el mostrador del formulario), `--papel-3`,
  `--tinta-2`, `--apagado`, `--filete`, `--acento-legible` (cobalto como texto o cifra sobre papel, nunca más claro que L 0,5),
  `--acento-hondo` (hover), `--sobre-acento` y `--sobre-primario` (texto claro u oscuro según el color del cliente). En el campo
  cobalto los botones pasan a papel (como dice el tema para `blue-run`) y el foco a `currentColor`. El rojo del tema es solo el
  anillo de foco. Probado con primario verde oscuro (`#1f4d3a`) y acento amarillo (`#f2b630`): el texto del campo y del botón
  pasa a tinta y todo se lee.
- **Material**: cabeza de sección con filete de tinta de 2 px a todo el ancho; filas separadas por filetes finos; tablas con
  filete de tinta en la cabecera; botones en pareja, cuadrados, en Barlow Condensed en mayúsculas (relleno cobalto + contorno
  de tinta de 2 px por dentro); fotos cortadas en cuadrado con filete de tinta al 8 % y el tratamiento del tema por CSS
  (`contrast(1.1) saturate(1.15)`, natural con=10 vib=15). Movimiento quieto: solo el paso de color de los controles y el
  signo de las preguntas.
- **Firma**: el tablón del alquiler: las tarifas por días (1 día, 2 días, 6 días) en Barlow Condensed 800 con cifras tabulares,
  el precio del día en cobalto, como el panel de precios de una estación. La portada lo anuncia con su propio tablero de cifras
  (los `items`) en cobalto bajo un filete de tinta.

## Tipografías y licencias

Barlow Condensed 800 y Barlow 400 y 500 (Jeremy Tribby), **OFL-1.1**, woff2 `latin` de Fontsource en `public/fuentes/`
(66 KB en total), `font-display: swap`, respaldo del sistema de la misma clase y `preload` solo de Barlow Condensed. Son las
caras del propio tema, sin sustituciones. Detalle en `public/fuentes/LICENCIAS.md`.

Titulares sin palabras partidas: `overflow-wrap: normal`, `hyphens: manual`. En Barlow Condensed 800 en mayúsculas
«Impermeabilizaciones» mide 12,9 em, así que cada titular lleva `--letras` (letras de su palabra más larga, `encaje()` en
`src/data/site.ts`) y mide `min(tope, 100cqi / (letras × 0,7))` dentro de su bloque (`container-type: inline-size`): la palabra
más larga cabe siempre en su columna, a 375 px y en escritorio, y los titulares de palabras cortas crecen hasta su tope.

## Forma y ritmo de bandas

| # | Sección | Papel | Lleva |
|---|---|---|---|
| 1 | `hero` | foto + nieve | Poster: foto a sangre con velo de papel abajo a la izquierda y la tinta encima; debajo, el tablero de cifras en cobalto. En móvil, foto arriba y texto sobre el papel |
| 2 | `deportes` | nieve | estanterías con foto: dos a media fila y el resto a tercio (nunca uno suelto); cada una enlaza a su ficha |
| 3 | `alquiler` | papel-2 | el tablón (firma): tablas por categoría, precio del día en cobalto; en móvil, cada fila en bloque con su etiqueta |
| 4 | `taller` | nieve | foto vertical a sangre a la izquierda (5/12) + lista de precios con plazo |
| 5 | `equipo` | campo cobalto | la declaración a tamaño de cartel y el equipo en letra en columnas con filete |
| 6 | `clubes` | nieve | cabeza con botón + pasos numerados en cobalto sobre filete de tinta |
| 7 | `tienda` | nieve | dirección, horario en tabla y botones + foto de la tienda a sangre a la derecha (6/12) |
| 8 | `opiniones` | nieve | columnas con filete de tinta |
| 9 | `preguntas` | nieve | cabeza fija a la izquierda y filas plegables |
| 10 | `contacto` | nieve | el teléfono enorme en cobalto, vías en filas y el formulario en el mostrador (papel-2, campos de 52 px) |
| — | pie | noche | nombre como mástil, cuatro columnas, barra móvil |

Se alternan bandas guiadas por foto (portada, deportes, taller, tienda) con bandas que solo hace el material (tablero,
tablón de tarifas, campo cobalto, pasos, filas, el teléfono como cifra). Dos bandas de color: el papel-2 del alquiler y el
campo cobalto; entre las secciones en papel nieve, el filete de tinta de 2 px de cada cabeza marca el corte.

## Listas propias y páginas

- `deportes.deportes` {nombre, texto, incluye, imagen, imagenes, detalle}, `alquiler.material` {nombre, categoria, texto,
  precio, precio_finde, precio_semana, imagen, imagenes, detalle}, `taller.servicios` {nombre, categoria, plazo, precio, texto},
  `equipo.personas`, `clubes.items` (pasos), `tienda.horario`.
- Fichas: cada deporte con `detalle` en `/deportes/<slug>/` (`Service`) y cada material de alquiler con `detalle` en
  `/alquiler/<slug>/` (`Product`, con su precio por día como oferta). El taller no lleva fichas (el comprobador lo sugiere,
  pero solo caben dos listas y lo que se busca por su nombre es el deporte y el material de alquiler). Sin zonas (es una
  tienda a la que se va, no un oficio que se desplaza).
- Varias páginas recomendadas: Alquiler, Taller, Clubes y equipo (equipo, clubes), Horario y contacto (tienda, preguntas,
  contacto); Inicio se queda con la portada, los deportes y las opiniones.
- Guion del asistente: 13 pasos propios (tu tienda, contacto, deportes, alquiler, taller, cómo funcionan el alquiler y el
  taller, quién atiende, clubes, horario, preguntas, fotos, colores y logo, repaso); la plataforma añade los dos de fichas.

## Fotos

12 fotos generadas con IA a partir de `fotos.json`: dos esquiadores de travesía de espaldas en una ladera (portada), la pared
de esquís de la tienda, botas y mochila junto a un sendero, material de escalada al pie de la roca, zapatillas de trail en
plena zancada, bici de montaña en un prado, encerado en el banco del taller, el interior de la tienda con vistas a la
montaña, el mostrador de alquiler, raquetas en la nieve, bicis eléctricas de alquiler y equipos de ferrata colgados. Sin
texto legible, sin logotipos, sin caras. La herramienta devuelve 1024×1024: la portada se recorta a 16:9 y se amplía a
1536 px (por eso el texto de la portada va sobre un velo de papel y no depende de una foto nítida a 1920); el resto, a
1200 px (4:3) y 1050 px (3:4). El equipo usa `/placeholders/persona.svg`, que no se pinta: el equipo va en letra hasta que el
cliente pone fotos de verdad.

## Lo que no se ha podido o choca con Hallmark

- `antetitulo` es contrato: se pinta como etiqueta en Barlow 500 en caja normal (Hallmark prohíbe el antetítulo).
- `opiniones` y los `items` de la portada llevan ejemplos ficticios en el `site.yaml` de muestra (Hallmark prohíbe inventar
  cifras y opiniones); la plataforma los deja desmarcados y vacíos al crear una web, y por eso los `items` no van en el guion.
- Floor 5 pide `overflow-wrap: break-word` en titulares; aquí van con `overflow-wrap: normal` (nada de palabras partidas) y el
  tamaño en `cqi` garantiza que no desbordan.
- El tema pide dos bandas por página como mucho: son dos (papel-2 y campo); el pie de noche es cromo.
- El sello de Hallmark no queda en la primera línea del CSS servido (Tailwind antepone su cabecera al ir en línea) y
  `comun.css` (común a todas las plantillas) trae colores literales y etiquetas en mayúsculas que aquí se anulan.
- Hallmark pide 450 palabras por página; con el tablón del alquiler, el taller y las preguntas pasa de 1000. Se queda así
  porque es contenido que el cliente necesita.
