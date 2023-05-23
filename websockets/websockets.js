//database emulator
var activeUsers = [];
const uuidv4 = require('uuidv4');
const calendarController = require('../controllers/calendarController');
function init(io) {
    
      
    io.on("connection", function(socket) 
    {   
        
        // const userId = uuidv4();
        // activeUsers[userId] = socket;
        activeUsers.push(socket.id);

        io.to(socket.id).emit('connected', 
        {
           data: 'Pocałunmek w dupala',
            id: socket.id
        });

        socket.on("message", function(request) 
        {
            io.emit("sign", request);
            
            calendarController.calendar_sign(request.message);
        });

        socket.on('disconnect', function() 
        {
            const index = activeUsers.indexOf(socket.id);
            activeUsers.splice(index, 1);
         });

    });

}

module.exports = init;