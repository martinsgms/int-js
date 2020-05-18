form = document.querySelector(".form");
btnIncluir = document.querySelector("#incluir");

btnIncluir.addEventListener("click", function(event) {
    event.preventDefault();

    negociacao = getNegociacao(form);

    console.log(negociacao);

    appendTable(newRow(negociacao));

    form.reset();
});

function getNegociacao(form) {
    negociacao = {
        data: form.data.value,
        quantidade: form.quantidade.value,
        valor: form.valor.value,
        volume: form.valor.value * form.quantidade.value
    }

    return negociacao;
}

function appendTable(tr) {
    tbody = document.querySelector("tbody");
    tbody.appendChild(tr);
}

function newRow(negociacao) {
    
    td = [
        tdData = newTd(negociacao.data),
        tdQuantidade = newTd(negociacao.quantidade),
        tdValor = newTd(negociacao.valor),
        tdVolume = newTd(negociacao.volume)
    ]
    
    tr = document.createElement("tr");
    td.forEach(element => {
        tr.appendChild(element);
    });

    return tr;
}

function newTd(data) {
    td = document.createElement("td");
    td.innerText = data;
    return td;
}