# Plantilla NoExpertise · Tienda de deportes y montaña

Web para tiendas de deportes independientes y especializadas: material de montaña, esquí y escalada, running y trail, bici (venta y taller), alquiler de esquís, raquetas, bicis o material de ferrata, reparación y encerado y equipación de clubes. Es el escaparate de una tienda física: qué secciones tiene, precios de alquiler y del taller, horario, dónde está y preguntar por un producto por teléfono o WhatsApp.

- Sectores: tienda-deportes, tienda-montana, alquiler-esqui, tienda-bicis, tienda. Estilo: piste (tema Piste de Hallmark). Plan mínimo: gratis. Orden 800.
- Secciones: hero, deportes, alquiler, taller, equipo, clubes, tienda, opiniones, preguntas, contacto (y `texto` para apartados nuevos).
- Diseño a ancho completo: portada con la foto a sangre y un velo de papel nieve, tablero de cifras en cobalto, estanterías de deportes con foto, el tablón del alquiler por días (firma), taller con foto vertical y lista de precios, la banda cobalto «Lo probamos antes de vendértelo» con el equipo en letra, pasos para equipar a un club, horario en tabla con la foto de la tienda, opiniones, preguntas y contacto con el teléfono enorme y el formulario en el mostrador. Barlow Condensed y Barlow alojadas en `public/fuentes/` (OFL). Detalle en `DISEÑO.md`.
- Ejemplo: Alta Ruta, tienda de montaña ficticia en Vielha (Val d'Aran).
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD (`SportingGoodsStore`) y preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Páginas propias: cada deporte con `detalle` en `/deportes/<slug>/` y cada material de alquiler con `detalle` en `/alquiler/<slug>/` (`fichas:` en `template.yaml`, espejo en `src/data/fichas.ts`).
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): reparto recomendado en `template.yaml → paginas` (Alquiler, Taller, Clubes y equipo, Horario y contacto). Sin la clave, una sola página larga.
- Contenido editable en `site.yaml`; metadatos y guion del asistente (13 pasos propios) en `template.yaml`; reglas para el agente en `CLAUDE.md`; fotos a generar en `fotos.json` (12).

## Campos propios

| Sección | Campos |
|---|---|
| `hero` | `cta`, `cta_secundario`, `items` [{titulo, texto}] (tablero de cifras) |
| `deportes` | `deportes` [{nombre, texto, incluye, imagen, imagenes, detalle, slug}] |
| `alquiler` | `columna_precio`, `columna_finde`, `columna_semana`, `nota`, `cta`, `material` [{nombre, categoria, texto, precio, precio_finde, precio_semana, imagen, imagenes, detalle, slug}] |
| `taller` | `imagen`, `nota`, `cta`, `servicios` [{nombre, categoria, plazo, precio, texto}] |
| `equipo` | `personas` [{nombre, cargo, texto, foto}] |
| `clubes` | `cta`, `items` [{titulo, texto}] (pasos) |
| `tienda` | `imagen`, `cta`, `horario` [{dia, horas}] |
| `opiniones` | `testimonios` [{texto, autor, nota}] |
| `preguntas` | `preguntas` [{pregunta, respuesta}] |

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Fuentes con licencia SIL Open Font License 1.1 (`public/fuentes/LICENCIAS.md`). Imágenes de relleno (`public/placeholders/`) dibujadas para esta plantilla, sin licencias de terceros.
