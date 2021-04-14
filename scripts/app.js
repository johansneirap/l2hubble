
const getUser = async (id) => {
    try {
        const user = await axios(`http://127.0.0.1:5000/users/${id}`)
        console.log(user.data)
    } catch (error) {
        console.log(error)
    }

}

getUser(1);