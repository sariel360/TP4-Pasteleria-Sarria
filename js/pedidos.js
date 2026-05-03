/* ==========================================
   Dulce Arte Pastelería — Lógica de Pedidos
   TP4 - Laboratorio de Programación 6°G
   ========================================== */

const WHATSAPP_NUMERO = "5493512000000"; // ← Reemplazar con número real
const MAX_PEDIDOS_DIA = 2;

const PRECIOS_TAMANIO = {
  pequena: 8500, mediana: 14000, grande: 20000, especial: 28000
};
const PRECIOS_RELLENO = {
  "dulce-leche": 0, "chocolate": 0, "vainilla-crema": 0,
  "frutillas": 500, "limon": 500, "nutella": 800,
  "cheesecake": 800, "tiramisú": 1000
};
const PRECIOS_COBERTURA = {
  "fondant": 1500, "buttercream": 800, "ganache": 1000,
  "merengue": 600, "chocolate-espejo": 1200
};

function obtenerPedidos() {
  return JSON.parse(localStorage.getItem("dulcearte_pedidos") || "[]");
}

function guardarPedido(pedido) {
  const pedidos = obtenerPedidos();
  pedidos.push(pedido);
  localStorage.setItem("dulcearte_pedidos", JSON.stringify(pedidos));
}

function contarPedidosPorFecha(fecha) {
  return obtenerPedidos().filter(p => p.fecha === fecha).length;
}

function getFechaMinima() {
  const d = new Date();
  d.setDate(d.getDate() + 5);
  return d.toISOString().split("T")[0];
}

function formatearFecha(fechaStr) {
  if (!fechaStr) return "—";
  const [y, m, d] = fechaStr.split("-");
  return `${d}/${m}/${y}`;
}

function inicializarFecha() {
  const input = document.getElementById("fecha-entrega");
  if (!input) return;
  input.min = getFechaMinima();
  input.addEventListener("change", () => {
    actualizarDisponibilidad(input.value);
    actualizarResumen();
  });
}

function actualizarDisponibilidad(fecha) {
  const aviso = document.getElementById("disponibilidad-aviso");
  const btn   = document.getElementById("btn-enviar-pedido");
  if (!aviso) return;

  if (!fecha) {
    aviso.className = "disponibilidad-aviso vacio";
    aviso.textContent = "Elegí una fecha para ver la disponibilidad.";
    if (btn) btn.disabled = true;
    return;
  }

  const count = contarPedidosPorFecha(fecha);
  const restantes = MAX_PEDIDOS_DIA - count;

  if (restantes <= 0) {
    aviso.className = "disponibilidad-aviso lleno";
    aviso.innerHTML = `❌ <strong>No hay lugar para el ${formatearFecha(fecha)}.</strong> Elegí otro día.`;
    if (btn) btn.disabled = true;
  } else if (restantes === 1) {
    aviso.className = "disponibilidad-aviso ok";
    aviso.innerHTML = `⚠️ <strong>¡Último lugar disponible</strong> para el ${formatearFecha(fecha)}!`;
    if (btn) btn.disabled = false;
  } else {
    aviso.className = "disponibilidad-aviso ok";
    aviso.innerHTML = `✅ <strong>${restantes} lugares disponibles</strong> para el ${formatearFecha(fecha)}.`;
    if (btn) btn.disabled = false;
  }
}

