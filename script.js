$('.message a').click(function() {
    // $('section').animate({ height: "toggle", opacity: "toggle" }, 800, "linear");
    $('section').slideToggle(1000);
});

// session management
var currentUser = null;

function getUsername() {
    currentUser = JSON.parse(sessionStorage.getItem('user'));
}

function Signout() {
    sessionStorage.removeItem('user');
    window.location = 'index.html';
}

window.onload = function() {
    $(".loader").fadeOut(1000);
    var p1 = document.getElementById('log_yourself');
    var logged = document.getElementById('logged');
    var notlogged = document.getElementById('not_logged');

    getUsername();
    if (currentUser == null) {
        // form content display visiblle
        // bio content display none
        logged.style.display = 'none';
        p1.style.display = 'visible';
        notlogged.style.display = 'visible';


    } else {
        // form content display none
        // bio content display visibible
        p1.style.display = 'none';
        notlogged.style.display = 'none';
        logged.style.display = 'visible';
        document.getElementById("log_fullname").innerHTML = currentUser.fullname;
        document.getElementById("log_uname").innerHTML = "Username: " + currentUser.username;
    }
    $(".content").fadeIn(1000);
}