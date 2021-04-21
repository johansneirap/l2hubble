
const user = {
    name:"",
    mail:"mail@gmail.com",
    createdDate: "Yesterday",
    lastLogin: "Today",
    characters:[]
};
const username = "tt";
const getCharacters = async(username)=>{
    try {
        const url = `http://localhost/getCharacters/${username}`
        const chars = await axios.get(url);
        user.characters = chars.data.data;
        populateSelectInput(selectCharacters,user.characters);
    } catch (error) {
        console.log(error);
    }
}

user.name = localStorage.getItem('user');
console.log(user);
const txtUsername = document.getElementById('user_name');

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
        console.log(opt);
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
txtUser.innerHTML = user.name;
txtMail.innerHTML = user.mail;
txtCreatedDate.innerHTML = user.createdDate;
txtLastLogin.innerHTML = user.lastLogin;
txtCountChars.innerHTML = user.characters.length;
txtTopPvp.innerHTML = "topPvpChar";
txtTopPk.innerHTML = "topPkChar";
txtTopClan.innerHTML = "topClan";
txtTopLvl.innerHTML = "topLvlChar";
txtTopOnline.innerHTML = "topOnlineChar";

const logoutHandler = ()=>{
    localStorage.setItem('user',"");
    localStorage.setItem('auth',"");
    window.location.href = "index.html";
}

const logoutSubmit = document.querySelector(".logoutSubmit");
logoutSubmit.addEventListener('click', logoutHandler);