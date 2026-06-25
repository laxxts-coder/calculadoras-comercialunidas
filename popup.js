'use strict';
const $ = id => document.getElementById(id);
const cap = s => s.replace(/\b[a-záéíóúüñ]/gi, l => l.toUpperCase());
function fmt(n, dec = 2) {
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

// ═══════════════════════════════════════════════════════
//  NAVEGACIÓN
// ═══════════════════════════════════════════════════════
const headers = {
  ceramica:  { title: 'Calculadora de Cerámica',  sub: 'Calcula las cajas que necesitas',      icon: 'data:image/png;base64,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' },
  descuento: { title: 'Calculadora de Descuento', sub: 'Calcula el porcentaje de descuento',   icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABQWlDQ1BpY2MAABiVY2BgfJCTnFvMosDAkJtXUhTk7qQQERmlwP6IgZlBhIGTgY9BNjG5uMA32C2EAQiKE8uLk0uKchhQwLdrDIwg+rJuRmJeSuXL/WFRdozbmpVbQ92++69iwA+4UlKLk4H0HyBWSS4oKmFgYAS6hkGpvKQAxHYBskWSMxJTgOwIIFunCOhAILsFJJ4OYc8AsZMg7DUgdlFIkDOQfQDIVkhHYichsXNzSpOhbgC5nic1LzQYSHMAsQxDMUMQgzuDEw41bGA1zkBowMAACi/0cChOMzaC6OKxZ2Bgvfv//2c1Bgb2CQwMfyf9//974f//fxcxMDDfYWA4UIjQn7+AgcHiE1C8HyGWNI2BYXsnA4PELYSYClAdfysDw7YjBYlFiWAhZiBmSstkYPi0nIGBN5KBQfgCMGijAePiX7HBtO4oAAAAIGNIUk0AAHonAACAhQAA+gcAAIDlAAB1MAAA6mAAADqYAAAXcVZoDcoAAAJnUExURQAAAMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMip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' },
  iva:       { title: 'Calculadora de IVA',       sub: 'Honduras · 15% por defecto',           icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABQWlDQ1BpY2MAABiVY2BgfJCTnFvMosDAkJtXUhTk7qQQERmlwP6IgZlBhIGTgY9BNjG5uMA32C2EAQiKE8uLk0uKchhQwLdrDIwg+rJuRmJeSuXL/WFRdozbmpVbQ92++69iwA+4UlKLk4H0HyBWSS4oKmFgYAS6hkGpvKQAxHYBskWSMxJTgOwIIFunCOhAILsFJJ4OYc8AsZMg7DUgdlFIkDOQfQDIVkhHYichsXNzSpOhbgC5nic1LzQYSHMAsQxDMUMQgzuDEw41bGA1zkBowMAACi/0cChOMzaC6OKxZ2Bgvfv//2c1Bgb2CQwMfyf9//974f//fxcxMDDfYWA4UIjQn7+AgcHiE1C8HyGWNI2BYXsnA4PELYSYClAdfysDw7YjBYlFiWAhZiBmSstkYPi0nIGBN5KBQfgCMGijAePiX7HBtO4oAAAAIGNIUk0AAHonAACAhQAA+gcAAIDlAAB1MAAA6mAAADqYAAAXcVZoDcoAAAIWUExURQAAAMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMipZMip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' },
};

function mostrarCalc(nombre) {
  ['ceramica','descuento','iva'].forEach(c =>
    $(`calc-${c}`).style.display = c === nombre ? 'block' : 'none');
  document.querySelectorAll('.drop-item').forEach(b =>
    b.classList.toggle('active', b.dataset.calc === nombre));
  $('header-title').textContent = headers[nombre].title;
  $('header-sub').textContent   = headers[nombre].sub;
  const headerIcon = document.querySelector('.header-icon img');
  if (headerIcon) headerIcon.src = headers[nombre].icon;
  $('dropdown').classList.remove('open');
  try { localStorage.setItem('calc_activo', nombre); } catch {}

  // Auto-focus al cambiar
  setTimeout(() => {
    if (nombre === 'ceramica')  $('metros-caja').focus();
    if (nombre === 'descuento') $('precio-original').focus();
    if (nombre === 'iva')       $('monto-total-iva').focus();
  }, 50);
}

$('btn-menu').addEventListener('click', e => {
  e.stopPropagation();
  $('dropdown').classList.toggle('open');
});
document.querySelectorAll('.drop-item').forEach(b =>
  b.addEventListener('click', () => mostrarCalc(b.dataset.calc)));
document.addEventListener('click', () => $('dropdown').classList.remove('open'));

// ═══════════════════════════════════════════════════════
//  CALCULADORA 1: CERÁMICA
// ═══════════════════════════════════════════════════════
const inputs = {
  piezas: $('piezas'), metrosCaja: $('metros-caja'),
  metrosTotal: $('metros-total'), desperdicio: $('desperdicio'),
};
const out = {
  resultado: $('resultado'), cajas: $('res-cajas'), piezasTotal: $('res-piezas-total'),
  roundBar: $('round-bar'), btnRedondear: $('btn-redondear'), btnOriginal: $('btn-original'),
  cajasEnteras: $('res-cajas-enteras'), rowFaltantes: $('row-faltantes'),
  labelFaltantes: $('label-faltantes'), faltantes: $('res-faltantes'),
  metrosBase: $('res-metros-base'), bloqueDesp: $('bloque-desp'),
  despLabel: $('desp-label'), despMetros: $('desp-metros'),
  rowCajasExtra: $('row-cajas-extra'), cajasExtra: $('res-cajas-extra'),
  piezasExtra: $('res-piezas-extra'), metrosDesp: $('res-metros-desp'),
  tipDesp: $('tip-text'), tipBase: $('tip-base'), piezaInfo: $('pieza-info'),
};

let despMode = 'm2', savedBase = null;

function saveInputsCer() {
  const d = {};
  Object.keys(inputs).forEach(k => { d[k] = inputs[k].value; });
  d._despMode = despMode;
  try { localStorage.setItem('ceramica_inputs', JSON.stringify(d)); } catch {}
}
function loadInputsCer() {
  try {
    const raw = localStorage.getItem('ceramica_inputs');
    if (!raw) return;
    const d = JSON.parse(raw);
    Object.keys(inputs).forEach(k => { if (d[k] !== undefined) inputs[k].value = d[k]; });
    if (d._despMode) despMode = d._despMode;
  } catch {}
}
Object.values(inputs).forEach(el => el.addEventListener('input', saveInputsCer));

// Enter navigation: metros-caja → piezas → metros-total → calcular
$('metros-caja').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); inputs.piezas.focus(); }
});
$('piezas').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); inputs.metrosTotal.focus(); }
});
$('metros-total').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); savedBase = null; calcularCer(null); }
});

