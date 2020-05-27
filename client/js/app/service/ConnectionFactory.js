var dbName = "aluraframe";
var version = 3;
var objectStores = ["Negociacoes"];

class ConnectionFactory {

    constructor() { throw new Error("Classe não instanciável") }

    static getConnection() {
        return new Promise((resolve, reject) => {
            let openConnection = window.indexedDB.open(dbName, version);

            openConnection.onupgradeneeded = e => {
                ConnectionFactory._createObjectStores(e.target.result);
            };
    
            openConnection.onsuccess = e => {
                resolve(e.target.result);
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

}