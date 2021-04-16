
console.log("no jala cabron");
console.log('SI JALA TE LA CREISTE WE... JASDJSJDS');
// inputs elements for login form
const txtLoginUser = document.querySelector(".txt-login-user");
const txtLoginPass = document.querySelector(".txt-login-pass");
const loginSubmit = document.querySelector(".loginSubmit");

// inputs elements used in register  form
const txtRegUser = document.querySelector('.txt-reg-user');
const txtRegPass = document.querySelector('.txt-reg-pass');
const txtRegPass2 = document.querySelector('.txt-reg-pass2');
const txtMail = document.querySelector('.txt-reg-mail');
const txtMail2 = document.querySelector('txt-reg-mail2');
const registerSubmit = document.querySelector(".registerSubmit");

//handle the links to panel only with auth=true
const accountPanelLink = document.getElementById('u178');
const donationLink = document.getElementById('buttonu8980');

let auth = false;
const changePanelLink = (auth)=>{
    if (auth) {
        accountPanelLink.setAttribute('href','panel-de-cuentas-lineage-hubble.html');
        donationLink.setAttribute('href','panel-de-cuentas-lineage-hubble.html');  
    }else{
        accountPanelLink.setAttribute('href','index.html#registro');
        donationLink.setAttribute('href','index.html#registro');
    }
}
// loginSubmit.addEventListener("click",()=>{
//     // change this for 
//     localStorage.setItem("user",txtLoginUser.value);
//     localStorage.setItem("pass",txtLoginPass.value);
//     location.href = "panel-de-cuentas-lineage-hubble.html";
//     const user = localStorage.getItem("user");
//     console.log(user);
// });
const authUser = (txtUser)=>{
    localStorage.setItem("user",txtUser.value);
    localStorage.setItem('auth',true);
}

const token = "";
// signinHandler para manejar el inicio de sesion
const signinHandler = async ()=>{
    
    try {
        const errorAlphaNumeric = validateAlphaNumeric(txtLoginUser);
        const errorForm = validateForm('#loginForm');
        if (!errorForm && !errorAlphaNumeric) {
            const url = 'https://reqres.in/api/login';
            const email = 'eve.holt@reqres.in';
            const password = 'cityslika';
            const user = {
                email,
                password
            };
            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            }
            const authUser = await axios.post(url,user);
            console.log(authUser);
            auth = true;
            localStorage.setItem("user",txtLoginUser.value);
            localStorage.setItem('auth',true);
            changePanelLink(auth);
            location.href = "panel-de-cuentas-lineage-hubble.html";
        }
    } catch (error) {
        console.log(error);
    }
}

// signupHandler par manejar el nuevo registro de usuarios (falta mostrar al usuario cuando tiene los campos vacios y cuando no pone signos alfanumericos)
const signupHandler = async ()=>{
    try {
        const errorAlphaNumeric = validateAlphaNumeric(txtRegUser);
        const errorForm = validateForm('#registerForm');
        if (!errorForm && !errorAlphaNumeric){
            const url = 'https://reqres.in/api/register';
            const email = 'eve.holt@reqres.in';
            const password = 'pistol';
            const newUser = {
                email,
                password
            };
            const regNewUser = await axios.post(url,newUser);
            console.log(regNewUser);
        }
    } catch (error) {
        console.log(error)
    }
}

const validateForm = (form)=>{

    let error = false;
    let inputsRequired = document.querySelectorAll(`${form} [required]`);
    for (let i = 0; i < inputsRequired.length; i++) {
        if (inputsRequired[i].value == ''){
            inputsRequired[i].classList.add('input-error');
            error = true;
        }else{
            inputsRequired[i].classList.remove('input-error');
        }
    }
    return error;
}

const validateAlphaNumeric = (inputTxt)=>{
    let error = false;
    const letters = /^[0-9a-zA-Z]+$/;
    if (!inputTxt.value.match(letters)) {
        error = true
    } 
    return error;
}

const clearForm = ()=>{
    txtLoginUser.value = "";
    txtLoginPass.value = "";
}
loginSubmit.addEventListener("click",(e)=>{
    e.preventDefault();
});
registerSubmit.addEventListener("click",(e)=>{
    e.preventDefault();
});

loginSubmit.addEventListener('click',signinHandler);
console.log(registerSubmit);
registerSubmit.addEventListener("click",signupHandler);



// const getUser = async (id) => {
//     try {
//         const user = await axios(`http://127.0.0.1:5000/users/${id}`)
//         console.log(user.data)
//     } catch (error) {
//         console.log(error)
//     }

// }

// getUser(1);