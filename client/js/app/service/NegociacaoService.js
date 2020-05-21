class NegociacaoService {

    obterNegociacoesSemanaAtual() {
        return new Promise((resolve, reject) => {
            let http = new XMLHttpRequest();
            http.open("GET", "negociacoes/semana");
            http.onreadystatechange = () => {
                
                if(http.readyState != 4) 
                    return;
                
                if(http.status != 200)
                    reject("Não foi possível importar as Negociações dessa semana");
    
                resolve(JSON.parse(http.responseText).map(e => 
                    new Negociacao(new Date(e.data), e.quantidade, e.valor)
                ));
            };
            http.send();
        });
    }

    obterNegociacoesSemanaPassada() {
        return new Promise((resolve, reject) =>{
            let http = new XMLHttpRequest();
            http.open("GET", "negociacoes/anterior");
            http.onreadystatechange = () => {
                
                if(http.readyState != 4) 
                    return;
                
                if(http.status != 200)
                    reject("Não foi possível importar as Negociações da semana passada");
    
                resolve(JSON.parse(http.responseText).map(e => 
                    new Negociacao(new Date(e.data), e.quantidade, e.valor)
                ));
            };
            http.send();
        });
    }

    obterNegociacoesSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            let http = new XMLHttpRequest();
            http.open("GET", "negociacoes/retrasada");
            http.onreadystatechange = () => {
                
                if(http.readyState != 4) 
                    return;
                
                if(http.status != 200)
                    reject("Não foi possível importar as Negociações da semana retrasada");
    
                resolve(JSON.parse(http.responseText).map(e => 
                    new Negociacao(new Date(e.data), e.quantidade, e.valor)
                ));
            };
            http.send();
        });
    }
}