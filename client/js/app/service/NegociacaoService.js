class NegociacaoService {

    constructor() {
        this._service = new HttpService();
    }

    obterNegociacoesSemanaAtual() {
        return new Promise((resolve, reject) => {
            this._service.get("negociacoes/semana")
                .then(negociacoes =>
                    resolve(negociacoes.map(e => new Negociacao(new Date(e.data), e.quantidade, e.valor)))
                )
                .catch(error => reject(error));
        });
    }

    obterNegociacoesSemanaPassada() {
        return new Promise((resolve, reject) => {
            this._service.get("negociacoes/anterior")
                .then(negociacoes =>
                    resolve(negociacoes.map(e => new Negociacao(new Date(e.data), e.quantidade, e.valor)))
                )
                .catch(error => reject(error));
        });
    }

    obterNegociacoesSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._service.get("negociacoes/retrasada")
                .then(negociacoes =>
                    resolve(negociacoes.map(e => new Negociacao(new Date(e.data), e.quantidade, e.valor)))
                )
                .catch(error => reject(error));
        });
    }
}