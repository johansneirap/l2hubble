
console.log("no jala cabron");
const txtUser = document.querySelector(".txt-user");
const txtPass = document.querySelector(".txt-pass");
const submit = document.querySelector(".submit");
console.log(submit);



// submit.addEventListener("click",()=>{
//     // change this for 
//     localStorage.setItem("user",txtUser.value);
//     localStorage.setItem("pass",txtPass.value);
//     location.href = "panel-de-cuentas-lineage-hubble.html";
//     const user = localStorage.getItem("user");
//     console.log(user);
// });

const token = "";
// signinHandler para manejar el inicio de sesion
const signinHandler = async ()=>{
    try {
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
        console.log(authUser)
    } catch (error) {
        console.log(error);
    }
}

// signupHandler par manejar el nuevo registro de usuarios (falta mostrar al usuario cuando tiene los campos vacios y cuando no pone signos alfanumericos)
const signupHandler = async ()=>{
    try {
        const errorAlphaNumeric = validateAlphaNumeric(txtUser);
        const errorForm = validateForm();
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

const validateForm = ()=>{

    let error = false;
    let inputsRequired = document.querySelectorAll('#loginForm [required]');
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
    txtUser.value = "";
    txtPass.value = "";
}

submit.addEventListener("click",signupHandler);



// const getUser = async (id) => {
//     try {
//         const user = await axios(`http://127.0.0.1:5000/users/${id}`)
//         console.log(user.data)
//     } catch (error) {
//         console.log(error)
//     }

// }

// getUser(1);