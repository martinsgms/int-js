class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

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
        let http = new XMLHttpRequest();

        http.open("GET", "negociacoes/semana");
        http.onreadystatechange = () => {
            
            if(http.readyState != 4) 
                return;
            
            if(http.status != 200)
                this._mensagem.texto = "Não foi possível importar as Negociações";

            JSON.parse(http.responseText).forEach(e => 
                this._listaNegociacoes.add(new Negociacao(new Date(e.data), e.quantidade, e.valor))
            );

            this._mensagem.texto = "Negociações importadas com sucesso!";
        };
        http.send();
    }

    _clearForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}