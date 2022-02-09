const users = [];

const addUser = ({id, username, room}) =>{
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if(!room || !username){
        return {error:'username and room are required'}
    }
    //checking existing user 
    const existingUser = users.find((user)=>user.username === username && user.room === room);
    if(existingUser){
        return {
            error:"Username is already present"
        }
    }
    //saving user
    const user = {id, username, room};
    users.push(user);
    return { user };
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>user.id === id);
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id) =>{
    return users.find((user)=>user.id===id)
}

const getUsersInRoom = (room)=>{
    room = room.trim().toLowerCase();
    return users.filter((user)=>user.room===room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}