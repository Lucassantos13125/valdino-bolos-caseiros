fetch("https://script.google.com/macros/s/AKfycbwZsYYhE2OFDYMjkTrrmRPo0iT6iPEkYj60P_VhEzWyMv55rujTGn0IxHFpuqbx5D1R/exec")

.then(response => response.json())

.then(data => {

  let container = document.getElementById("produtos");

  data.forEach(produto => {

    container.innerHTML += `
    
    <div class="produto">

      <h3>${produto.produto}</h3>

      <p>${produto.descricao}</p>

      <p class="preco">R$ ${produto.preco}</p>

      <a class="botao"
      href="https://wa.me/5511996655448?text=Olá gostaria de pedir ${produto.produto}">
      Pedir no WhatsApp
      </a>

    </div>

    `;

  });

});