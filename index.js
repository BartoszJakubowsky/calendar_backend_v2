const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const calendarRoutes = require('./routes/calendarRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

//for websockets
const server = require("http").Server(app);
const websocket = require("./websockets/websockets");
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

// import jwt from 'jsonwebtoken';
// const authRoutes = require('./routes/authRoutes.js');
app.use(express.json());
app.use(cors());


// app.use(express.static('public'));

const dbURI = 'mongodb+srv://sroda_wlkp:0cJaoCz6Xc3Qzlcp@calendar.va1iidg.mongodb.net/Sroda_Wlkp?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((resault) => 
{
    // app.listen(3003, ()=> console.log('serwer działa na porcie 3003'));
})
.catch(err=> console.log(err))


// app.get('/user/:email', (req, res) => {
//     const email = req.params.email;
//     User.findOne({ mail: email })
//       .then(user => {
//         if (!user) {
//           res.status(404).send('Nie znaleziono użytkownika');
//         } else {
//           res.send(user);
//         }
//       })
//       .catch(err => console.log(err));
//   });

app.get('/', (req, res)=>
{
    res.send('Strona główna');
})

app.use(authRoutes);
app.use('/calendar', calendarRoutes);

app.get('/admin', (req, res) => {
    res.send('Admin');
})


websocket(io);
// app.use(authRoutes);
// server.listen(process.env.PORT || 3002, () => console.log('server działa, port 3002'));
server.listen(3002, () => console.log('server działa, port 3002'));

