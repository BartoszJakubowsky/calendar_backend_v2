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
        console.log('działa');

        io.to(socket.id).emit('connected', 
        {
           data: 'Pocałunmek w dupala',
            id: socket.id
        });

        socket.on("updateRecord", function(request) 
        {
            calendarController.calendar_sign(request)
            .then(res=>
                {
                    console.log('web',res)
                    if(res)
                        io.emit("sign", request)
                    else
                        throw new Error;
                })
            .catch(err => io.to(socket.id).emit('error'));
        });

        socket.on('disconnect', function() 
        {
            const index = activeUsers.indexOf(socket.id);
            activeUsers.splice(index, 1);
        });

        socket.on('conservation', (request)=>
        {
            const id = request.id;
            const conservation = request.conservation;
        
            calendarController.calendar_conservation(request);
            io.emit('conservation', request);
        })

    });

}

module.exports = init;