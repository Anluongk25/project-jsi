const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const userName = document.getElementById("name");

const signUpButton1 = document.getElementById("sign_up");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
signUpButton1.addEventListener("click", () => {
  var username = userName.value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("Email: ", email);
  console.log("Password: ", password);
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

//FIREBASE
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDN90dPagE7KEf4L2kzN-2RrK-V970e7ks",
    authDomain: "login-b296b.firebaseapp.com",
    projectId: "login-b296b",
    storageBucket: "login-b296b.appspot.com",
    messagingSenderId: "911401287455",
    appId: "1:911401287455:web:7b6511ff8f668837f47a2a",
    measurementId: "G-M99LENEFYX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

function createUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("Tài khoản đã tạo thành công!");

        // Save user info to the database
        database.ref('users/' + user.uid).set({
            email: email,
            // Add any other information you want to save
        }).then(() => {
            console.log('Thông tin tài khoản đã được lưu vào database.');
        }).catch((error) => {
            console.error('Lỗi khi lưu thông tin tài khoản vào database:', error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("status code:" + errorCode + " status message:" + errorMessage);
    });
}

function userLogin() {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("Đăng nhập thành công! Chào mừng bạn quay trở lại!");

        // Redirect to homepage
        redirectToHomePage(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("status code:" + errorCode + " status message:" + errorMessage);
    });
}

function redirectToHomePage(user) {
    // Hide login form
    document.querySelector('.sign-in-container').style.display = 'none';

    // Show user avatar and email
    document.getElementById('user-avatar').style.display = 'block';
    document.getElementById('avatar').src = user.photoURL || 'default-avatar.png'; // Add a default avatar if user has no photo
    document.getElementById('user-email').innerText = user.email;

    
    window.location.href = 'flixspot_index.html';
}