function actualizarResumen() {
  const get = id => document.getElementById(id)?.value || "";
  const tamanio   = document.querySelector('input[name="tamanio"]:checked')?.value || "";
  const pisos     = get("pisos");
  const sabor     = get("sabor");
  const relleno   = get("relleno");
  const cobertura = get("cobertura");

  let total = PRECIOS_TAMANIO[tamanio] || 0;
  total += PRECIOS_RELLENO[relleno] || 0;
  total += PRECIOS_COBERTURA[cobertura] || 0;
  if (pisos === "2") total += 5000;
  if (pisos === "3") total += 12000;

  const tamTextos = { pequena:"Pequeña (hasta 10 porciones)", mediana:"Mediana (hasta 20 porciones)", grande:"Grande (hasta 35 porciones)", especial:"Especial (más de 35 porciones)" };
  const sabTextos = { vainilla:"Vainilla", chocolate:"Chocolate", limon:"Limón", zanahoria:"Zanahoria", "red-velvet":"Red Velvet", margarita:"Mármol", banana:"Banana", coco:"Coco" };
  const relTextos = { "dulce-leche":"Dulce de leche", "chocolate":"Ganache de chocolate", "vainilla-crema":"Crema de vainilla", "frutillas":"Frutillas (+$500)", "limon":"Crema de limón (+$500)", "nutella":"Nutella (+$800)", "cheesecake":"Cheesecake (+$800)", "tiramisú":"Tiramisú (+$1.000)" };
  const cobTextos = { fondant:"Fondant (+$1.500)", buttercream:"Buttercream (+$800)", ganache:"Ganache (+$1.000)", merengue:"Merengue suizo (+$600)", "chocolate-espejo":"Chocolate espejo (+$1.200)" };

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || "—"; };
  set("res-nombre",    get("nombre-cliente"));
  set("res-tamanio",   tamTextos[tamanio] || "—");
  set("res-pisos",     pisos ? `${pisos} piso${pisos > 1 ? "s" : ""}` : "—");
  set("res-sabor",     sabTextos[sabor] || "—");
  set("res-relleno",   relTextos[relleno] || "—");
  set("res-cobertura", cobTextos[cobertura] || "—");
  set("res-decoracion", get("decoracion"));
  set("res-mensaje",   get("mensaje-torta"));
  set("res-fecha",     formatearFecha(get("fecha-entrega")));
  set("res-total",     total > 0 ? `$${total.toLocaleString("es-AR")}` : "—");
}

function validarCampo(id, check) {
  const el = document.getElementById(id);
  const grupo = el?.closest(".campo-grupo");
  if (!grupo) return true;
  const ok = check(el?.value || "");
  grupo.classList.toggle("error", !ok);
  return ok;
}

function validarFormulario() {
  let ok = true;
  ok = validarCampo("nombre-cliente", v => v.trim().length >= 2) && ok;
  ok = validarCampo("telefono",       v => /^[\d\s\+\-]{7,15}$/.test(v.trim())) && ok;
  ok = validarCampo("sabor",          v => v !== "") && ok;
  ok = validarCampo("relleno",        v => v !== "") && ok;
  ok = validarCampo("cobertura",      v => v !== "") && ok;
  ok = validarCampo("fecha-entrega",  v => v !== "") && ok;

  const tamanio = document.querySelector('input[name="tamanio"]:checked');
  const grupoTam = document.getElementById("grupo-tamanio");
  if (!tamanio) { grupoTam?.classList.add("error"); ok = false; }
  else grupoTam?.classList.remove("error");

  const fecha = document.getElementById("fecha-entrega")?.value;
  if (fecha && contarPedidosPorFecha(fecha) >= MAX_PEDIDOS_DIA) {
    actualizarDisponibilidad(fecha); ok = false;
  }
  return ok;
}

function armarMensajeWhatsApp() {
  const get = id => document.getElementById(id)?.value || "";
  const tamanio = document.querySelector('input[name="tamanio"]:checked')?.value || "";
  let total = PRECIOS_TAMANIO[tamanio] || 0;
  const pisos = get("pisos");
  total += PRECIOS_RELLENO[get("relleno")] || 0;
  total += PRECIOS_COBERTURA[get("cobertura")] || 0;
  if (pisos === "2") total += 5000;
  if (pisos === "3") total += 12000;

  const lineas = [
    "🎂 *NUEVO PEDIDO — DULCE ARTE PASTELERÍA*",
    "━━━━━━━━━━━━━━━━━━",
    `👤 *Cliente:* ${get("nombre-cliente")}`,
    `📱 *Teléfono:* ${get("telefono")}`,
    "━━━━━━━━━━━━━━━━━━",
    `📏 *Tamaño:* ${tamanio}`,
    `🔢 *Pisos:* ${pisos}`,
    `🍰 *Sabor de la masa:* ${get("sabor")}`,
    `🍮 *Relleno:* ${get("relleno")}`,
    `🎨 *Cobertura:* ${get("cobertura")}`,
    get("decoracion")    ? `✨ *Decoración:* ${get("decoracion")}` : null,
    get("mensaje-torta") ? `💬 *Mensaje en la torta:* "${get("mensaje-torta")}"` : null,
    get("observaciones") ? `📝 *Observaciones:* ${get("observaciones")}` : null,
    "━━━━━━━━━━━━━━━━━━",
    `📅 *Fecha de entrega:* ${formatearFecha(get("fecha-entrega"))}`,
    `💰 *Precio estimado:* $${total.toLocaleString("es-AR")}`,
    "━━━━━━━━━━━━━━━━━━",
    "_Pedido enviado desde el sitio web_"
  ].filter(Boolean).join("\n");

  return encodeURIComponent(lineas);
}

