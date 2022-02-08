const generateMessage = (text) =>{
    return{
        text,
        createdAt: new Date().getTime()
    }
}
const generateLocationMessage = (latLong)=>{
    return{
        url:`https://www.google.com/maps?q=${latLong}`,
        createdAt: new Date().getTime()
    }
}

module.exports = { generateMessage, generateLocationMessage }