require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY;
const DB_LOGIN = process.env.DB_LOGIN;
const DB_PASSWORD = process.env.DB_PASSWORD;

const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const calendarRoutes = require('./routes/calendarRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const jwt = require('jsonwebtoken');
//for websockets
const server = require("http").Server(app);
const websocket = require("./websockets/websockets");
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
const verifyJWT = (req, res, next) =>
{
  console.log();
  const token = req.headers['x-access-token'];
  
  if (!token)
  {
    res.status(401).json({ auth: false, message: 'Failed to authenticate' });
    return;
  }
  
  jwt.verify(token, JWT_KEY, (err, decoded) =>
  {
    if (err)
    {
      if (req.originalUrl === '/initial')
      {
        res.send(false);
        return
      }
      
      res.status(401).json({ auth: false, message: 'Failed to authenticate' });
    }
    if (req.originalUrl === '/initial')
    {
      res.send(true)
    }
    req.userId = decoded.id;
    next();
  })

}
// import jwt from 'jsonwebtoken';
// const authRoutes = require('./routes/authRoutes.js');
app.use(express.json());
app.use(cors());
app.use(verifyJWT);


// app.use(express.static('public'));

const dbURI = `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@calendar.va1iidg.mongodb.net/Sroda_Wlkp?retryWrites=true&w=majority`;
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

app.get('/jwt', verifyJWT, (req, res) =>
{
  res.send('you are authenticated');
})

websocket(io);
// app.use(authRoutes);
// server.listen(process.env.PORT || 3002, () => console.log('server działa, port 3002'));
server.listen(3002, () => console.log('server działa, port 3002'));

