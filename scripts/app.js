const IP_BACKEND = '34.199.191.171:5000';

window.onload = function() {
    $('#onloader').fadeOut();
    $('#page').removeClass('hidden');
    getServerStatus();
    const userAuth = localStorage.getItem('auth');
    const user = localStorage.getItem('user');
    changePanelLink(userAuth);

    populateTopTenClans('.top10Clanlist', 10);
    populateTopStats('.top10PvpList', 'pvp', 10);
    populateTopStats('.top10PkList', 'pk', 10);
    if (!userAuth) {
        $('#panelUserAuth').addClass('hidden');
    } else {
        $('#u12876-6').addClass('hidden');
        $('#u13809').addClass('hidden');
        $('#u13812').addClass('hidden');
        $('#u13814').addClass('hidden');
        $('#registerForm').addClass('hidden');
        $('#u12942-3').addClass('hidden');
        $('#u12957-4').addClass('hidden');
        $('#idUserAuth').html(user);
        getAccountInfo(user);
    }
}

const getServerStatus = async() => {
    try {
        const url = `http://${IP_BACKEND}/checkServerStatus`;
        const response = await axios.get(url);
        console.log(response.data);
        if (response.data == 1) {
            $('#u6477-5').addClass('server-status-on');
            $('#u6477-5').removeClass('server-status-off');
        } else {
            $('#u6477-5').addClass('server-status-off');
            $('#u6477-5').removeClass('server-status-on');
        }
    } catch (error) {
        console.log(error);
        $('#u6477-2').html('Off');
        $('#u6477-2').removeClass('serverOn');
        localStorage.removeItem('user');
        localStorage.removeItem('auth');
        localStorage.removeItem('access_token');
    }
}
const getAccountInfo = async(user) => {
        try {
            const url = `http://${IP_BACKEND}/getAccountInfo`;
            // const url = `http://localhost:5000/getAccountInfo`;
            const token = localStorage.getItem('access_token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            const data = { "username": `${user}` };
            const response = await axios.post(url, data, {
                headers: headers
            })
            console.log(response);
        } catch (error) {
            console.log(error);
            if (error.response.status == 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Session expired',
                    text: 'Please relogin'
                }).then(() => {
                    logoutHandler();
                });
            }
        }
    }
    // inputs elements for login form
const txtLoginUser = document.querySelector(".txt-login-user");
const txtLoginPass = document.querySelector(".txt-login-pass");
const loginSubmit = document.querySelector(".loginSubmit");

// inputs elements used in register  form
const txtRegUser = document.querySelector('.txt-reg-user');
const txtRegPass = document.querySelector('.txt-reg-pass');
const txtRegPass2 = document.querySelector('.txt-reg-pass2');
const txtMail = document.querySelector('.txt-reg-mail');
const txtMail2 = document.querySelector('.txt-reg-mail2');
const registerSubmit = document.querySelector(".registerSubmit");

//handle the links to panel only with auth=true
const accountPanelLink = document.getElementById('u178');
const donationLink = document.getElementById('buttonu8980');
const recoveryPassordLink = document.getElementById('recoveryPassordLink');

let auth = localStorage.getItem('auth');
const changePanelLink = (auth) => {
        if (auth) {
            accountPanelLink.setAttribute('href', 'panel-de-cuentas-lineage-hubble.html');
            donationLink.setAttribute('href', 'panel-de-cuentas-lineage-hubble.html');
        } else {
            accountPanelLink.setAttribute('href', 'index.html#registro');
            donationLink.setAttribute('href', 'index.html#registro');
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
const authUser = (txtUser) => {
    localStorage.setItem("user", txtUser.value);
    localStorage.setItem('auth', true);
}

const token = "";
// signinHandler para manejar el inicio de sesion
const signinHandler = async() => {

    try {
        const errorAlphaNumeric = validateAlphaNumeric(txtLoginUser);
        const errorForm = validateForm('#loginForm');
        if (!errorForm && !errorAlphaNumeric) {
            const url = `http://${IP_BACKEND}/login`;
            // const url = 'http://localhost:5000/login';
            const username = txtLoginUser.value;
            const password = txtLoginPass.value;
            const user = {
                username,
                password
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const authUser = await axios.post(url, user);
            console.log(authUser.data.code);
            if (authUser.data.code == 200) {
                console.log(authUser.data.message);
                auth = true;
                localStorage.setItem("user", txtLoginUser.value);
                localStorage.setItem('auth', true);
                localStorage.setItem('access_token', authUser.data.access_token);
                console.log(localStorage.getItem('access_token'))
                changePanelLink(auth);
                location.href = "panel-de-cuentas-lineage-hubble.html";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login error',
                    text: 'Invalid credentials'
                })
                clearForm();
            }
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Login error',
            text: 'Server off'
        })
    }
}

