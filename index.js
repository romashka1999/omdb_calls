class Omdb {

    constructor(apiKey) {
        this.baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&&`
    }

    ajax(url, resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.onload = data => resolve(data);
        xhr.onerror = err => reject(err);
        xhr.send();
    }

    getDataPromise(url) {
        return new Promise( (resolve, reject) => {
            this.ajax(url, resolve, reject);
        });
    }

    getDataWithAjax(url) {
        this.getDataPromise(url)
        .then( (data)=> {
            console.log(data.currentTarget.response);
        })
        .catch( (err)=> {
            console.log(err);
        });
    }

    getDataWithFetch(url) {
        fetch(url)
            .then(response => response.json())
            .then(json => console.log(json))
    }

    getMovieById(id) {
        const url = this.baseUrl + `i=${id}`;
        this.getDataWithAjax(url);
    }

    getMovieByTitle(title) {
        const url = this.baseUrl + `t=${title}`;
        this.getDataWithAjax(url);
    }

    getMovieBySearch(item) {
        const url = this.baseUrl + `s=${item}`;
        this.getDataWithAjax(url);
    }
}


/*********************************driver code /******************************************** */ 
const apiKey = '985c1901';
let db = new Omdb(apiKey);
// db.getMovieBySearch('Avengers');






