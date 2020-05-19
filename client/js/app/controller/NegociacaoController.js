class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this.negociacaoView = new NegociacaoView($('#negociacaoView'));
        this._listaNegociacoes = new ListaNegociacoes();

        this.negociacaoView.update(this._listaNegociacoes);
    }

    adiciona(event) {
        event.preventDefault();
        
        let negociacao = new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
            );
            
        this._listaNegociacoes.add(negociacao);
        this.negociacaoView.update(this._listaNegociacoes);

        this._clearForm();

        // console.log(DateHelper.dateToText(negociacao.data));
        // console.log(this._listaNegociacoes);
    }

    _clearForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}