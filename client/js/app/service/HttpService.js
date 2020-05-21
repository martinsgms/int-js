class HttpService {

    get(url) {
        return new Promise((resolve, reject) => {
            let http = new XMLHttpRequest();
            http.open("GET", url);
            http.onreadystatechange = () => {
                if(http.readyState != 4) 
                    return;
                
                if(http.status != 200)
                    reject(http.responseText);

                resolve(JSON.parse(http.responseText));
            };
            http.send();
        });
    }
}