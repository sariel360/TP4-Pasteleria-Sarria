# TP4 — Dulce Arte Pastelería 🎂
### Navegación y Experiencia de Usuario
**Laboratorio de Programación — 6° G — 2026**

---

## Estructura del proyecto

```
tp4-pasteleria-dulce-arte/
├── css/
│   └── estilos.css        ← Hoja de estilos externa
├── img/
│   └── (imágenes locales)
├── js/
│   └── pedidos.js         ← Lógica JS (pedidos, lightbox, filtros)
├── index.html             ← Inicio / Dashboard
├── catalogo.html          ← Catálogo con filtros
├── galeria.html           ← Galería con lightbox
├── pedido.html            ← Formulario de pedido funcional
├── contacto.html          ← Contacto + FAQ + mailto
└── README.md
```

---

## ✅ Checklist de Requisitos TP4

### 1. Estructura y Navegación (HTML)

| Requisito | Cumplido | Dónde |
|---|---|---|
| Mínimo 4 páginas HTML | ✅ | index, catalogo, galeria, pedido, contacto (5 páginas) |
| Menú global consistente | ✅ | `<nav>` idéntico en todas las páginas |
| Rutas relativas internas | ✅ | `href="catalogo.html"`, `href="css/estilos.css"`, `src="js/pedidos.js"` |
| Rutas absolutas (externas + nueva pestaña) | ✅ | WhatsApp, Instagram, Facebook, Pinterest |
| Imagen como enlace | ✅ | Logo `<a class="logo-link">` en todas las páginas |
| Enlace mailto | ✅ | `contacto.html` con subject y body predefinidos |

### 2. Estilos de los Enlaces (CSS)

| Requisito | Cumplido | Ubicación en estilos.css |
|---|---|---|
| Estado `:link` | ✅ | `a:link { color: #e91e8c; }` |
| Estado `:visited` | ✅ | `a:visited { color: rgb(150, 30, 100); }` |
| Estado `:hover` | ✅ | `a:hover { color: hsl(330,80%,35%); background-color: rgba(...) }` |
| Estado `:active` | ✅ | `a:active { color: #7b0037; }` |
| Enlace simulado como botón | ✅ | `.btn` con `display:inline-block`, `padding`, `background-color`, `text-decoration:none` |
| Feedback visual en hover | ✅ | Cambio de color + fondo suave en todos los links |

### 3. Integración de Conceptos Anteriores

| Requisito | Cumplido |
|---|---|
| Box model (margin, padding, border) | ✅ |
| Jerarquía visual h1–h3 | ✅ |
| Colores en hex, RGB, HSL, RGBA | ✅ |
| Paleta armónica | ✅ (rosa + dorado + crema) |

### 4. Principios de Steve Krug

| Principio | Aplicación |
|---|---|
| **"Usted está aquí"** | Clase `.activo` en el `<nav>` con `border-bottom` destacado en cada página |
| **Eliminar el ruido** | Sin textos de bienvenida innecesarios. El hero va directo al valor principal |
| **Convenciones** | Logo arriba a la izquierda, menú horizontal debajo del header |
| **Feedback visual** | Hover claro en todos los links; botones con efecto de elevación |

---

## Cómo funciona el sistema de pedidos

1. El cliente completa el formulario en `pedido.html`
2. Elige tamaño, sabor, relleno, cobertura y fecha
3. El resumen se actualiza en tiempo real con el precio estimado
4. Al elegir fecha, el sistema verifica si hay lugar disponible (máx. 2 por día)
5. Al hacer clic en "Enviar pedido", se abre WhatsApp con todos los detalles formateados
6. El pedido queda registrado en `localStorage` del navegador

---

## Configuración del número de WhatsApp

En `js/pedidos.js` línea 1:
```javascript
const WHATSAPP_NUMERO = "5493512000000"; // ← Cambiar por el número real
```
Formato: `549` + código de área sin 0 + número. Ej: `5493512345678`

---

## Cómo aplicé los estados de links para mejorar la UX

Los estados de los enlaces en CSS sirven para dar **feedback visual** al usuario, ayudándolo a navegar sin confusión:

- **`:link`** — Color rosa `#e91e8c`: identifica inmediatamente que el elemento es clickeable y se mantiene coherente con la paleta del sitio.
- **`:visited`** — Color rosa oscuro `rgb(150, 30, 100)`: indica al usuario qué páginas ya visitó, reduciendo el trabajo cognitivo al navegar.
- **`:hover`** — Cambio a `hsl(330, 80%, 35%)` con fondo `rgba` suave: el usuario sabe sin dudarlo que puede hacer clic. Esto aplica el principio de Krug "no me hagas pensar".
- **`:active`** — Color muy oscuro `#7b0037`: confirma visualmente el clic, dando sensación de respuesta inmediata del sistema.

Los botones (`.btn`) usan `display: inline-block` + `padding` + `background-color` + `text-decoration: none` para parecer botones reales y no enlaces de texto, cumpliendo las convenciones que los usuarios ya conocen.

---

## GitHub Pages

URL: `https://[tu-usuario].github.io/TP4-pasteleria-dulce-arte/`