function actualizarPiezaInfo() {
  const p = parseFloat(inputs.piezas.value), m = parseFloat(inputs.metrosCaja.value);
  if (p > 0 && m > 0) {
    out.piezaInfo.style.display = 'block';
    out.piezaInfo.textContent = `( C/P · ${(m/p).toFixed(4).replace(/\.?0+$/,'')} m² )`;
  } else { out.piezaInfo.style.display = 'none'; }
}
inputs.piezas.addEventListener('input', actualizarPiezaInfo);
inputs.metrosCaja.addEventListener('input', actualizarPiezaInfo);

const toggleDesp = $('toggle-desp');
toggleDesp.addEventListener('click', () => {
  despMode = despMode === '%' ? 'm2' : '%';
  toggleDesp.textContent = despMode === '%' ? '%' : 'm²';
  inputs.desperdicio.value = '';
  inputs.desperdicio.placeholder = despMode === '%' ? '0' : '0.00';
  inputs.desperdicio.step = despMode === '%' ? '1' : '0.01';
  saveInputsCer();
});

function calcularCer(forzarRedondeo) {
  const piezasCaja = parseInt(inputs.piezas.value,10);
  const metrosCaja = parseFloat(inputs.metrosCaja.value);
  const metrosTotal = parseFloat(inputs.metrosTotal.value);
  const despRaw = parseFloat(inputs.desperdicio.value) || 0;

  const errores = [];
  if (!piezasCaja||piezasCaja<=0) errores.push(inputs.piezas);
  if (!metrosCaja||metrosCaja<=0) errores.push(inputs.metrosCaja);
  if (!metrosTotal||metrosTotal<=0) errores.push(inputs.metrosTotal);
  if (errores.length) {
    errores.forEach(el => {
      const w = el.closest('.input-wrap');
      w.classList.remove('shake'); void w.offsetWidth; w.classList.add('shake');
      setTimeout(() => w.classList.remove('shake'), 400);
    });
    out.resultado.style.display = 'none'; return;
  }

  let desperdicio = despMode==='m2' && despRaw>0 && metrosTotal>0
    ? (despRaw/metrosTotal)*100 : despRaw;

  const mpp = metrosCaja/piezasCaja;
  let cajasEx = metrosTotal/metrosCaja;
  let cajasEnt = Math.floor(cajasEx);
  const dec = cajasEx%1;
  if (forzarRedondeo===true) cajasEnt = Math.ceil(cajasEx);
  if (forzarRedondeo==null) savedBase = { cajasEx, mostrar: dec>=0.50 };

  const mCubBase = cajasEnt*metrosCaja;
  const mFaltB   = metrosTotal-mCubBase;
  const pFalt    = mFaltB>0.0001 ? Math.ceil(mFaltB/mpp) : 0;
  const mTotBase = mCubBase+pFalt*mpp;

  let cajasExD=0,pExD=0,mCubD=mTotBase;
  if (desperdicio>0) {
    const aD=metrosTotal*(1+desperdicio/100), mPD=aD-mTotBase;
    if (mPD>0.0001) {
      cajasExD=Math.floor(mPD/metrosCaja);
      const fr=mPD-cajasExD*metrosCaja;
      pExD=fr>0.0001?Math.ceil(fr/mpp):0;
      mCubD=mTotBase+cajasExD*metrosCaja+pExD*mpp;
    }
  }

  const pTotal = desperdicio>0 ? pFalt+pExD : pFalt;
  out.cajas.textContent = forzarRedondeo===true ? cajasEnt
    : (dec<0.0001 ? cajasEx.toFixed(0) : cajasEx.toFixed(2));
  out.piezasTotal.textContent = pTotal;

  if (forzarRedondeo===true) {
    out.roundBar.style.display='flex'; out.btnRedondear.style.display='none'; out.btnOriginal.style.display='inline-block';
  } else if (savedBase?.mostrar) {
    out.roundBar.style.display='flex'; out.btnRedondear.style.display='inline-block'; out.btnOriginal.style.display='none';
  } else { out.roundBar.style.display='none'; }

  out.cajasEnteras.textContent = cap(`${cajasEnt} cajas`);
  out.metrosBase.textContent   = `${fmt(mTotBase)} m²`;

  if (pFalt>0) {
    out.rowFaltantes.style.display='flex'; out.labelFaltantes.textContent=cap('Piezas Faltantes');
    out.faltantes.className='warn';
    out.faltantes.textContent=`${cap(`${pFalt} ${pFalt===1?'pieza':'piezas'}`)} ( ${fmt(pFalt*mpp)} m² )`;
  } else {
    out.rowFaltantes.style.display='flex'; out.labelFaltantes.textContent='✔ Cierra Exacto';
    out.faltantes.className='ok'; out.faltantes.textContent=cap('Sin Piezas Faltantes');
  }

  if (desperdicio===0) {
    out.tipBase.style.display='block';
    const cD=Math.floor(pFalt/piezasCaja),pR=pFalt%piezasCaja,cR=cajasEnt+cD;
    out.tipBase.textContent = forzarRedondeo===true
      ? cap(`total para ${fmt(mTotBase)} m²: ${cajasEnt} cajas`)
      : cap(`total para ${fmt(mTotBase)} m²: ${cR} ${cR!==1?'cajas':'caja'}${pR>0?` y ${pR} ${pR!==1?'piezas':'pieza'}`:''}`);
  } else { out.tipBase.style.display='none'; }

  if (desperdicio>0) {
    out.bloqueDesp.style.display='block';
    out.despLabel.textContent = despMode==='m2'
      ? cap(`${fmt(despRaw)} m² Desperdicios`) : cap(`${despRaw}% Desperdicios`);
    if (cajasExD>0) {
      out.rowCajasExtra.style.display='flex';
      out.cajasExtra.textContent=cap(`+${cajasExD} ${cajasExD===1?'caja':'cajas'}`);
      out.despMetros.textContent=`+${fmt(cajasExD*metrosCaja+pExD*mpp)} m²`;
    } else { out.rowCajasExtra.style.display='none'; out.despMetros.textContent=''; }
    out.piezasExtra.textContent=`${cap(`${pExD} ${pExD===1?'pieza':'piezas'}`)} ( ${fmt(pExD*mpp)} m² )`;
    out.metrosDesp.textContent=`${fmt(mCubD)} m²`;
    const pST=pFalt+pExD,cD2=Math.floor(pST/piezasCaja),pR2=pST%piezasCaja,cRes=cajasEnt+cajasExD+cD2;
    out.tipDesp.textContent=cap(`total para ${fmt(mCubD)} m²: ${cRes} ${cRes!==1?'cajas':'caja'}${pR2>0?` y ${pR2} ${pR2!==1?'piezas':'pieza'}`:''}`);
  } else { out.bloqueDesp.style.display='none'; }

  out.resultado.style.display='block';
  out.piezaInfo.style.display='block';
  out.piezaInfo.textContent=`( C/P · ${(metrosCaja/piezasCaja).toFixed(4).replace(/\.?0+$/,'')} m² )`;
}

