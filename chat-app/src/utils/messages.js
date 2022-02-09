const generateMessage = (text,username) =>{
    return{
        text,
        createdAt: new Date().getTime(),
        username
    }
}
const generateLocationMessage = (latLong,username)=>{
    return{
        username,
        url:`https://www.google.com/maps?q=${latLong}`,
        createdAt: new Date().getTime()
    }
}

module.exports = { generateMessage, generateLocationMessage }