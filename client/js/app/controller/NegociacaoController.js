class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this.negociacaoView = new NegociacaoView($('#negociacaoView'));
        this._listaNegociacoes = new ListaNegociacoes();

        this.negociacaoView.update();
    }

    adiciona(event) {
        event.preventDefault();
        
        let negociacao = new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
            );
            
        console.log(DateHelper.dateToText(negociacao.data));
        
        this._listaNegociacoes.add(negociacao);
        this._clearForm();
        console.log(this._listaNegociacoes);
    }

    _clearForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}