// signupHandler par manejar el nuevo registro de usuarios
const signupHandler = async() => {
    try {
        const errorAlphaNumeric = validateAlphaNumeric(txtRegUser);
        const errorForm = validateForm('#registerForm');
        if (!errorForm && !errorAlphaNumeric) {
            if (txtRegPass.value == txtRegPass2.value) {
                if (txtRegPass.value.length >= 8) {
                    if (txtMail.value == txtMail2.value) {
                        // full valid form next action
                        if (validateEmail(txtMail.value)) {
                            const url = `http://${IP_BACKEND}/newUser`;
                            // const url = 'http://localhost:5000/newUser';
                            const mail = txtMail.value;
                            const password = txtRegPass.value;
                            const username = txtRegUser.value;
                            const newUser = {
                                username,
                                password,
                                mail
                            };
                            const regNewUser = await axios.post(url, newUser);
                            console.log(regNewUser.data);
                            if (regNewUser.data.code == 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'User Successful registered',
                                    text: ''
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'User not registered',
                                    text: regNewUser.data.message
                                })
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Email format is not valid'
                            })
                        }

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Both Email fields must match!'
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Password length must be longer than 7'
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Both Passwords fields must match!'
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const validateForm = (form) => {

    let error = false;
    let inputsRequired = document.querySelectorAll(`${form} [required]`);
    for (let i = 0; i < inputsRequired.length; i++) {
        if (inputsRequired[i].value == '') {
            inputsRequired[i].classList.add('input-error');
            const elementId = inputsRequired[i].id;
            $(`#${elementId}`).notify("Input required", { position: "right middle" });
            error = true;
        } else {
            inputsRequired[i].classList.remove('input-error');
        }
    }
    return error;
}

const validateAlphaNumeric = (inputTxt) => {
    let error = false;
    const letters = /^[0-9a-zA-Z]+$/;
    if (!inputTxt.value.match(letters)) {
        error = true
        $(`#${inputTxt.id}`).notify("Input must be alphanumerical", { position: "right middle" });
    }
    return error;
}
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const clearForm = () => {
    txtLoginUser.value = "";
    txtLoginPass.value = "";
}
loginSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    signinHandler;
});
registerSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    signupHandler;
});

loginSubmit.addEventListener('click', signinHandler);
registerSubmit.addEventListener("click", signupHandler);

// accountPanelLink.addEventListener('click',()=>{
//     const auth = localStorage.getItem('auth');
//     if (auth) {
//         location.href = "panel-de-cuentas-lineage-hubble.html";
//     }
// })
donationLink.addEventListener('click', () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
        location.href = "panel-de-cuentas-lineage-hubble.html";
    }
})

const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    localStorage.removeItem('access_token');
    window.location.href = "index.html";
}

const logoutSubmit = document.querySelector(".logoutSubmit");
logoutSubmit.addEventListener('click', logoutHandler);


const recoveryPasswordHandler = () => {
    Swal.fire({
        title: 'Enter your email',
        text: 'We will send you a recovery code',
        input: 'text',
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value != '' && validateEmail(value)) {
                    resolve();
                } else {
                    resolve('You have to enter a valid mail');
                }
            })
        },
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: 'Send',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
            let data = {
                email
            }
            return fetch('//34.199.191.171:5000/recovery', {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => {
                    console.log(response);
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    // if (response.json().value.code == 400) {
                    //     Swal.showValidationMessage(
                    //         'Email was not found in database'
                    //     )
                    // }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value.code == 400) {
                Swal.fire({
                    icon: 'error',
                    text: 'Email not registered'
                }).then(() => recoveryPasswordHandler());
            } else {
                console.log(result);
                // Swal.fire({
                //     title: 'Multiple inputs',
                //     html:'</br><p>Enter recovery code:</p>' +
                //       '<input id="swal-input1" type="text"  class="swal2-input">' +
                //       '<p>Enter your new password:</p>' +
                //       '<input id="swal-input2" type="password"  class="swal2-input">' +
                //       '<p>Repeat your new password:</p>' +
                //       '<input id="swal-input3" type="password"  class="swal2-input">',
                //     focusConfirm: false,
                //     preConfirm: () => {
                //         const swalPass2 = document.getElementById('swal-input2');
                //         const swalPass3 = document.getElementById('swal-input3');
                //         let data ={
                //             recoveryCode: document.getElementById('swal-input1').value,
                //             newPassword: swalPass2
                //         }
                //         if (swalPass2 == swalPass3) {
                //             return fetch('//34.199.191.171:5000/resetPassword', {
                //                 method: "POST",
                //                 body: JSON.stringify(data),
                //                 headers: { "Content-type": "application/json; charset=UTF-8"}
                //             })
                //             .then(response => {
                //                 if (!response.ok) {
                //                     throw new Error(response.statusText)
                //                 }
                //                 return response.json()
                //             })
                //             .catch(error => {
                //                 Swal.showValidationMessage(
                //                     `Request failed: ${error}`
                //                 )
                //             })
                //         }else{
                //             // throw new Error()
                //             // .catch(error =>{
                //             //     Swal.showValidationMessage(
                //             //         `ingresa bien la wea`
                //             //     )
                //             // })
                //         }
                //     }
                // }).then((res) =>{
                //     if (res.isConfirmed) {
                //         console.log(res);
                //         Swal.fire({
                //             title: 'Done!',
                //             icon: 'success',
                //             text:'Password has been updated'
                //         })
                //     }
                // })
                modalRecoverPassword();
            }
        }
    })
}

