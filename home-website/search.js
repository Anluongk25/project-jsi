//SEARCH MOVIES
// Function to remove diacritics from Vietnamese text
function removeDiacritics(str) {
    const from = "ÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ";
    const to = "AAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOUUUUUUUUUUUYYYYYDaaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiioooooooooooooouuuuuuuuuuuyyyyyd";
    for (let i = 0; i < from.length; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    return str;
  }
  
  // Function to handle search
  function handleSearch(event) {
    if (event.key === 'Enter' || event.type === 'click') {
      const query = document.getElementById('search-bar').value.trim();
      if (query) {
        const keyword = removeDiacritics(query).replace(/\s+/g, '+');
        fetchSearchResults(keyword);
      }
    }
  }
  
  // Function to fetch search results
  function fetchSearchResults(keyword) {
    fetch(`https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=10`)
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
            fetchMovieDetails(movie.slug);
          });
  
          movieList.appendChild(movieCard);
        });
      })
      .catch(error => console.error('Error fetching search results:', error));
  }
  
  // Add event listeners for search
  document.getElementById('button1').addEventListener('click', handleSearch);
  document.getElementById('search-bar').addEventListener('keydown', handleSearch);


    