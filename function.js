
const movieDetails = document.querySelector('.movie-details');
const mainContainer = document.querySelector('.main-container');

function style_css(){
    document.querySelector('.centered').style.justifyContent = 'start'
}



document.querySelector('#search-btn').addEventListener
('click', () => {
    const movie_query = document.querySelector('#search-query').value
    const MovieSearch = new MovieFetchData(movie_query);

    MovieSearch.fetch_data();
    style_css();

})


const movie_lists = document.querySelector('.movie-details')
class MovieFetchData{
    constructor(search_query) {
        this.movie_name = search_query
        this.api_key = "0b243a8843cc55c9e1ba6cdeae3cf6fb";
        this.img_url = "https://image.tmdb.org/t/p/w500";

    }
    fetch_data(){
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${this.api_key}&language=en-US&query=${this.movie_name}&include_adult=false`)
            .then (response => response.json())
            .then (data => {
                movie_lists.innerHTML = ''
                data.results.forEach(this.clean_data.bind(this))})
            .catch(console.error)
    }

    async clean_data(datas){
        const movie_data = datas

        if (!movie_data?.overview || !movie_data || movie_data.overview.split(" ").length < 7) return;

        const img_url = movie_data.hasOwnProperty('poster_path') ? this.img_url + movie_data.poster_path : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
        //console.log(movie_data)

        const movie_item = document.createElement('li')
        movie_item.classList.add('top-part')

        movie_item.innerHTML = `<img class="movie-poster" src="${img_url}" />

                      <div class="poster-detail">

                          <h2 class="movie-title">${movie_data.hasOwnProperty('original_title') ? movie_data.original_title : movie_data.name}<span class="movie-rating"><i class="fa-solid fa-star" style="color: #ffcc33;"></i> ${movie_data['vote_average']}</span></h2>
                          <p class="movie-description">${movie_data.overview}</p>
                      </div>

                      <div class="links"><a target="_blank" href="${await this.fetch_youtube(movie_data['id'])}" class="fa-brands fa-youtube"></a></div>`

        movie_lists.appendChild(movie_item)

    }
    async fetch_youtube(movie_id){
        return await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${this.api_key}&language=en-US`)
            .then(response => response.json())
            .then(data => {
                const key_val = data['results'] ? data['results'][0] : null;
                if (key_val) return `https://www.youtube.com/watch?v=${key_val['key']}`;
                else return null;
            })
            .catch(error => {
                console.error(error);
                return null;
            });
    }

}


