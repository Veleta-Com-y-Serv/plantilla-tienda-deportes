// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }
/** Un deporte o una sección de la tienda (`deportes.deportes`). `incluye`: «a; b; c». Con `detalle`, tiene página. */
export interface Deporte { nombre: string; texto: string; incluye: string; imagen: string; detalle?: string; imagenes?: string }
/** Material de alquiler (`alquiler.material`): precios como cadena («28 €»), vacío = no se pinta. */
export interface Material {
  nombre: string; categoria: string; texto: string; precio: string; precio_finde: string; precio_semana: string;
  imagen: string; detalle?: string; imagenes?: string;
}
/** Servicio del taller (`taller.servicios`). */
export interface Servicio { nombre: string; categoria: string; plazo: string; precio: string; texto: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  nota?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  deportes: Deporte[];
  material: Material[];
  servicios: Servicio[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter((x) => x && typeof x === 'object') as T[]) : [];
}
export const texto = (v: unknown) => (v == null ? '' : String(v).trim());
/** Copia de un objeto con sus campos de texto convertidos a cadena (los números del YAML, también). Mismo objeto si no cambia nada. */
const comoTexto = (o: Crudo, campos: string[]) => {
  for (const c of campos) if (o[c] != null && typeof o[c] !== 'string') o[c] = String(o[c]);
  for (const c of campos) if (o[c] == null) o[c] = '';
  return o;
};

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    items: lista<Crudo>(s.items).map((i) => comoTexto(i, ['titulo', 'texto'])) as Item[],
    personas: lista<Crudo>(s.personas).map((p) => comoTexto(p, ['nombre', 'cargo', 'foto', 'texto'])) as Persona[],
    testimonios: lista<Crudo>(s.testimonios).map((t) => comoTexto(t, ['texto', 'autor', 'nota'])) as Testimonio[],
    galeria: (Array.isArray(s.galeria) ? s.galeria : []).map(texto).filter(Boolean),
    horario: lista<Crudo>(s.horario).map((h) => comoTexto(h, ['dia', 'horas'])) as Horario[],
    preguntas: lista<Crudo>(s.preguntas).map((p) => comoTexto(p, ['pregunta', 'respuesta'])) as Pregunta[],
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    deportes: lista<Crudo>(s.deportes).map((x) => comoTexto(x, ['nombre', 'texto', 'incluye', 'imagen'])) as Deporte[],
    material: lista<Crudo>(s.material).map((x) =>
      comoTexto(x, ['nombre', 'categoria', 'texto', 'precio', 'precio_finde', 'precio_semana', 'imagen']),
    ) as Material[],
    servicios: lista<Crudo>(s.servicios).map((x) => comoTexto(x, ['nombre', 'categoria', 'plazo', 'precio', 'texto'])) as Servicio[],
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#151a24', acento: '#2448e6', fondo: '#f8f9fc', texto: '#12161e', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'SportingGoodsStore',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
/** ¿Es un enlace a otra web? (se abre en otra pestaña). */
export const externo = (u?: string) => !!u && /^https?:/.test(u);

/** Primera sección activa con ese id o con `tipo:` igual (cabecera, pie, formulario). Devuelve su id y sus datos. */
export function buscarSeccion(diseno: string): { id: string; s: Seccion } | null {
  const id = Object.keys(site.secciones).find((k) => site.secciones[k].activa && (k === diseno || site.secciones[k].tipo === diseno));
  return id ? { id, s: site.secciones[id] } : null;
}

/** "a; b; c" o "a, b, c" → ['a', 'b', 'c']. */
export const partes = (t = '') => t.split(/[;,]/).map((x) => x.trim()).filter(Boolean);
/** ['a', 'b', 'c'] → «a, b y c». */
export const enFrase = (l: string[]) => (l.length < 2 ? l.join('') : `${l.slice(0, -1).join(', ')} y ${l[l.length - 1]}`);

/** ¿El precio se puede enseñar? ("Consultar" o vacío, no). */
export const conPrecio = (p?: string) => !!p && !/^consultar$/i.test(p.trim());

/** Agrupa una lista por su `categoria` (en el orden en que aparecen; sin categoría, un grupo sin nombre). */
export function porCategoria<T extends { categoria?: string }>(l: T[]): { nombre: string; elementos: T[] }[] {
  const grupos: { nombre: string; elementos: T[] }[] = [];
  for (const e of l) {
    const nombre = texto(e.categoria);
    let g = grupos.find((x) => x.nombre === nombre);
    if (!g) grupos.push((g = { nombre, elementos: [] }));
    g.elementos.push(e);
  }
  return grupos;
}

/** ¿La foto es la silueta de respaldo de las personas? (entonces no se pinta: el equipo va en letra). */
export const esSilueta = (f?: string) => !f || /\/placeholders\//.test(f);

/** La acción principal: WhatsApp con un mensaje si lo hay; si no, llamar; si no, el formulario. */
export function preguntar(mensaje: string, textoWa = 'Pregunta por WhatsApp', contacto = '/#contacto') {
  const c = site.contacto;
  if (c.whatsapp) return { texto: textoWa, url: whatsapp(c.whatsapp, mensaje), fuera: true };
  if (c.telefono) return { texto: `Llamar al ${c.telefono}`, url: tel(c.telefono), fuera: false };
  return buscarSeccion('contacto') ? { texto: 'Escríbenos', url: contacto, fuera: false } : null;
}

/**
 * Letras de la palabra más larga de un titular (mínimo 4). Los titulares la llevan en `--letras` y miden
 * `100cqi / (letras × 0,7)`: en Barlow Condensed 800 en mayúsculas una letra mide de media 0,65 em, así que la palabra
 * más larga cabe siempre entera en su columna («Impermeabilizaciones», 20 letras, también a 375 px) y los titulares
 * cortos crecen hasta su tope.
 */
export const letras = (t = '') =>
  Math.max(4, ...String(t).split(/\s+/).map((w) => w.replace(/[^\p{L}\p{N}]/gu, '').length));
/** El atributo style con `--letras` para un titular. */
export const encaje = (t = '') => `--letras:${letras(t)}`;