function enviarPedido() {
  if (!validarFormulario()) {
    document.querySelector(".campo-grupo.error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  guardarPedido({
    fecha:   document.getElementById("fecha-entrega").value,
    nombre:  document.getElementById("nombre-cliente").value,
    tel:     document.getElementById("telefono").value,
    tamanio: document.querySelector('input[name="tamanio"]:checked')?.value,
    ts:      Date.now()
  });
  window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${armarMensajeWhatsApp()}`, "_blank");
  document.getElementById("modal-exito")?.classList.add("activo");
  document.getElementById("form-pedido")?.reset();
  document.querySelectorAll(".campo-grupo.error").forEach(el => el.classList.remove("error"));
  actualizarResumen();
  actualizarDisponibilidad("");
}

/* ── GALERÍA / LIGHTBOX ── */
let galeriaActual = [];
let indexActual   = 0;

function abrirLightbox(i) {
  indexActual = i;
  document.getElementById("lightbox")?.classList.add("activo");
  mostrarImagenLightbox();
  document.body.style.overflow = "hidden";
}

function cerrarLightbox() {
  document.getElementById("lightbox")?.classList.remove("activo");
  document.body.style.overflow = "";
}

function mostrarImagenLightbox() {
  const img     = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  if (!img || !galeriaActual[indexActual]) return;
  img.src = galeriaActual[indexActual].src;
  img.alt = galeriaActual[indexActual].alt;
  if (caption) caption.textContent = galeriaActual[indexActual].alt;
}

function navLightbox(dir) {
  indexActual = (indexActual + dir + galeriaActual.length) % galeriaActual.length;
  mostrarImagenLightbox();
}

function inicializarGaleria() {
  const items = document.querySelectorAll(".galeria-item");
  galeriaActual = Array.from(items).map(item => ({
    src: item.querySelector("img")?.src || "",
    alt: item.querySelector("img")?.alt || ""
  }));
  items.forEach((item, i) => item.addEventListener("click", () => abrirLightbox(i)));
  document.getElementById("lightbox-cerrar")?.addEventListener("click", cerrarLightbox);
  document.getElementById("lightbox-prev")?.addEventListener("click", () => navLightbox(-1));
  document.getElementById("lightbox-next")?.addEventListener("click", () => navLightbox(1));
  document.getElementById("lightbox")?.addEventListener("click", e => {
    if (e.target.id === "lightbox") cerrarLightbox();
  });
  document.addEventListener("keydown", e => {
    if (!document.getElementById("lightbox")?.classList.contains("activo")) return;
    if (e.key === "Escape")     cerrarLightbox();
    if (e.key === "ArrowRight") navLightbox(1);
    if (e.key === "ArrowLeft")  navLightbox(-1);
  });
}

function inicializarFiltros() {
  document.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
      const filtro = btn.dataset.filtro;
      document.querySelectorAll(".torta-card, .galeria-item").forEach(card => {
        const cats = card.dataset.categorias || "";
        card.style.display = filtro === "todo" || cats.includes(filtro) ? "" : "none";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarFecha();
  inicializarGaleria();
  inicializarFiltros();
  document.getElementById("btn-enviar-pedido")?.addEventListener("click", enviarPedido);
  document.getElementById("modal-cerrar")?.addEventListener("click", () => {
    document.getElementById("modal-exito")?.classList.remove("activo");
  });

  const campos = ["nombre-cliente","telefono","sabor","relleno","cobertura","decoracion","pisos","mensaje-torta","observaciones"];
  campos.forEach(id => {
    document.getElementById(id)?.addEventListener("input", actualizarResumen);
    document.getElementById(id)?.addEventListener("change", actualizarResumen);
  });
  document.querySelectorAll('input[name="tamanio"]').forEach(r => r.addEventListener("change", actualizarResumen));
  actualizarResumen();
});
