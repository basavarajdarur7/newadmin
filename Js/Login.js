
window.onload = function () {



    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.oninput = () => {
            if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
        };
    })




    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        setTimeout(showSlides, 2000);                        // Change image every 2 seconds
    }

}

function onlyNumberKey(evt) {

    // Only ASCII character in that range allowed
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}


function Login() {

    const formE1 = document.querySelector('.form1');

    formE1.addEventListener('submit', event => {
        event.preventDefault();

        let formData = new FormData(formE1);

        let data;
        data = Object.fromEntries(formData);
        console.log(data);


        // const JwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4MjE1NzEzOTgyIiwiaWF0IjoxNzAyMTEzODE1LCJleHAiOjE3MDIxMTU2MTV9.qaD2BLNtd5NLaR-DMysEbV8oprdD1QE4y7KUPLu9W7c';

        fetch("http://13.200.156.231:8097/user/admin/loginPage",

            {
                method: "POST",
                
                body: JSON.stringify({
                  
                    "userName": data.username,
                    "password": data.password



                    // "userName": "admin1",
                    // "password": "admin@123"

                }),
                headers: {  
                    "Content-type": "application/json; charset=UTF-8",
                    // 'Authorization': `Bearer ${JwtToken}`
                },
            })
            
            .then((response) => response.json())
            .then(data => {
                console.log(data);



                if (data.statuscode == 200) {

                   document.getElementById("login_error_msg").innerHTML = "logged in succesfully";
                   document.getElementById("login_error_msg").style.color = "green";

                    localStorage.setItem('Login-UserName', data.data.userName);
                    localStorage.setItem('Login-MobileNumber', data.data.mobileNo);
                    localStorage.setItem('Login-Email', data.data.email);
                    localStorage.setItem('User-ID', data.data.userId);
                    // localStorage.setItem('JWT_Token', data.data.jwtToken)

                    var name = localStorage.getItem('Login-UserName');
                    var email = localStorage.getItem('Login-Email');
                    var mobileNo = localStorage.getItem('Login-MobileNumber');

                    console.log(name);
                    console.log(mobileNo);
                    console.log(email);
                    location.assign("./Home/index.html");



                } else {
                    document.getElementById("login_error_msg").style.display = "block";
                    document.getElementById("login_error_msg").innerHTML = data.data;

                };

               
            })
    })

}

// var a;
// function pass() {
//     if (a == 1) {
//         document.getElementById('password').type = 'password';
//         document.getElementById('pwdeyeLogin').src = "../images/pass-hide1.png";
//         a = 0;
//     }
//     else {
//         document.getElementById('password').type = 'text';
//         document.getElementById('pwdeyeLogin').src = "../images/pass-show1.png";
//         a = 1;
//     }
// }



// function show_password_login() {

//     var x = document.getElementById("Password");
//     if (x.type === "password") {
//         x.type = "text";
//         document.getElementsByClassName('eye_icon')[0].src = "./images/pass-show1.png";
//     } else {
//         x.type = "password";
//         document.getElementsByClassName('eye_icon')[0].src = "./images/pass-hide1.jpg";
//     }

// }
function show_password_login() {
    // function pass() {

    var x = document.getElementById("Password");
    if (x.type === "password") {
        x.type = "text";
        document.getElementsByClassName('eye_icon')[0].src = "./images/pass-show1.png";
    } else {
        x.type = "password";
        document.getElementsByClassName('eye_icon')[0].src = "./images/pass-hide1.png";
    }

}

///////////////////////////////////////////////////////////////////////////////////////////////////












/////////////////////////////////////////////////////////////////////////////////////////////////


// Mobile  Number min digits error ....

function myFunction() {
    const inpObj = document.getElementsByClassName('Mobile_number_inputs')[0];
    if (!inpObj.checkValidity()) {
        document.getElementById("login_error_msg").style.display = "block";
        document.getElementById("login_error_msg").innerHTML = "Number should be 10 digits";
    } else {
        document.getElementById("login_error_msg").style.display = "none";
        //   document.getElementById("demo").innerHTML = "Input OK";
    }
}

function myReg_Mobile_no() {


    const inpOb = document.getElementsByClassName('Mobile_number_inputs')[1];
    if (!inpOb.checkValidity()) {
        document.getElementById("error_message").style.display = "block";
        document.getElementById("error_message").innerHTML = "Number should be 10 digits";
    } else {
        document.getElementById("error_message").style.display = "none";
        //   document.getElementById("demo").innerHTML = "Input OK";
    }


}

function myReset_Mobile_no() {

    const inpOb = document.getElementsByClassName('Mobile_number_inputs')[2];
    if (!inpOb.checkValidity()) {
        document.getElementById("Reset_error_msg").style.display = "block";
        document.getElementById("Reset_error_msg").innerHTML = "Number should be 10 digits";
    } else {
        document.getElementById("Reset_error_msg").style.display = "none";
        //   document.getElementById("demo").innerHTML = "Input OK";
    }

}




