//MOVIE SLIDER
const menuBtn = document.querySelector(".menu");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");
});

const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const contents = document.querySelectorAll(".content");

var sliderNav = function(manual){
    btns.forEach((btn) => {
        btn.classList.remove("active");
    
});

slides.forEach((slide) => {
    slide.classList.remove("active");
});

contents.forEach((content) => {
    content.classList.remove("active");
});

btns[manual].classList.add("active");
slides[manual].classList.add("active");
contents[manual].classList.add("active");
}
btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        sliderNav(i);
    });
});
$(document).ready(function() {
    $('#autoWidth,#autoWidth2').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $('#autoWidth,#autoWidth2').removeClass('cS-hidden');
        } 
    });  
  });
  //SEARCH FUNCTION
  document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById("search-bar");
    const suggestions = document.getElementById("suggestions");
  
    searchBar.addEventListener("input", function() {
      const query = searchBar.value.trim();
      if (query.length > 0) {
        fetchSuggestions(query);
      } else {
        suggestions.innerHTML = '';
        suggestions.style.display = 'none';
      }
    });
  
    function fetchSuggestions(query) {
      fetch(`https://phimapi.com/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
          displaySuggestions(data.items.slice(0, 5));
        })
        .catch(error => console.error('Error fetching suggestions:', error));
    }
  
    function displaySuggestions(movies) {
      suggestions.innerHTML = '';
      movies.forEach(movie => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = movie.name;
        suggestionItem.addEventListener('click', () => {
          fetchMovieDetails(movie.slug);
          searchBar.value = '';
          suggestions.innerHTML = '';
          suggestions.style.display = 'none';
        });
        suggestions.appendChild(suggestionItem);
      });
      suggestions.style.display = 'block';
    }
  })  
  
  
  
    

 