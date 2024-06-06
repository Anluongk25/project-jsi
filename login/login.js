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
  const auth = firebase.auth()
  const database = firebase.database()
  // Sau khi đăng ký tài khoản thành công
  admin.auth().createUser({
    email: email,
    password: password
  })
  .then((userRecord) => {
    console.log('Tài khoản đã được đăng ký thành công:', userRecord.uid);
    
    // Lưu thông tin tài khoản vào Realtime Database
    database.ref('users/' + userRecord.uid).set({
      email: email,
      // Thêm bất kỳ thông tin khác bạn muốn lưu
    })
    .then(() => {
      console.log('Thông tin tài khoản đã được lưu vào database.');
    })
    .catch((error) => {
      console.error('Lỗi khi lưu thông tin tài khoản vào database:', error);
    });
  
    // Đã đăng ký thành công, bạn có thể thực hiện các thao tác khác ở đây nếu cần
    rl.close();
  })
  .catch((error) => {
    console.error('Lỗi khi đăng ký tài khoản:', error);
    rl.close();
  });
  function createUser() {
     email = document.getElementById("email").value;
     password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert("Tài khoản đã tạo thành công!")
      // ...
      
    })
  
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert("status code:"+ errorCode+ "status message:"+ errorMessage)
    });
  
  }
  function userLogin() {
    email = document.getElementById("emailInput").value;
     password = document.getElementById("passwordInput").value;
     auth.signInWithEmailAndPassword( email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      alert("Đăng nhập thành công! Chào mừng bạn quay trở lại!")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("status code:"+ errorCode+ "status message:"+ errorMessage)
  
    });
  }
  