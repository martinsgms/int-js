class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();
        
        let dateHelper = new DateHelper();

        let negociacao = new Negociacao(
            dateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
            );

        console.log(negociacao);
        console.log(dateHelper.dateToText(negociacao.data));
    }

}