$('btn-redondear').addEventListener('click', () => calcularCer(true));
$('btn-original').addEventListener('click',  () => calcularCer(null));
$('btn-calcular').addEventListener('click',  () => { savedBase=null; calcularCer(null); });
$('btn-reset').addEventListener('click', () => {
  Object.values(inputs).forEach(el => el.value='');
  inputs.desperdicio.value='0'; savedBase=null;
  out.resultado.style.display='none';
  out.piezaInfo.style.display='none';
  try { localStorage.removeItem('ceramica_inputs'); } catch {}
  setTimeout(() => $('metros-caja').focus(), 50);
});

// ═══════════════════════════════════════════════════════
//  CALCULADORA 2: DESCUENTO (tu código original)
// ═══════════════════════════════════════════════════════
let pctResultado = 0;

function loadDesc() {
  try {
    const d = JSON.parse(localStorage.getItem('desc_state') || '{}');
    if (d.precio) $('precio-original').value   = d.precio;
    if (d.final)  $('precio-final-input').value = d.final;
  } catch {}
}
function saveDesc() {
  try {
    localStorage.setItem('desc_state', JSON.stringify({
      precio: $('precio-original').value,
      final:  $('precio-final-input').value
    }));
  } catch {}
}

function calcDesc() {
  const precio = parseFloat($('precio-original').value);
  const final  = parseFloat($('precio-final-input').value);
  if (!precio || precio<=0 || isNaN(final) || final<0 || final>precio) {
    $('resultado-desc').style.display='none'; return;
  }
  const ahorro = precio - final;
  const pct    = (ahorro / precio) * 100;
  pctResultado = pct;
  $('res-pct-final').textContent     = `${fmt(pct,1)}%`;
  $('res-ahorro').textContent        = `L ${fmt(ahorro)}`;
  $('res-precio-orig-d').textContent = `L ${fmt(precio)}`;
  $('res-precio-final-d').textContent= `L ${fmt(final)}`;
  $('tip-desc').textContent = cap(`descuento del ${fmt(pct,1)}% aplicado`);
  $('resultado-desc').style.display='block';
  saveDesc();
}

