const CONFIG = {
  googleFormUrl: "https://forms.gle/SEU_LINK_AQUI",
  price: "R$ 10,00",
  sold: 320,
  total: 1000,
  daysLeftText: "20 dias restantes",
  videoUrl: ""
};

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

  const vf = document.getElementById("videoFrame");
  const vl = document.getElementById("videoLink");

  if (CONFIG.videoUrl && CONFIG.videoUrl.trim().length > 0){
    vl.setAttribute("href", CONFIG.videoUrl);
    vl.onclick = null;
    vl.textContent = "Abrir vídeo";
    vf.onclick = () => window.open(CONFIG.videoUrl, "_blank", "noopener");
    vf.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") window.open(CONFIG.videoUrl, "_blank", "noopener"); };
  } else {
    vl.textContent = "Adicionar link";
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


const LOGO1 = document.querySelectorAll("img.logo")[0];
const LOGO2 = document.querySelectorAll("img.logo")[1];

const LOGO1_B64 = `iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAB2sW3kAAAgAElEQVR4nO3deXxU9f3/8deZ2Z2d2x0L2wqLqK...`;
const LOGO2_B64 = `iVBORw0KGgoAAAANSUhEUgAAAoAAAAKACAYAAAB...`;

if (LOGO1 && LOGO1_B64 && LOGO1_B64.indexOf("...") === -1) LOGO1.src = "data:image/png;base64," + LOGO1_B64;
if (LOGO2 && LOGO2_B64 && LOGO2_B64.indexOf("...") === -1) LOGO2.src = "data:image/png;base64," + LOGO2_B64;
