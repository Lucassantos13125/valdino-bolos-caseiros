fetch("https://script.google.com/macros/s/AKfycbwZsYYhE2OFDYMjkTrrmRPo0iT6iPEkYj60P_VhEzWyMv55rujTGn0IxHFpuqbx5D1R/exec")

.then(response => response.json())

.then(produtos => {

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

    const nome = card.querySelector("h3").innerText.trim();

    const produtoAPI = produtos.find(p => p.produto.trim() === nome);

    if(produtoAPI){

      const preco = card.querySelector(".card-meta");

      preco.innerText = "R$ " + Number(produtoAPI.preco).toFixed(2).replace(".", ",");

      const botao = card.querySelector(".btn-add");

      if(botao){
        botao.dataset.preco = produtoAPI.preco;
      }

    }

  });

});