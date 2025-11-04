// Número do WhatsApp (formato wa.me): 55  DDI  DDD  número (sem espaços)
const WA_NUMBER = "5511961561266"; // já convertido pro formato internacional
const defaultMsg = encodeURIComponent("Olá! Gostaria de fazer um pedido.");

function openWhatsApp(msg){
  const url = `https://wa.me/${WA_NUMBER}?text=${msg || defaultMsg}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  // CTAs principais
  const heroBtn = document.getElementById("hero-whats");
  const cta = document.getElementById("cta-whats");
  const contactBtn = document.getElementById("contact-whats");
  const cta2 = document.getElementById("cta-whats-2");
  const cta3 = document.getElementById("cta-whats-3");

  [heroBtn, cta, contactBtn, cta2, cta3].forEach(btn=>{
    if(btn) btn.addEventListener("click", ()=> openWhatsApp());
  });

  // botões "Pedir" com mensagem específica
  document.querySelectorAll(".btn-whatsapp").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      const m = btn.getAttribute("data-msg") || defaultMsg;
      openWhatsApp(m);
    });
  });

  // hamburger menu mobile
  document.querySelectorAll(".hamburger").forEach(h => {
    h.addEventListener("click", ()=>{
      const nav = h.closest(".header-inner").querySelector(".nav");
      if(nav) nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    });
  });

  // atualiza anos no footer
  const yearEls = [document.getElementById("year"), document.getElementById("year2"), document.getElementById("year3")];
  yearEls.forEach(el => { if(el) el.textContent = new Date().getFullYear(); });
});
