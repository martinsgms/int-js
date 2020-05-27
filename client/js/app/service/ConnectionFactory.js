var ConnectionFactory = (function () {
    
    const dbName = "aluraframe";
    const version = 3;
    const objectStores = ["Negociacoes"];
    
    var connection = null;
    var closeCon = null;
    
    return class ConnectionFactory {

        constructor() { throw new Error("Classe não instanciável") }

        static open() {
            return new Promise((resolve, reject) => {
                let openConnection = window.indexedDB.open(dbName, version);

                openConnection.onupgradeneeded = e => {
                    ConnectionFactory._createObjectStores(e.target.result);
                };
        
                openConnection.onsuccess = e => {
                    if(!connection) {
                        connection = e.target.result;
                        closeCon = connection.close.bind(connection);
                        connection.close = () => { throw new Error("Não chame este método diretamente") }
                    }
                    resolve(connection);
                };
        
                openConnection.onerror = e => {
                    reject(e.target.error.name);
                    console.log(e.target.error);
                };
            });
        }

        static _createObjectStores(connection) {
            objectStores.forEach(o => {
                if(connection.objectStoreNames.contains(o))
                    connection.deleteObjectStore(o);

                connection.createObjectStore(o, { autoIncrement: true });
            });
        }

        static close() {
            if(connection) {
                closeCon();
                connection = null;
            }
        }
    }
})();