var activeUsers = [];
const calendarController = require("../controllers/calendarController");
const authController = require("../controllers/authController");
function init(io) {
  io.on("connection", function (socket) {
    activeUsers.push(socket.id);

    io.to(socket.id).emit("connected", {
      id: socket.id,
    });

    socket.on("updateRecord", function (request) {
      calendarController
        .calendar_sign(request)
        .then((res) => {
          if (res) {
            io.emit("sign", request);
            authController.user_updateRecord(request);
          } else throw new Error();
        })
        .catch((err) =>
          io.to(request.socketId).emit("error while updating record", err)
        );
    });

    socket.on("disconnect", function () {
      const index = activeUsers.indexOf(socket.id);
      activeUsers.splice(index, 1);
    });

    socket.on("conservation", (request) => {
      calendarController.calendar_conservation(request);
      io.emit("conservation", request);
    });
  });
}

module.exports = init;
