# Plantilla «Tienda de deportes y montaña» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **piste** (tema Piste
de la skill Hallmark: papel blanco nieve, tinta casi negra y fría, Barlow Condensed 800 en mayúsculas para titulares y
cifras sobre Barlow, esquinas rectas sobre filetes de tinta de 2 px y un solo cobalto para el botón, las cifras y una
banda). Escaparate de una tienda física de deportes de montaña: no es una tienda online con carrito. Todo en castellano
de España, frases cortas, sin jerga, de tú. Brief de diseño completo en `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa (también `deportes`, `material` y `servicios`); no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario = banda de noche del pie, acento = cobalto de botones, cifras y la banda «Quién te atiende», fondo = papel nieve, texto = tinta). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…). Los derivados (`--papel-2`, `--papel-3`, `--tinta-2`, `--apagado`, `--filete`, `--acento-legible`, `--acento-hondo`, `--sobre-acento`, `--sobre-primario`) salen con `color-mix()` u `oklch(from …)` en `src/styles/global.css`: el texto sobre el acento y sobre el primario se elige solo (claro u oscuro).
- **Tipografías y aspecto**: `src/styles/global.css`. Barlow Condensed 800 y Barlow 400/500 alojadas en `public/fuentes/` (OFL, `LICENCIAS.md`); sin fuentes externas. Bandas `.banda--nieve`, `.banda--clara` (bajo la tabla del alquiler), `.banda--campo` (el cobalto, una por página); botones `.btn` (cobalto, cuadrado) y `.btn-sec` (contorno de tinta de 2 px); `.cabeza` (filete de tinta de 2 px, título y entrada); `.tablero` (cifras en cobalto); `.tarifa`, `.precios`, `.horario` (tablas con filetes).
- **Titulares**: cada `h1`/`h2`/`h3` lleva `style={encaje(texto)}` (`src/data/site.ts`): su tamaño se calcula para que la palabra más larga quepa entera en su columna. Si añades un titular, ponle `encaje()` y mételo en un bloque con `container-type: inline-size` (`.titular-cabeza`).
- **Cabecera** (`src/components/Header.astro`): barra maciza fija a todo el ancho, filete de tinta debajo, nombre en mayúsculas, menú y `boton_cabecera`; en móvil, menú plegable. Va por encima de todo (z-index 50).
- **Pie** (`src/components/Footer.astro`): banda de noche con el nombre muy grande, horario, dirección, contacto, menú y redes, línea legal y «Web creada con NoExpertise» (`marca_pie`). En móvil, barra fija con «Llamar» y «WhatsApp» (sin WhatsApp: «Cómo llegar»).
- **Imágenes**: fotos en `public/fotos/` (se generan desde `fotos.json`); respaldo plano en `public/placeholders/` (`hero.svg`, `foto.svg`, `persona.svg`). En `site.yaml` con ruta absoluta (`/fotos/esqui.jpg`).
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = nombre en mayúsculas.

## Secciones
Cada sección se pinta solo si `secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → `secciones/hero.astro` · foto a sangre con velo de papel abajo a la izquierda, titular, frase y dos botones; debajo, el tablero con los `items`.
- `deportes` → `secciones/deportes.astro` · los deportes o secciones de la tienda con foto, línea y lo que incluye; cada uno con `detalle` enlaza a su página.
- `alquiler` → `secciones/alquiler.astro` · tablón de tarifas por categoría (1 día, 2 días, 6 días…), nota y botón de reservar.
- `taller` → `secciones/taller.astro` · foto vertical a sangre + lista de precios del taller por categoría con plazo.
- `equipo` → `secciones/equipo.astro` · banda cobalto con la declaración enorme y las personas en letra (la foto solo si es de verdad).
- `clubes` → `secciones/clubes.astro` · equipación para clubes: cabeza, botón y pasos numerados.
- `tienda` → `secciones/tienda.astro` · dirección, horario en tabla, «Cómo llegar» y «Llamar» + foto de la tienda.
- `opiniones` → `secciones/opiniones.astro` · columnas con filete (no se pinta vacía).
- `preguntas` → `secciones/preguntas.astro` · `details/summary` (no se pinta vacía; va al JSON-LD).
- `contacto` → `secciones/contacto.astro` · teléfono muy grande, vías y formulario `mailto` en el mostrador.
- `texto` → `secciones/texto.astro` · apartado genérico (`tipo: texto`), con o sin foto.

