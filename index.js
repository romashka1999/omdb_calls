class Omdb {

    constructor(apiKey) {
        this.baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&&`;
        this.allBoxOffice = 0;
        this.cnt = 0;
    }

    getMovieById(id) {
        const url = this.baseUrl + `i=${id}`;
    }

    getInt(str) {
        let ans ='';
        for(let i of str) {
            if(i.charCodeAt()>=48 && i.charCodeAt()<=57){
                ans +=i;
            }
        }
        ans = parseInt(ans);
        return ans;
    }
    getMiddle() {
        const allBoxOffice = this.allBoxOffice;
        const cnt = this.cnt;
        this.allBoxOffice = 0;
        this.cnt = 0;
        return allBoxOffice/cnt
    }

    getMovieByTitle(title) {
        const url = this.baseUrl + `t=${title}`;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if( json.BoxOffice && json.BoxOffice !== 'N/A') {
                    console.log(json.BoxOffice);
                    let money = this.getInt(json.BoxOffice);   
                    console.log(money);
                    this.allBoxOffice += money;
                    this.cnt += 1;
                } 
            })
    }

    getMovieBySearch(item) {
        const url = this.baseUrl + `s=${item}`;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                for(let movie of json.Search) {
                    this.getMovieByTitle(movie.Title);
                }
            })
    }
}


/*********************************driver code /*********************************************/ 
const apiKey = '985c1901';
let db = new Omdb(apiKey);
db.getMovieBySearch('Avengers');



