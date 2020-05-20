class NegociacaoService {

    obterNegociacoesSemana(callback) {
        let http = new XMLHttpRequest();

        http.open("GET", "negociacoes/semana");
        http.onreadystatechange = () => {
            
            if(http.readyState != 4) 
                return;
            
            if(http.status != 200)
                callback("Não foi possível importar as Negociações", null);

            callback(null, JSON.parse(http.responseText).map(e => 
                new Negociacao(new Date(e.data), e.quantidade, e.valor)
            ));
        };
        http.send();
    }

}