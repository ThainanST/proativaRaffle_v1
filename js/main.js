const CONFIG = {
  googleFormUrl: "https://forms.gle/SEU_LINK_AQUI",
  price: "R$ 10,00",
  sold: 320,
  total: 1000,
  daysLeftText: "20 dias restantes",
  videoUrl: ""
};

// Hardcoded published-sheet CSV URL (kept as requested)
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRkpLBKox1C-njZozGy5TMamCZCiqWZeqeSUtEQzjx3l4ebTrrgZyJ-KtHnojay4TOQGQhWsfiyHiN6/pub?gid=0&single=true&output=csv';

function setHref(id, url){
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute("href", url);
}

function formatPT(num){
  return new Intl.NumberFormat("pt-BR").format(num);
}

function applyConfig(){
  document.getElementById("priceText").textContent = CONFIG.price;
  document.getElementById("soldNum").textContent = formatPT(CONFIG.sold);
  document.getElementById("totalNum").textContent = formatPT(CONFIG.total);
  document.getElementById("daysText").textContent = CONFIG.daysLeftText;

  const soldLine = `${formatPT(CONFIG.sold)} / ${formatPT(CONFIG.total)}`;
  document.getElementById("soldText").textContent = soldLine;

  ["buyTop","buyHero","buyBottom","formBtn"].forEach(id => setHref(id, CONFIG.googleFormUrl));

  // update visible form link text if present
  const linkTextEl = document.getElementById('formLinkText');
  if (linkTextEl) linkTextEl.textContent = CONFIG.googleFormUrl;

  // populate instagram link (if present)
  if (CONFIG.instagram_link) setHref('instagramLink', CONFIG.instagram_link);
  const igText = document.getElementById('instagramText');
  if (igText && CONFIG.instagram_link) igText.textContent = (new URL(CONFIG.instagram_link).hostname.replace('www.',''));

  // populate topbar video chip if video URL present
  if (CONFIG.videoUrl) setHref('videoChip', CONFIG.videoUrl);

  const vf = document.getElementById("videoFrame");
  const vl = document.getElementById("videoLink");

  if (CONFIG.videoUrl && CONFIG.videoUrl.trim().length > 0){
    vl.setAttribute("href", CONFIG.videoUrl);
    vl.onclick = null;
    vl.textContent = "Abrir vídeo";
    vf.onclick = () => window.open(CONFIG.videoUrl, "_blank", "noopener");
    vf.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") window.open(CONFIG.videoUrl, "_blank", "noopener"); };
  } else {
    vl.textContent = "Assistir vídeo";
    vf.onclick = null;
    vf.onkeydown = null;
  }
}

function smoothScrollTo(el){
  const y = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function setupLearnMore(){
  const btn = document.getElementById("learnMoreBtn");
  const target = document.getElementById("learnMore");
  btn.addEventListener("click", () => smoothScrollTo(target));
}

function setupAccordions(){
  const buttons = Array.from(document.querySelectorAll(".acc-btn"));
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      buttons.forEach(b => {
        b.setAttribute("aria-expanded", "false");
        b.classList.remove("expanded");
      });
      if (!expanded){
        btn.setAttribute("aria-expanded", "true");
        btn.classList.add("expanded");
      }
    });
  });
}

applyConfig();
setupLearnMore();
setupAccordions();


// Fetch configuration from a published Google Sheets (CSV, key,value per line)
async function fetchConfigFromSheet(){
  const url = SHEET_CSV_URL;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    console.info('[config] fetch status', res.status, res.statusText);
    if (!res.ok) throw new Error('Failed to fetch sheet');
    const text = await res.text();
    console.debug('[config] csv preview:', text.slice(0, 1000));
    const lines = text.trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    // Expect header like: key,value
    const pairs = lines.slice(1).map(line => {
      // find first separator (comma or tab)
      let idxComma = line.indexOf(',');
      let idxTab = line.indexOf('\t');
      let idx = -1;
      if (idxComma === -1 && idxTab === -1) idx = -1;
      else if (idxComma === -1) idx = idxTab;
      else if (idxTab === -1) idx = idxComma;
      else idx = Math.min(idxComma, idxTab);

      if (idx === -1) {
        // try splitting by whitespace as fallback
        const parts = line.split(/\s+/);
        if (parts.length >= 2) return [parts[0].trim(), parts.slice(1).join(' ').trim()];
        return null;
      }
      const k = line.slice(0, idx).trim();
      let v = line.slice(idx + 1).trim();
      // remove surrounding quotes if present
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      return [k, v];
    }).filter(Boolean);

    const obj = Object.fromEntries(pairs);

    // Map sheet keys to CONFIG (handle simple conversions)
    if (obj.googleFormUrl) CONFIG.googleFormUrl = obj.googleFormUrl;
    if (obj.instagram_link) CONFIG.instagram_link = obj.instagram_link;
    if (obj.raffle_price){
      const n = Number(obj.raffle_price);
      CONFIG.price = Number.isFinite(n) ? `R$ ${n.toFixed(2).replace('.', ',')}` : obj.raffle_price;
    }
    if (obj.raffle_sold) {
      const n = Number(obj.raffle_sold);
      CONFIG.sold = Number.isFinite(n) ? n : CONFIG.sold;
    }
    if (obj.raffle_total) {
      const n = Number(obj.raffle_total);
      CONFIG.total = Number.isFinite(n) ? n : CONFIG.total;
    }
    if (obj.daysLeftText){
      // if numeric, turn into "X dias restantes"
      const n = Number(obj.daysLeftText);
      CONFIG.daysLeftText = Number.isFinite(n) ? `${n} dias restantes` : obj.daysLeftText;
    }
    if (obj.videoUrl) CONFIG.videoUrl = obj.videoUrl;

    // Re-apply to the UI
    applyConfig();
    // wire project video links (if present)
    if (obj.graaf_link) setHref('graafVideo', obj.graaf_link);
    if (obj.manus_link) setHref('manusVideo', obj.manus_link);
    if (obj.eletroway_link) setHref('eletrowayVideo', obj.eletroway_link);
  } catch (e){
    // fail silently but log for debugging
    console.warn('Could not load sheet config', e);
  }
}

// Provided spreadsheet id (public CSV). Update if you publish a different sheet.
fetchConfigFromSheet('https://docs.google.com/spreadsheets/d/e/2PACX-1vRkpLBKox1C-njZozGy5TMamCZCiqWZeqeSUtEQzjx3l4ebTrrgZyJ-KtHnojay4TOQGQhWsfiyHiN6/pub?gid=0&single=true&output=csv');


const LOGO1 = document.querySelectorAll("img.logo")[0];
const LOGO2 = document.querySelectorAll("img.logo")[1];

const LOGO1_B64 = `iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAB2sW3kAAAgAElEQVR4nO3deXxU9f3/8deZ2Z2d2x0L2wqLqK...`;
const LOGO2_B64 = `iVBORw0KGgoAAAANSUhEUgAAAoAAAAKACAYAAAB...`;

if (LOGO1 && LOGO1_B64 && LOGO1_B64.indexOf("...") === -1) LOGO1.src = "data:image/png;base64," + LOGO1_B64;
if (LOGO2 && LOGO2_B64 && LOGO2_B64.indexOf("...") === -1) LOGO2.src = "data:image/png;base64," + LOGO2_B64;