$('precio-original').addEventListener('input', () => { calcDesc(); saveDesc(); });
$('precio-final-input').addEventListener('input', () => { calcDesc(); saveDesc(); });

$('precio-original').addEventListener('keydown', e => {
  if (e.key==='Enter') { e.preventDefault(); $('precio-final-input').focus(); }
});
$('precio-final-input').addEventListener('keydown', async e => {
  if (e.key==='Enter') {
    e.preventDefault();
    if ($('resultado-desc').style.display==='block') {
      const val = pctResultado.toFixed(1);
      try {
        await navigator.clipboard.writeText(val);
        const orig = $('tip-desc').textContent;
        $('tip-desc').textContent = `¡Copiado: ${val}!`;
        setTimeout(() => { $('tip-desc').textContent = orig; }, 2000);
      } catch {}
    }
  }
});

$('btn-reset-desc').addEventListener('click', () => {
  $('precio-original').value=''; $('precio-final-input').value='';
  $('resultado-desc').style.display='none'; saveDesc();
  $('precio-original').focus();
});

// ═══════════════════════════════════════════════════════
//  CALCULADORA 3: IVA (tu código original)
// ═══════════════════════════════════════════════════════
function loadIva() {
  try {
    const d = JSON.parse(localStorage.getItem('iva_standalone_state') || '{}');
    if (d.tasa)  $('tasa-iva').value        = d.tasa;
    if (d.total) $('monto-total-iva').value = d.total;
  } catch {}
}
function saveIva() {
  try {
    localStorage.setItem('iva_standalone_state', JSON.stringify({
      tasa:  $('tasa-iva').value,
      total: $('monto-total-iva').value,
    }));
  } catch {}
}

