class ListaNegociacoes {

    constructor(gatilho) {
        this._negociacoes = [];
        this._gatilho = gatilho;
    }

    add(negociacao) {
        this._negociacoes.push(negociacao);
        this._gatilho(this);
    }
    
    truncate() {
        this._negociacoes = [];
        this._gatilho(this);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

}