recoveryPassordLink.addEventListener('click', recoveryPasswordHandler);

const modalRecoverPassword = () => {
    Swal.fire({
        title: 'Final step',
        html: '</br><p>Enter recovery code:</p>' +
            '<input id="swal-input1" type="text"  class="swal2-input">' +
            '<p>Enter your new password:</p>' +
            '<input id="swal-input2" type="password"  class="swal2-input">' +
            '<p>Repeat your new password:</p>' +
            '<input id="swal-input3" type="password"  class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            // const swalRecoveryCode = document.getElementById('swal-input1');
            const swalPass2 = document.getElementById('swal-input2');
            const swalPass3 = document.getElementById('swal-input3');
            let data = {
                recoveryCode: document.getElementById('swal-input1').value,
                newPassword: swalPass2.value
            }
            if (swalPass2.value != '') {
                if (swalPass2.value == swalPass3.value) {
                    return fetch('//34.199.191.171:5000/resetPassword', {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: { "Content-type": "application/json; charset=UTF-8" }
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(response.statusText)
                            }
                            return response.json()
                        })
                        .catch(error => {
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            )
                        })
                } else {
                    console.log('no tan rapido amiguito xd');
                    Swal.fire({
                        icon: 'error',
                        text: 'Both password inputs must match!'
                    }).then(() => modalRecoverPassword());
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'You have to enter a new password'
                }).then(() => modalRecoverPassword());
            }
        }
    }).then((res) => {
        if (res.isConfirmed) {
            console.log(res.value)
            if (res.value.code == 200) {
                Swal.fire({
                    title: 'Done!',
                    icon: 'success',
                    text: 'Password has been updated'
                })
            } else {
                console.log(res);
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Recovery code is not valid'
                }).then(() => modalRecoverPassword());
            }
        }
    })
}
const getTopClans = async(qty) => {
    try {
        const url = `http://${IP_BACKEND}/getTopClans/${qty}`;
        // const url = `http://localhost:5000/getTopClans/${qty}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
const populateTopTenClans = async(tableSelector, qty) => {
    const topList = await getTopClans(qty);
    console.log(topList);
    const table = document.querySelector(tableSelector);
    for (let i = 0; i < topList.length; i++) {
        let tr = document.createElement('tr'); //Create 3 <tr> elements assigned to a unique variable BUT need a working alternative for 'tr[i]'
        table.appendChild(tr); // Append to <table> node
        let tdElementPos = document.createElement('td');
        tdElementPos.innerHTML = `${[i+1]}.`;
        tr.appendChild(tdElementPos);
        for (let j = 0; j < 1; j++) {
            let tdElement = document.createElement('td');
            tdElement.innerHTML = Object.values(topList[i])[j];
            tr.appendChild(tdElement);
        }
    }
}
const getTopTens = async(mode, qty) => {
    try {
        const url = `http://${IP_BACKEND}/getTops/${mode}/${qty}`;
        // const url = `http://localhost:5000/getTops/${mode}/${qty}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
const populateTopStats = async(tableSelector, mode, qty) => {
    const topList = await getTopTens(mode, qty);
    const table = document.querySelector(tableSelector);
    for (let i = 0; i < topList.length; i++) {
        let tr = document.createElement('tr'); //Create 3 <tr> elements assigned to a unique variable BUT need a working alternative for 'tr[i]'
        table.appendChild(tr); // Append to <table> node
        let tdElementPos = document.createElement('td');
        tdElementPos.innerHTML = `${[i+1]}.`;
        tr.appendChild(tdElementPos);
        for (let j = 0; j < 1; j++) {
            let tdElement = document.createElement('td');
            tdElement.innerHTML = Object.values(topList[i])[j];
            tr.appendChild(tdElement);
        }
    }
}