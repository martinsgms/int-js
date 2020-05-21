class NegociacaoService {

    constructor() {
        this._service = new HttpService();
    }

    obterNegociacoesSemanaAtual() {
        return this._service.get("negociacoes/semana")
            .then(negociacoes => 
                negociacoes.map(e => new Negociacao(new Date(e.data), e.quantidade, e.valor))
            )
            .catch(error => {throw new Error("Não foi possível buscar as negociações dessa semana")});
    }

    obterNegociacoesSemanaPassada() {
        return this._service.get("negociacoes/anterior")
            .then(negociacoes =>
                negociacoes.map(e => new Negociacao(new Date(e.data), e.quantidade, e.valor))
            )
            .catch(error => {throw new Error("Não foi possível buscar as negociações da semana passada")});
    }

    obterNegociacoesSemanaRetrasada() {
        return this._service.get("negociacoes/retrasada")
            .then(negociacoes =>
                negociacoes.map(e => new Negociacao(new Date(e.data), e.quantidade, e.valor))
            )
            .catch(error => {throw new Error("Não foi possível buscar as negociações da semana retrasada")});
    }
}