require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY;
const DB_LOGIN = process.env.DB_LOGIN;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const calendarRoutes = require('./routes/calendarRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
//for websockets
const server = require("http").Server(app);
const websocket = require("./websockets/websockets");
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
app.use(express.json());
app.use(cors());
 

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     console.log('otrzymany get');
//     return express.static(path.join(__dirname, 'build'))(req, res, next);
//   }
//   // next();
// });

app.use(express.static(path.join(__dirname, 'build')));
const routesToPassWithoutJWT = ['/login', '/logowanie', '/password/submit', '/register/submit']
const knownRoutes = ['/login', '/logowanie', '/password/submit', '/register/submit']
const verifyJWT = (req, res, next) =>
{ 

  if(req.method === 'GET')
  {
    next();
    return;
  }


  if(routesToPassWithoutJWT.includes(req.originalUrl))
  {
    next();
    return;
  }

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
      res.status(401).json({ auth: false, message: 'Failed to authenticate' });
      return;
    }
    // const decodedToken = jwt.decode(token);
    // const currentTime = Math.floor(Date.now() / 1000); 
    // const expiresIn = decodedToken.exp - currentTime; 

    // req.id = decoded.user.id;
    next();
  })

}
// import jwt from 'jsonwebtoken';
// const authRoutes = require('./routes/authRoutes.js');

app.use(verifyJWT);

// app.use(express.static('public'));

const dbURI = `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@calendar.va1iidg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((resault) => 
{
    // app.listen(3003, ()=> console.log('serwer działa na porcie 3003'));
})
.catch(err=> console.log(err))

app.use(authRoutes);
app.use('/calendar', calendarRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

websocket(io);
// app.use(authRoutes);
// server.listen(process.env.PORT || 3002, () => console.log('server działa, port 3002'));
server.listen(process.env.PORT || 3000, () => console.log('server działa, domyślnie port 3000'));

