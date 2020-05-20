class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacaoView = new NegociacaoView($('#negociacaoView'));

        let self = this;
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {
                if(["add", "truncate"].includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    return function() {
                        console.log(`[SET] prop ${prop} interceptado pelo proxy`);
                        
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacaoView.update(target);
                    }
                }
                
                console.log(`[GET] prop ${prop} interceptado pelo proxy`);
                return Reflect.get(target, prop, receiver);
            }
        })

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));

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
        this._negociacaoView.update(this._listaNegociacoes);

        this._mensagem.texto = "Negociação adicionada com sucesso!";
        this._mensagemView.update(this._mensagem); 

        this._clearForm();

        // console.log(DateHelper.dateToText(negociacao.data)); 
        // console.log(this._listaNegociacoes);
    }

    apaga() {
        this._listaNegociacoes.truncate();
        this._negociacaoView.update(this._listaNegociacoes);

        this._mensagem.texto = "Negociações apagadas com sucesso";
        this._mensagemView.update(this._mensagem);
    }

    _clearForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}