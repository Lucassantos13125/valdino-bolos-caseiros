fetch("COLE_AQUI_A_URL_DO_APPS_SCRIPT")

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
href="https://wa.me/5511999999999?text=Olá gostaria de pedir ${produto.produto}">
Pedir no WhatsApp
</a>

</div>
`;

});

});
