const user = {
    name:"",
    mail:"",
    createdDate: "",
    lastLogin: "",
    numberCharacters:0,
    characters:[]
};
const getCharacters = async(username)=>{
    try {
        const url = `http://34.199.191.171:5000/getCharacters/${username}`;
        const token = localStorage.getItem('access_token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const chars = await axios.get(url,{
            headers: headers
        });
        user.characters = chars.data.data;
        user.numberCharacters = chars.data.data.length;
        populateSelectInput(selectCharacters,user.characters);
        console.log(chars);
        console.log(user.numberCharacters);
        populateUserInfo();
    } catch (error) {
        console.log(error);
    }
}
const getAccountInfo = async(username)=>{
    try {
        const url = `http://34.199.191.171:5000/getAccountInfo`;
        const token = localStorage.getItem('access_token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const data = {"username":`${username}`};
        const response = await axios.post(url, data , {
            headers:headers
        })
        console.log(response);
        user.mail= response.data.email;
        user.createdDate = response.data.createdIn;
        user.lastLogin = response.data.lastLogin;
        user.numberCharacters = user.characters.length;
        populateUserInfo();
        $('#onloader').fadeOut();
        $('#page').removeClass('hidden');
    } catch (error) {
        console.log(error);
    }
}

user.name = localStorage.getItem('user');
console.log(user);
const txtUsername = document.getElementById('user_name');

getAccountInfo(localStorage.getItem('user'));
getCharacters(user.name);

// console.log(username);

if (user.name) {
    txtUsername.innerHTML = user.name.replace(/^\w/, (c) => c.toUpperCase());
}else{
    window.location.assign("index.html");
}


//panel ui
const userInfoPanel = document.getElementById('user-info');
const makeDonationPanel = document.getElementById('make-donation');
const historyDonationPanel = document.getElementById('history-donation');
const tranferDonationPanel = document.getElementById('transfer-donation');
const changePassPanel = document.getElementById('changePass');
const changeMailPanel = document.getElementById('changeMail');
const topPvpPanel = document.getElementById('topPvp');
const topPkPanel = document.getElementById('topPk');
const topClanPanel = document.getElementById('topClan');
const bossJewells = document.getElementById('bossJewells');

const selectCharacters = document.getElementById('selectCharacters');

const populateSelectInput = (select,array)=>{
    for(var i = 0; i < array.length; i++) {
        var opt = array[i];
        var el = document.createElement("option");
        el.textContent = opt.char_name;
        el.value = opt.char_name;
        select.appendChild(el);
    }
}
//instancing txt
const nameChar = document.getElementById('nameChar');
const titleChar = document.getElementById('titleChar');
const createdInChar = document.getElementById('createdInChar');
const isOnline = document.getElementById('isOnline');
const baseClassChar = document.getElementById('baseClassChar');
const sub1Char = document.getElementById('sub1Char');
const sub2Char = document.getElementById('sub2Char');
const sub3Char = document.getElementById('sub3Char');
const baseLevelChar = document.getElementById('baseLevelChar');
const genderChar = document.getElementById('genderChar');
const pvpCountChar = document.getElementById('pvpCountChar');
const pkCountChar = document.getElementById('pkCountChar');
const karmaCountChar = document.getElementById('karmaCountChar');
const clanChar = document.getElementById('clanChar');
const aliianceChar = document.getElementById('aliianceChar');
const isNoble = document.getElementById('isNoble');
const isHero = document.getElementById('isHero');
const onlineTimeCounterChar = document.getElementById('onlineTimeCounterChar');

const renderCharStat = (charName) =>{
    console.log(user.characters);
    char = user.characters.find(char => char.char_name === charName);
    nameChar.textContent = char.char_name;
    baseClassChar.textContent = char.class;
    baseLevelChar.textContent = char.lev;
    pkCountChar.textContent = char.pk;
}

// array of elements panel UI
const panelsArr = [
    userInfoPanel,
    makeDonationPanel,
    historyDonationPanel,
    tranferDonationPanel,
    changePassPanel,
    changeMailPanel,
    topPvpPanel,
    topPkPanel,
    topClanPanel,
    bossJewells
]

//links
const linkUserInfo = document.getElementById('u12374');
const linkUserInfo2 = document.getElementById('u12377-4');
const linkUserInfo3 = document.getElementById('u12410-3');
const linkMakeDonation = document.getElementById('u12449-4');
const linkHistoryDonation = document.getElementById('u12452-4');
const linkTransferDonation = document.getElementById('u12455-4');
const linkChangePass = document.getElementById('u12479-4');
const linkChangeMail = document.getElementById('u12482-4');
const linkTopPvp = document.getElementById('u13829-4');
const linkTopPk = document.getElementById('u13832-4');
const linkTopClan = document.getElementById('u13835-4');
const linkBossJewells = document.getElementById('u13838-4');
console.log(linkUserInfo);
//array of elements link
const linksArr = [
    linkUserInfo,
    linkMakeDonation,
    linkHistoryDonation,
    linkTransferDonation,
    linkChangePass,
    linkChangeMail,
    linkTopPvp,
    linkTopPk,
    linkTopClan,
    linkBossJewells
]

//event listeners 
//eventListener for clicks of links in account panel
linkUserInfo.addEventListener('click',()=>displayPanel('user-info'));
linkUserInfo2.addEventListener('click',()=>displayPanel('user-info'));
linkUserInfo3.addEventListener('click',()=>displayPanel('user-info'));
linkMakeDonation.addEventListener("click", ()=> displayPanel('make-donation'));
linkHistoryDonation.addEventListener('click',()=> displayPanel('history-donation'));
linkTransferDonation.addEventListener('click',()=> displayPanel('transfer-donation'));
linkChangePass.addEventListener('click',()=> displayPanel('changePass'));
linkChangeMail.addEventListener('click',()=> displayPanel('changeMail'));
linkTopPvp.addEventListener('click',()=> displayPanel('topPvp'));
linkTopPk.addEventListener('click',()=> displayPanel('topPk'));
linkTopClan.addEventListener('click',()=> displayPanel('topClan'));
linkBossJewells.addEventListener('click',()=> displayPanel('bossJewells'));

//event listener for render char stats
selectCharacters.addEventListener('change',e => {
    if (e.target.value != 'Select a character') {
        renderCharStat(e.target.value);
    }
    
});

//function handler for toggle displays on panels UI
const displayPanel = (id)=>{
    panelsArr.forEach(element => {
        if (element.id === `${id}`) {
            console.log(element.id);
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}

// arrange txt of user info panel
const txtUser = document.getElementById('txtUser');
const txtMail = document.getElementById('txtMail');
const txtCreatedDate = document.getElementById('txtCreatedDate');
const txtLastLogin = document.getElementById('txtLastLogin');
const txtCountChars = document.getElementById('txtCountChars');
const txtTopPvp = document.getElementById('txtTopPvp');
const txtTopPk = document.getElementById('txtTopPk');
const txtTopClan = document.getElementById('txtTopClan');
const txtTopLvl = document.getElementById('txtTopLvl');
const txtTopOnline = document.getElementById('txtTopOnline');

console.log(txtCreatedDate);
const populateUserInfo = ()=>{
    txtUser.innerHTML = user.name;
    txtMail.innerHTML = user.mail;
    txtCreatedDate.innerHTML = user.createdDate;
    txtLastLogin.innerHTML = user.lastLogin;
    txtCountChars.innerHTML = user.numberCharacters;
    txtTopPvp.innerHTML = "topPvpChar";
    txtTopPk.innerHTML = "topPkChar";
    txtTopClan.innerHTML = "topClan";
    txtTopLvl.innerHTML = "topLvlChar";
    txtTopOnline.innerHTML = "topOnlineChar";
}

const logoutHandler = ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    localStorage.removeItem('access_token');
    window.location.href = "index.html";
}

const logoutSubmit = document.querySelector(".logoutSubmit");
logoutSubmit.addEventListener('click', logoutHandler);

const txtChangePasswordActual = document.getElementById('txtChangePasswordActual');
const txtChangePasswordNew1 = document.getElementById('txtChangePasswordNew1');
const txtChangePasswordNew2 = document.getElementById('txtChangePasswordNew2');
const changePasswordSubmit = document.getElementById('changePasswordSubmit');
const txtChangeMailActual = document.getElementById('txtChangeMailActual');
const txtChangeMailNew1 = document.getElementById('txtChangeMailNew1');
const txtChangeMailNew2 = document.getElementById('txtChangeMailNew2');
const changeMailSubmit = document.getElementById('changeMailSubmit');


const handleChangePassword = async ()=>{
    try {
        if (txtChangePasswordNew1.value == txtChangePasswordNew2.value) {
            const url = 'http://34.199.191.171:5000/changePassword';
            const username = localStorage.getItem('user');
            const newPassword = txtChangePasswordNew1.value;
            const oldPassword = txtChangePasswordActual.value;
            const data = {
                username,
                oldPassword,
                newPassword
            };
            const token = localStorage.getItem('access_token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            const resp = await axios.post(url,data,{
                headers:headers
            });
            console.log(resp.data);
            if (resp.data.code == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    text: resp.data.message
                    })                            
            } else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: resp.data.message
                    }) 
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'New passwords doesnt match'
                }) 
        }
    } catch (error) {
        console.log(error);
    }
    clearInput(txtChangePasswordActual);
    clearInput(txtChangePasswordNew1);
    clearInput(txtChangePasswordNew2);
}
const handleChangeMail = async ()=>{
    try {
        if (validateEmail(txtChangeMailActual.value)) {
            if (validateEmail(txtChangeMailNew1.value)) {
                if (txtChangeMailNew1.value == txtChangeMailNew2.value) {
                    const url = 'http://34.199.191.171:5000/changeEmail';
                    const username = localStorage.getItem('user');
                    const newEmail = txtChangeMailNew1.value;
                    const data = {
                        username,
                        newEmail
                    };
                    const token = localStorage.getItem('access_token');
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    const resp = await axios.post(url,data,{
                        headers:headers
                    });
                    console.log(resp.data);
                    if (resp.data.code == 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Done!',
                            text: resp.data.message
                            })                            
                    } else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: resp.data.message
                            }) 
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'New mail fields doesnt match'
                        }) 
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'New email field format is not valid'
                  })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Email actual field format is not valid'
              })
        }
    } catch (error) {
        console.log(error);
    }
    clearInput(txtChangeMailActual);
    clearInput(txtChangeMailNew1);
    clearInput(txtChangeMailNew2);
}
const clearInput = (input)=>{
    input.value = "";
}
changePasswordSubmit.addEventListener('click', handleChangePassword);
changeMailSubmit.addEventListener('click', handleChangeMail);

const validateEmail = (email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}