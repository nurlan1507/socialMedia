const {addUser, userLeave, getUsers, users} = require('./handlers/userHandler');


const SocketService = (socket)=>{
    socket.on('connection', (user)=>{
        const newUser = addUser(socket.id, user.id, user.email);
        console.log(newUser);
    });

    socket.on('disconnect', (user)=>{
        const left = userLeave(socket.id);
        console.log(`user ${socket.id} ${left.email} disconnected`)
    });
};


module.exports = SocketService;