function calcIva() {
  const tasa  = parseFloat($('tasa-iva').value) || 15;
  const total = parseFloat($('monto-total-iva').value);
  if (!total || total<=0) { $('resultado-iva').style.display='none'; return; }
  const pBase = total/(1+tasa/100);
  const pIva  = total-pBase;
  $('res-base-iva').textContent  = `L ${fmt(pBase)}`;
  $('res-label-iva').textContent = `IVA ${tasa}%`;
  $('res-monto-iva').textContent = `L ${fmt(pIva)}`;
  $('res-total-iva').textContent = `L ${fmt(total)}`;
  $('resultado-iva').style.display='block';
  saveIva();
}

$('monto-total-iva').addEventListener('input', () => { calcIva(); saveIva(); });
$('tasa-iva').addEventListener('input', () => { calcIva(); saveIva(); });

$('btn-reset-iva').addEventListener('click', () => {
  $('monto-total-iva').value=''; $('tasa-iva').value='15';
  $('resultado-iva').style.display='none'; saveIva();
  $('monto-total-iva').focus();
});

// ═══════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════
loadInputsCer();
toggleDesp.textContent         = despMode==='%' ? '%' : 'm²';
inputs.desperdicio.placeholder = despMode==='%' ? '0' : '0.00';
inputs.desperdicio.step        = despMode==='%' ? '1' : '0.01';
if (!inputs.desperdicio.value) inputs.desperdicio.value='0';

loadDesc();
loadIva();
if (!$('tasa-iva').value) $('tasa-iva').value='15';

// Restaurar calculadora activa
try {
  const saved = localStorage.getItem('calc_activo');
  mostrarCalc(saved || 'ceramica');
} catch { mostrarCalc('ceramica'); }

// Recalcular si había datos guardados
const hayDatos = Object.values(inputs).every(el => el.value!=='');
if (hayDatos) calcularCer(null);
if ($('precio-original').value && $('precio-final-input').value) calcDesc();
if ($('monto-total-iva').value) calcIva();

// Focus inicial
setTimeout(() => {
  const activo = localStorage.getItem('calc_activo') || 'ceramica';
  if (activo === 'ceramica')  $('metros-caja').focus();
  if (activo === 'descuento') $('precio-original').focus();
  if (activo === 'iva')       $('monto-total-iva').focus();
}, 80);
