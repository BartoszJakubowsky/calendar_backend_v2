//database emulator
var activeUsers = [];
const uuidv4 = require('uuidv4');



function init(io) {
    
      
    io.on("connection", function(socket) 
    {   

        console.log('Nowe połączenie websocketrs')
        // const userId = uuidv4();
        // activeUsers[userId] = socket;
        activeUsers.push(socket.id);
        console.log('aktywni użytkownicy', activeUsers)



        io.to(socket.id).emit('connected', 
        {
           data: 'Pocałunmek w dupala',
            id: socket.id
        });

        socket.on("message", function(request) 
        {
            io.emit("sign", request);                     
        });

        socket.on('disconnect', function() 
        {
            console.log('Rozłączono z websockeets');
      
            const index = activeUsers.indexOf(socket.id);
            activeUsers.splice(index, 1);
            console.log('aktywni użytkownicy', activeUsers)
         });

    });

}

module.exports = init;