class NegociacaoDAO {

    constructor(connection) {
        this._connection = connection;
        this._objectStore = "Negociacoes";
    }

    add(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._objectStore], "readwrite")
                .objectStore(this._objectStore)
                .add(negociacao);

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {
                reject("Erro na Transação com o IDB");
                console.log(e.target.error.name);
            };
        });
    }

}