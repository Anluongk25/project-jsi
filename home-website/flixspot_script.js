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
  //AVATAR FUNCTION
  function createUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const avatarUrl = "default-avatar-url"; // Hoặc lấy URL từ một input khác nếu người dùng có thể tải lên avatar
  
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert("Tài khoản đã tạo thành công!");
        
        // Lưu thông tin tài khoản vào Realtime Database
        database.ref('users/' + user.uid).set({
          email: email,
          avatar: avatarUrl
          // Thêm bất kỳ thông tin khác bạn muốn lưu
        }).then(() => {
          console.log('Thông tin tài khoản đã được lưu vào database.');
        }).catch((error) => {
          console.error('Lỗi khi lưu thông tin tài khoản vào database:', error);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("status code:"+ errorCode+ "status message:"+ errorMessage);
      });
  }
  function userLogin() {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
        // Lấy thông tin avatar từ database
        database.ref('users/' + user.uid).once('value').then((snapshot) => {
          const userData = snapshot.val();
          if (userData && userData.avatar) {
            // Hiển thị avatar trên giao diện người dùng
            document.getElementById("user-avatar").src = userData.avatar;
            document.getElementById("user-avatar").style.display = "block";
          }
        });
  
        alert("Đăng nhập thành công! Chào mừng bạn quay trở lại!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("status code:"+ errorCode+ "status message:"+ errorMessage);
      });
  }
    
  
  
    

 