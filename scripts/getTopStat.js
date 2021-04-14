let users = [];

const obtenerDatos = ()=>{
    let url = 'http://127.0.0.1:5000/users';
    
    const api = new XMLHttpRequest();
    api.open('GET',url,true);
    api.send();
    
    api.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let datos = JSON.parse(this.responseText);
            users = datos.users;
            console.log(users[0])
            const pUserName = document.getElementById("user_name");
            const text = document.createTextNode(users[0].name);

            pUserName.appendChild(text);
        }
    }

}


obtenerDatos();
