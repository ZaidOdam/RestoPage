// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrQXrq65a-D18vQQ3Y0SiMkJx0A9IxwBo",
    authDomain: "restopage-abc0e.firebaseapp.com",
    databaseURL: "https://restopage-abc0e-default-rtdb.firebaseio.com",
    projectId: "restopage-abc0e",
    storageBucket: "restopage-abc0e.appspot.com",
    messagingSenderId: "571859952324",
    appId: "1:571859952324:web:353e1262a3ba6fc8c19f91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Registration Form
//Refernceces
const name = document.getElementById('fullname');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const create = document.getElementById('create');

//validation
function isEmptyOrSpace(str) {
    return (str === null || str.match(/^ *$/) !== null);
}

function validation() {
    let nameregex = /^[a-zA-Z ]+$/;
    let emailregex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/;
    let userregex = /^[a-zA-Z0-9]{5,}$/;

    if (isEmptyOrSpace(name.value) || isEmptyOrSpace(email.value) || isEmptyOrSpace(username.value) || isEmptyOrSpace(password.value)) {
        alert("Don't keep any field empty");
        return false;
    }

    if (!nameregex.test(name.value)) {
        alert('Name contains only alphabets ');
        return false;
    }

    if (!emailregex.test(email.value)) {
        alert("Enter a valid email");
        return false;
    }

    if (!userregex.test(username.value)) {
        alert("Username can only be Alphanumeric\nusername should be atleast of 5 charachters");
        return false;
    }
    return true;
}

//Registeration
function RegisterUser() {
    if (!validation()) {
        return;
    }
    const dbRef = ref(db);

    get(child(dbRef, "UsersList/" + username.value)).then((snapshot) => {
        if (snapshot.exists()) {
            alert("Account Already Exist");
        } else {
            set(ref(db, "UsersList/" + username.value), {
                    fullname: name.value,
                    email: email.value,
                    username: username.value,
                    password: password.value

                })
                .then(() => {
                    alert("Account created successfully!\nNow you can LogIn using username and password");
                    window.location = "index.html";
                })
                .catch((error) => {
                    alert("Error: " + error);
                })
        }
    });
}
create.addEventListener("click", RegisterUser);

//Login Form
//Refernceces
const login_username = document.getElementById('loginname');
const login_password = document.getElementById('loginpass');
const login_btn = document.getElementById('login');

function LogUser() {
    const dbRef = ref(db);
    get(child(dbRef, "UsersList/" + login_username.value)).then((snapshot) => {

        if (snapshot.exists()) {
            let dbpass = snapshot.val().password;
            if (dbpass == login_password.value) {
                login(snapshot.val());
            } else {
                alert("Username or password in invalid");
            }
        } else {
            alert("Username or password in invalid");
        }
    });
}
login_btn.addEventListener("click", LogUser);

function login(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    window.location = "index.html";

    // keep logged in need to add
    // localStorage.setItem('keepLoggedIn','yes');
    // localStorage.setItem('user',JSON.stringify(user));
    // window.location='index.html';
}

const logout_btn = document.getElementById('logout');
logout_btn.addEventListener("click", Signout);