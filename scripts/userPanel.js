
let users = [];
const user = localStorage.getItem('user');
console.log(user);
const username = document.getElementById('user_name');
console.log(username)
if (user) {
    username.innerHTML = user.replace(/^\w/, (c) => c.toUpperCase());
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

const clickPanelHandler = () => {

}

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

//function handler for toggle displays on panels UI
const displayPanel = (id)=>{
    // Swal.fire({
    //     "title":"Welcome"
    // }
    //   );
    panelsArr.forEach(element => {
        if (element.id === `${id}`) {
            console.log(element.id);
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}