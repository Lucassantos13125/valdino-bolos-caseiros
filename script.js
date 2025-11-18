// Número do WhatsApp (formato wa.me): 55  DDI  DDD  número (sem espaços)
const WA_NUMBER = "5511961561266";
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
    btn.addEventListener("click", ()=>{
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

  // anos no footer
  const yearEls = [document.getElementById("year"), document.getElementById("year2"), document.getElementById("year3")];
  yearEls.forEach(el => { if(el) el.textContent = new Date().getFullYear(); });

  // ================================
  // 🛒 SISTEMA DO CARRINHO (REVISADO)
  // ================================

  let cart = JSON.parse(localStorage.getItem("carrinho")) || [];

  function saveCart() {
    localStorage.setItem("carrinho", JSON.stringify(cart));
  }

  const listaCarrinho = document.getElementById("lista-carrinho");
  const btnFinalizar = document.getElementById("finalizar");
  const btnLimparCarrinho = document.getElementById("limpar-carrinho");

  // Adicionar produto (soma quantidade)
  function addProductToCart(produto, precoUnit) {
    const item = cart.find(p => p.produto === produto);

    if (item) {
      item.quantity++;
      item.total = item.quantity * item.precoUnit;
    } else {
      cart.push({
        produto,
        precoUnit: +precoUnit,
        quantity: 1,
        total: +precoUnit
      });
    }

    saveCart();
    atualizarCarrinho();
  }

  // Botões adicionar
  document.querySelectorAll(".btn-add").forEach(btn => {
    btn.addEventListener("click", () => {
      const produto = btn.getAttribute("data-produto");
      const preco = parseFloat(btn.getAttribute("data-preco"));
      if (!produto || isNaN(preco)) return;
      addProductToCart(produto, preco);
    });
  });

  // REMOVER ITEM
  function removeItem(index) {
    if (!cart[index]) return;
    cart.splice(index, 1);
    saveCart();
    atualizarCarrinho();
  }

  // Atualizar carrinho na tela
  function atualizarCarrinho() {
    if (!listaCarrinho) return;

    listaCarrinho.innerHTML = "";
    let totalGeral = 0;

    cart.forEach((item, i) => {
      const li = document.createElement("li");
      li.className = "carrinho-item";

      li.innerHTML = `
        <span class="item-index">${i + 1}.</span>
        <span class="item-nome">${item.produto}</span>
        <span class="item-total"> - R$ ${item.total.toFixed(2)}</span>
        <span class="item-qty"> (Qtd: ${item.quantity})</span>

        <button class="btn remover-item" data-index="${i}">
            Remover
        </button>
      `;

      listaCarrinho.appendChild(li);
      totalGeral += item.total;
    });

    const totalEl = document.getElementById("total-carrinho");
    if (totalEl) totalEl.innerHTML = `<strong>Total: R$ ${totalGeral.toFixed(2)}</strong>`;
  }

  // Delegação: capturar clique no botão remover
  if (listaCarrinho) {
    listaCarrinho.addEventListener("click", (e) => {
      const btn = e.target.closest(".remover-item");
      if (!btn) return;

      const idx = parseInt(btn.dataset.index);
      if (!isNaN(idx)) removeItem(idx);
    });
  }

  // Limpar carrinho
  if (btnLimparCarrinho) {
    btnLimparCarrinho.addEventListener("click", () => {
      if (cart.length === 0) return alert("O carrinho já está vazio!");

      if (confirm("Tem certeza que deseja limpar o carrinho?")) {
        cart = [];
        saveCart();
        atualizarCarrinho();
      }
    });
  }

  // Finalizar pedido
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      if (cart.length === 0) return alert("O carrinho está vazio!");

      let totalGeral = 0;
      let msg = "Olá! Gostaria de fazer um pedido:\n\n";

      cart.forEach((item, i) => {
        msg += `${i + 1}. ${item.produto} - Qtd: ${item.quantity} - R$ ${item.total.toFixed(2)}\n`;
        totalGeral += item.total;
      });

      msg += `\nTotal: R$ ${totalGeral.toFixed(2)}\n\nObrigado!`;

      openWhatsApp(encodeURIComponent(msg));

      cart = [];
      saveCart();
      atualizarCarrinho();
    });
  }

  // iniciar carrinho ao carregar
  atualizarCarrinho();
});
