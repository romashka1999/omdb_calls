
class PriorityQueue {
    constructor() {
        this.container = [];
    }

    push(element) {
        if( typeof element != 'object') {
            return 'container is only for objects';
        } else {
            this.container.push(element);
            this.container.sort(function(a, b){return a.imdbRating - b.imdbRating});
        }
    }

    display() {
        return this.container;
    }

    top() {
        if( !this.contaner  ) {
            return this.container[this.container.length -1];
        } else {
            return 'container is empty';
        }
    }

    pop() {
        this.container.pop();
    }

    clear() {
        this.container = [];
    }
}

/******************************************** O M D B  *********************************************/
class Omdb {

    constructor(apiKey) {
        this.baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&&`;
        this.allBoxOffice = 0;
        this.cnt = 0;
        this.pr = new PriorityQueue();
        this.promisesArr = [];
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

    prioriyQueuePush(movie) {
        this.pr.push(movie);
    }

    getAvarage() {
        const allBoxOffice = this.allBoxOffice;
        const cnt = this.cnt;
        this.allBoxOffice = 0;
        this.cnt = 0;
        return allBoxOffice/cnt
    }

    getTopNImdbRatingMovies(n) {
        let arr = this.pr.display();
        let topN = [];
        let i=arr.length-1;
        while(n>0) {
            topN.push(arr[i]);
            i -=1;
            n -=1;
        }
        return topN;
    }

    getMovieByTitle(title) {
        const url = this.baseUrl + `t=${title}`;
        let pr = fetch(url)
            .then(response => response.json())
            .then(json => {
                this.check +=1;
                this.prioriyQueuePush(json);
                console.log(`movie by title ${title}: `,json);
                if( json.BoxOffice && json.BoxOffice !== 'N/A') {
                    let money = this.getInt(json.BoxOffice);   
                    console.log('boxOffice: ',money);
                    this.allBoxOffice += money;
                    this.cnt += 1;
                } else {
                    console.log('boxOffice does  not exist');
                }
            })
        return pr;
    }

    getMovieBySearch(item) {
        const url = this.baseUrl + `s=${item}`;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log(`all movies which has ${item} title: `, json.Search);
                for(let movie of json.Search) {
                    let pr = this.getMovieByTitle(movie.Title);
                    this.promisesArr.push(pr);
                }
            })
            .finally( async ()=> {
                await Promise.all(this.promisesArr)
                    const n = 5;
                    console.log(`movies which are title ${item} avarage boxoffice is: `,this.getAvarage());
                    console.log(`top ${n} movies with imdbRating , which is with title ${item}: `,this.getTopNImdbRatingMovies(n));
                    
            })
    }
}

/*********************************driver code /*********************************************/ 
const apiKey = '985c1901';
let db = new Omdb(apiKey);
db.getMovieBySearch('Avengers');


