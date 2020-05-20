class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacaoView = new NegociacaoView($('#negociacaoView'));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
            this._negociacaoView,
            ["add", "truncate"]);
        
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(new Mensagem(),
            this._mensagemView,
            ["texto"]);

        this._mensagemView.update(this._mensagem); 
        this._negociacaoView.update(this._listaNegociacoes);
    }

    adiciona(event) {
        event.preventDefault();
        
        let negociacao = new Negociacao(
            DateHelper.textToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
            
        this._listaNegociacoes.add(negociacao);
        this._mensagem.texto = "Negociação adicionada com sucesso!";

        this._clearForm();
    }

    apaga() {
        this._listaNegociacoes.truncate();
        this._mensagem.texto = "Negociações apagadas com sucesso";
    }

    _clearForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}