const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const calendarRoutes = require('./routes/calendarRoutes');
const authRoutes = require('./routes/authRoutes');
var cors = require('cors');

// import jwt from 'jsonwebtoken';
// const authRoutes = require('./routes/authRoutes.js');
app.use(express.json());
app.use(cors());
// app.use(express.static('public'));

const dbURI = 'mongodb+srv://sroda_wlkp:0cJaoCz6Xc3Qzlcp@calendar.va1iidg.mongodb.net/Sroda_Wlkp?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((resault) => app.listen(3003))
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

// app.use(authRoutes);
app.listen(3002, () => console.log('server działa'));




// app.post('/register', (req, res) =>
// {
//     const name = req.body.name;
//     const mail = req.body.mail;
//     const password = req.body.password;

//     //check if youser already exist
//     //check if user already didnt register (waiting for approv)
//     //then put him into database
// })

// app.post('/password', (req, res)=>
// {
//     const name = req.body.mail;

//     //does user wait's for password reset?
// });



// app.post('/login', (req, res) =>
// {
//     const user = user.fin (u => u.email === req.body.email);
//     if (!user)
//     {
//         return res.sendStatus(401);
//     }
// })

