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

  // ---- LÓGICA DO CARRINHO COM PREÇOS ----
let cart = JSON.parse(localStorage.getItem("carrinho")) || [];

// Função para salvar o carrinho sempre que atualizar
function saveCart() {
  localStorage.setItem("carrinho", JSON.stringify(cart));
}

const listaCarrinho = document.getElementById("lista-carrinho");
const btnFinalizar = document.getElementById("finalizar");

document.querySelectorAll(".btn-add").forEach(btn => {
  btn.addEventListener("click", () => {
    const produto = btn.getAttribute("data-produto");
    const preco = parseFloat(btn.getAttribute("data-preco"));
    cart.push({ produto, preco });
     saveCart(); 
    atualizarCarrinho();
  });
});

function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
  ${i + 1}. ${item.produto} - R$ ${item.preco.toFixed(2)}
  <button class="remover-item" data-index="${i}">Remover</button>
`;
listaCarrinho.appendChild(li);
    total += item.preco;
  });
  document.querySelectorAll(".remover-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1); 
       saveCart(); 
      atualizarCarrinho(); // atualiza o carrinho visualmente
    });
  });

  document.getElementById("total-carrinho").innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;

}
   
    if (cart.length > 0) {
  atualizarCarrinho();
}

btnFinalizar.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Adicione algum produto antes de finalizar o pedido!");
    return;
  }

  let total = 0;
  let msg = "Olá! Gostaria de fazer um pedido:\n\n";

  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.produto} - R$ ${item.preco.toFixed(2)}\n`;
    total += item.preco;
  });

  msg += `\nTotal da compra: R$ ${total.toFixed(2)}\n\nObrigado! 🙌`;

  openWhatsApp(encodeURIComponent(msg));
});

});
