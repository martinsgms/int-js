class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._service = new NegociacaoService();

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacaoView($('#negociacaoView')),
            "add", "truncate");

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')),
            "texto");
    }

    adicionar(event) {
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

    apagar() {
        this._listaNegociacoes.truncate();
        this._mensagem.texto = "Negociações apagadas com sucesso";
    }

    importar() {
        this._service.obterNegociacoesSemanaAtual()
            .then(negociacoes => {
                negociacoes.forEach(n => this._listaNegociacoes.add(n));
                this._mensagem.texto = "Negociações dessa semana importadas com sucesso!";
                console.log("primeira");
                
            })
            .catch(error => this._mensagem.texto = error);
     
        this._service.obterNegociacoesSemanaPassada()
            .then(negociacoes => {
                negociacoes.forEach(n => this._listaNegociacoes.add(n));
                this._mensagem.texto = "Negociações da semana passada importadas com sucesso!";
                console.log("segunda");
            })
            .catch(error => this._mensagem.texto = error);
     
        this._service.obterNegociacoesSemanaRetrasada()
            .then(negociacoes => {
                negociacoes.forEach(n => this._listaNegociacoes.add(n));
                this._mensagem.texto = "Negociações da semana retrasada importadas com sucesso!";
                console.log("terceira");
            })
            .catch(error => this._mensagem.texto = error);
    }

    _clearForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}