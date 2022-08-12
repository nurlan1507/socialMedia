let users ={};

// let initValue =
//     {
//         id:{
//             username:"username",
//             online:true,
//         }
//     }
//

const addUser = (socketId,id,email) =>{

    return users[socketId] = {
        email: email,
        id: id
    }
}
const userLeave = (socketId)=>{
    const left = users[socketId];
    delete users[socketId];
    return {...left};
}
const getUsers = ()=>{
    return users
}

module.exports = {addUser,userLeave,getUsers,users}
