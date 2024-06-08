const modal = document.getElementById("myModal");
const closeButton = document.getElementsByClassName("close")[0];

closeButton.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Global variable to keep track of the current page
let currentPage = 1;

// Function to fetch data based on the page number
function fetchData(page) {
fetch(`https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`)
.then(response => response.json())
.then(data => {
  const movies = data.items;
  const movieList = document.getElementById('movie-list');
  movieList.innerHTML = ''; // Clear previous movies
  
  // Loop through movies and create HTML elements
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const image = document.createElement('img');
    image.src = movie.poster_url;
    image.alt = movie.name;

    const title = document.createElement('h2');
    title.textContent = movie.name;

    const year = document.createElement('p');
    year.textContent = 'Year: ' + movie.year;

    movieCard.appendChild(image);
    movieCard.appendChild(title);
    movieCard.appendChild(year);

    movieCard.addEventListener('click', () => {
      console.log(`Fetching details for movie: ${movie.slug}`);
      fetchMovieDetails(movie.slug);
    });

    movieList.appendChild(movieCard);
  });
})
.catch(error => console.error('Error fetching data:', error));
}
fetchData(currentPage);
function updatePageNumber() {
fetchData(currentPage);


console.log("Current Page:", currentPage);
}


document.getElementById("prevPage").addEventListener("click", function(event) {
event.preventDefault(); // Prevent the default behavior of the anchor tag
if (currentPage > 1) {
  currentPage--;
  updatePageNumber();
}
});

document.getElementById("nextPage").addEventListener("click", function(event) {
event.preventDefault(); // Prevent the default behavior of the anchor tag

currentPage++;
updatePageNumber();
});

function fetchMovieDetails(slug) {
fetch(`https://phimapi.com/phim/${slug}`)
  .then(response => response.json())
  .then(data => {
    const movie = data.movie;
    const episodes = data.episodes;

    const movieDetails = document.getElementById('movie-details');
    movieDetails.innerHTML = '';

    const leftColumn = document.createElement('div');
    leftColumn.classList.add('left-column');

    const rightColumn = document.createElement('div');
    rightColumn.classList.add('right-column');

    const title = document.createElement('h2');
    title.textContent = movie.name;

    const poster = document.createElement('img');
    poster.src = movie.poster_url;
    poster.alt = movie.name;

    const description = document.createElement('p');
    description.textContent = movie.content;

    // Extract video ID from the YouTube URL
    const videoId = extractYouTubeVideoId(movie.trailer_url);
    const trailerSrc = `https://www.youtube.com/embed/${videoId}`;
    
    const trailer = document.createElement('iframe');
    trailer.src = trailerSrc;
    trailer.width = "560";
  trailer.height = "315";
    trailer.allowFullscreen = true;

    const episodeContainer = document.createElement('div');
    episodeContainer.classList.add('episode-container');

    episodes.forEach(episode => {
      episode.server_data.forEach(data => {
        const episodeButton = document.createElement('a');
        episodeButton.href = data.link_embed;
        episodeButton.textContent = data.name;
        episodeButton.classList.add('episode-button');
        episodeContainer.appendChild(episodeButton);
      });
    });

    leftColumn.appendChild(poster);
    rightColumn.appendChild(title);
    rightColumn.appendChild(description);
    rightColumn.appendChild(trailer);
    rightColumn.appendChild(episodeContainer);

    movieDetails.appendChild(leftColumn);
    movieDetails.appendChild(rightColumn);

    modal.style.display = "block";
  })
  .catch(error => console.error('Error fetching movie details:', error));
}


// Function to extract video ID from YouTube URL
function extractYouTubeVideoId(url) {
const match = url.match(/[?&]v=([^?&]+)/);
return match && match[1] ? match[1] : '';
}

//Scroll button
// Lấy phần tử nút
var mybutton = document.getElementById("scrollTopBtn");

// Khi người dùng lăn màn hình xuống 100px từ đầu trang, hiển thị nút
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// Khi người dùng nhấp vào nút, cuộn lên đầu trang
function topFunction() {
    document.body.scrollTop = 0; // Cho Safari
    document.documentElement.scrollTop = 0; // Cho Chrome, Firefox, IE và Opera
}
function removeDiacritics(str) {
  const from = "ÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ";
  const to = "AAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOUUUUUUUUUUUYYYYYDaaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiioooooooooooooouuuuuuuuuuuyyyyyd";
  for (let i = 0; i < from.length; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }
  return str;
}

function handleSearch(event) {
  if (event.key === 'Enter' || event.type === 'click') {
      const query = document.getElementById('search-bar').value.trim();
      if (query) {
          const keyword = removeDiacritics(query).replace(/\s+/g, '+');
          fetchSearchResults(keyword);
      }
  }
}

function fetchSearchResults(keyword) {
  fetch(`https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=10`)
      .then(response => response.json())
      .then(data => {
          const movies = data.data.items;
          const movieList = document.getElementById('movie-list1');
          movieList.innerHTML = ''; // Clear previous movies

          // Loop through movies and create HTML elements
          movies.forEach(movie => {
              const movieCard = document.createElement('div');
              movieCard.classList.add('movie-card');

              const image = document.createElement('img');
              image.src = `https://img.phimapi.com/${movie.poster_url}`;
              image.alt = movie.name;

              const title = document.createElement('h2');
              title.textContent = movie.name;

              const year = document.createElement('p');
              year.textContent = 'Year: ' + movie.year;

              movieCard.appendChild(image);
              movieCard.appendChild(title);
              movieCard.appendChild(year);

              movieCard.addEventListener('click', () => {
                  fetchMovieDetails(movie.slug);
              });

              movieList.appendChild(movieCard);
          });

          // Show the movie list
          movieList.style.display = '';
      })
      .catch(error => console.error('Error fetching search results:', error));
}



// Add event listeners for search
document.getElementById('button1').addEventListener('click', handleSearch);
document.getElementById('search-bar').addEventListener('keydown', handleSearch);
// với các thể loại phim
function fetchCategory(category) {
  fetch(`https://phimapi.com/danh-sach/${category}`)
    .then(response => response.json())
    .then(data => {
      const movies = data.items;
      const movieList = document.getElementById('movie-list');
      movieList.innerHTML = ''; // Clear previous movies

      // Loop through movies and create HTML elements
      movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const image = document.createElement('img');
        image.src = movie.poster_url;
        image.alt = movie.name;

        const title = document.createElement('h2');
        title.textContent = movie.name;

        const year = document.createElement('p');
        year.textContent = 'Year: ' + movie.year;

        movieCard.appendChild(image);
        movieCard.appendChild(title);
        movieCard.appendChild(year);

        movieCard.addEventListener('click', () => {
          console.log(`Fetching details for movie: ${movie.slug}`);
          fetchMovieDetails(movie.slug);
        });

        movieList.appendChild(movieCard);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}