## Campos propios de esta plantilla (además del esquema común)
- `hero.items[]`: `{ titulo, texto }` (titulo = la cifra o la hora en grande; la plataforma no los inventa).
- `deportes.deportes[]`: `{ nombre, texto, incluye, imagen, imagenes, detalle }`. `incluye`: **una cadena** con «;» (`"Botas; Cascos; Máscaras"`). Sin marcas reales salvo que lo pida el cliente.
- `alquiler.material[]`: `{ nombre, categoria, texto, precio, precio_finde, precio_semana, imagen, imagenes, detalle }`. Precios **como cadena** (`"28 €"`); vacío = celda vacía; `"Consultar"` = se escribe tal cual. `categoria` agrupa las tablas (Esquí, Montaña, Bici). `alquiler.columna_precio`, `columna_finde`, `columna_semana`: nombres de las columnas (por defecto «1 día», «Fin de semana», «Semana»). `alquiler.nota`, `alquiler.cta` (sin url: WhatsApp o llamar).
- `taller.servicios[]`: `{ nombre, categoria, plazo, precio, texto }`. `taller.nota`, `taller.cta`, `taller.imagen`.
- `equipo.personas[]`: `{ nombre, cargo, texto, foto }`. La foto `/placeholders/persona.svg` no se pinta.
- `clubes.items[]`: `{ titulo, texto }` (pasos), `clubes.cta`.
- `tienda.horario[]`: `{ dia, horas }` (sale en la tabla y en el JSON-LD). Sin horario, `contacto.horario`. `tienda.cta` sustituye a «Cómo llegar».
- `opiniones.testimonios[]`: `{ texto, autor, nota }`. No inventes opiniones.
- `preguntas.preguntas[]`: `{ pregunta, respuesta }`.

## Reglas para órdenes
1. **Activar o quitar una sección**: `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, teléfonos, horarios, precios de alquiler o del taller, fotos**: solo en `site.yaml`. Si un texto lleva comas o «: » dentro de `{ … }`, entre comillas.
4. **Listas planas**: ningún elemento de lista lleva otra lista dentro. Máximo 24 elementos por lista. Nunca inventes precios ni cifras.
5. **Página nueva**: `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
6. **Sección nueva**: mejor con `tipo:` (`tipo: texto`, `tipo: taller`, `tipo: clubes`…) y un id propio. Si hace falta un diseño nuevo, crea `src/components/secciones/<id>.astro` con `seccion(Astro.props.id)` y una banda a todo el ancho (`Banda.astro`), contenido en `.contenedor`.
7. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `src/pages/[...pagina].astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Los ids `hero` y `contacto` no se cambian. Tampoco `src/lib/*.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts` (comunes a todas las plantillas). `seo.url` y `seo.indexable` los pone la plataforma.
8. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida y respaldo), JavaScript mínimo (menú y asunto del formulario), 16 px de margen lateral del texto (`.contenedor`), fotos y bandas de borde a borde, sin scroll horizontal en móvil, botones de 44 px o más, titulares sin palabras partidas (`encaje()`). `alt` sacado del contenido; decorativas con `alt=""`.
9. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento)
- Listas con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `secciones.deportes.deportes` → `/deportes/<slug>/` (servicio) y `secciones.alquiler.material` → `/alquiler/<slug>/` (producto, con su precio por día).
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página;
  los demás siguen como hasta ahora. Campos opcionales del elemento: `slug` (si falta, sale del nombre; no lo pongas sin motivo)
  e `imagenes` («/fotos/a.jpg; /fotos/b.jpg», galería de la ficha; la foto principal es `imagen` o, si no hay, la primera de `imagenes`).
- Una orden «añade una página para X» = escribir su `detalle` en site.yaml. Nunca crees a mano páginas en
  `src/pages/deportes/` ni `src/pages/alquiler/`: salen solas de `src/pages/[coleccion]/[slug].astro`.

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "alquiler; taller" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Con ella la web pasa a Inicio (hero + lo que no esté en ninguna página) y una página por entrada; el menú se hace solo y los enlaces `/#id` se cambian solos por la dirección de su sección. Sin ella, una sola página larga. Reparto recomendado en `template.yaml → paginas` (Alquiler, Taller, Clubes y equipo, Horario y contacto). Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` o `rutaDeSeccion(id)` (de `src/lib/multipagina.ts`).
