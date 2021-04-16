let users = [];
const user = localStorage.getItem('user'); 
console.log(user);
const username = document.getElementById('user_name');
console.log(username)
if (user) {
    username.innerHTML= user.replace(/^\w/, (c) => c.toUpperCase());
}