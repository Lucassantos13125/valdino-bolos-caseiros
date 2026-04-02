// ================================
// 📦 BUSCAR PRODUTOS (GOOGLE SHEETS API)
// ================================

const API_URL = "https://script.google.com/macros/s/AKfycbwZsYYhE2OFDYMjkTrrmRPo0iT6iPEkYj60P_VhEzWyMv55rujTGn0IxHFpuqbx5D1R/exec";

document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos();
});

async function carregarProdutos() {
  try {
    const response = await fetch(API_URL);
    const produtos = await response.json();

    atualizarCards(produtos);

  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}

// ================================
// 🧠 ATUALIZAR CARDS NA TELA
// ================================

function atualizarCards(produtos) {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const nomeEl = card.querySelector("h3");
    const precoEl = card.querySelector(".card-meta");
    const botao = card.querySelector(".btn-add");

    if (!nomeEl || !precoEl) return;

    const nome = nomeEl.innerText.trim();

    const produtoAPI = produtos.find(
      p => p.produto?.trim().toLowerCase() === nome.toLowerCase()
    );

    if (!produtoAPI) return;

    // Atualiza preço na tela
    const precoFormatado = formatarPreco(produtoAPI.preco);
    precoEl.innerText = precoFormatado;

    // Atualiza preço do botão (carrinho)
    if (botao) {
      botao.dataset.preco = produtoAPI.preco;
    }
  });
}

// ================================
// 💰 FORMATAR PREÇO (PADRÃO BR)
// ================================

function formatarPreco(valor) {
  return "R$ " + Number(valor).toFixed(2).replace(".", ",");
}