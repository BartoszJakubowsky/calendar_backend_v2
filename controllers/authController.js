require('dotenv').config();
const JWT_KEY = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');
const { response } = require("express");
const { UserPassword, UserRegister, User } = require("../models/user");

const getAllData = async () => {
  return Promise.all([
    User.find(),
    UserRegister.find(),
    UserPassword.find(),
  ])
    .then(results => {
      const user = results[0];
      const userRegister = results[1];
      const userPassword = results[2];

      return { user, userRegister, userPassword };
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};
const createToken = (user) =>
{
  const token = jwt.sign({user}, JWT_KEY, {
    expiresIn: 900,
    expiresIn: 300000,
 })

 return token;
}

module.exports.get_all = (req, res) => 
{
  Promise.all([
    User.find(),
    UserRegister.find(),
    UserPassword.find()
  ])
  .then(results => {
    const user = results[0];
    const userRegister = results[1];
    const userPassword = results[2];

    res.send({user, userRegister, userPassword});
  });
};

module.exports.register_submit = (req, res) => 
{
    //to change
    const email = req.body.mail;
    User.findOne({ mail: email })
      .then(user => {
        if (!user) 
        {
          UserRegister.findOne({ mail: email })
          .then(userRegister =>{
            if (!userRegister)
            {

              const userName = req.body.name;
              const userMail = req.body.mail;
              const userPassword = req.body.password;
              const userPermissions = req.body.permissions;
              const userRecords = req.body.records;
              const registerUser = new UserRegister({
                name: userName, 
                mail: userMail,
                password: userPassword,
                permissions: userPermissions,
                records: userRecords
              });
              
              registerUser.save()
              .then(respond => res.send({message: 'registerSuccess'}))
              .catch(err => {console.log(err); res.send({message: 'error'})});
            }
            else
            {
              //user register already exist
              res.send({message : 'registerErrorSend'});
            }
          })
          
        } 
        else 
        {
          //user aLready exists
          res.send({message : 'registerErrorUser'});
        }
      })
      .catch(err => 
        {
          console.log(err);
          res.send('error');
        });
};

module.exports.register_add = async (req, res) => {
  const users = req.body;

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userName = user.name;
    const userMail = user.mail;
    const userPassword = user.password;
    const userPermissions = user.permissions;
    const userRecords = user.records;
    const userId = user._id;
    const newUser = new User({
      name: userName,
      mail: userMail,
      password: userPassword,
      permissions: userPermissions,
      records: userRecords,
      _id: userId
    });

    try {
      await newUser.save();
      await UserRegister.deleteOne({ _id: userId });
    } catch (err) {
      console.log(err);
    }
  }

  try {
    const data = await getAllData();
    if (users.length === 1) {
      res.send({ data: data, message: 'Użytkownik został zarejestrowany' });
    } else {
      res.send({ data: data, message: 'Użytkownicy zostali zarejestrowani' });
    }
  } catch (err) {
    console.log(err);
  }
};


module.exports.register_delete = async  (req, res) =>
{

  const id = req.body.id;

  await UserRegister.findByIdAndDelete(id)
  .catch(err => 
    {
      console.log(err);
      res.send("Wystąpił problem podczas usuwania prośby o reset hasła");
    })

    try {
      const data = await getAllData();
      res.send({data: data, message: 'Prośba o reset hasła została usunięta'});
    } catch (error) {
      res.send("Wystąpił problem podczas usuwania prośby o reset hasła");
      
    }
};

module.exports.password_submit = (req, res) => 
{
    const email = req.body.mail;
    const password = req.body.password;
    Promise.all([
      User.findOne({ mail: email }),
      UserPassword.findOne({ mail: email })
    ])
    .then(results => {
      const user = results[0];
      const userPassword = results[1];

     if (user)
     {
        if (!userPassword)
        {
          
          const userName = user.name;
          const userMail = user.mail;
          const userPassword = password;
          const userPermissions = user.permissions;
          const userRecords = user.records;
          const userId = user._id;

          console.log(userName, userMail, userPassword, userPermissions, userRecords, userId);
          const newUserPassword = new UserPassword(
          {
            _id: userId,
            name: userName,
            mail: userMail,
            password : userPassword,
            permissions: userPermissions,
            records: userRecords,
          });
          newUserPassword.save()
          .then(respond => res.send({message: 'passwordSuccess'}))
          .catch(err => {console.log(err); res.send({message: 'error'})});
        }
        else
        {
          res.send({message: 'passwordError'})
        }
     }
     else
     {
      res.send({message: 'userNotFound'})
     }
    })
    .catch(err => 
      {
        console.log('database err', err)
        res.send({message: 'error'});
      });
};

module.exports.password_add = async (req, res) => 
{
  const users = req.body;
  try 
  {
    for (let i = 0; i < users.length; i++) 
    {
      
      const id = users[i]._id;
      const newPassword = users[i].password;
      const updatedFields = {password: newPassword}
        await User.findByIdAndUpdate(id, updatedFields, {new:true}).then(updatedUser => 
          {
            if (!updatedUser)
              return false;
            else
            {
              UserPassword.findByIdAndDelete(id).catch(err => console.log(err))
            }
              
          })
    }
}
catch (err) {
  console.log(err);
  return;
}
    getAllData()
    .then(data=>
      {
        if (users.length === 1) {
          res.send({ data: data, message: 'Nowe hasło zostało zapisane' });
        } else {
          res.send({ data: data, message: 'Nowe hasła zostały zapisane' });
        }
      })    
      .catch(err => console.log(err));
  //move from password to register
};

module.exports.password_delete = async (req, res) =>
{
  const id = req.body.id;

  await UserPassword.findByIdAndDelete(id)
  .catch(err => 
    {
      console.log(err);
      res.send("Wystąpił problem podczas usuwania prośby o reset hasła");
    })


    try {
      const data = await getAllData();
      res.send({data: data, message: 'Prośba o reset hasła została usunięta'});
    } catch (error) {
      res.send("Wystąpił problem podczas usuwania prośby o reset hasła");
      
    }
};


module.exports.user_add = async (req, res) => {
    
    const user = req.body;
    const userName = user.name;
    const userMail = user.mail;
    const userPassword = user.password;
    const userPermissions = user.permissions;
    const userRecords = user.records;
    const userId = user._id;
 
    const updatedFields = 
      {
        name: userName,
        mail: userMail,
        password: userPassword,
        permissions: userPermissions,
        records: userRecords,
        _id: userId
      }

    try 
    { 
      await User.findByIdAndUpdate(userId, updatedFields, {new:true}).then(updatedUser => 
        {
          if (!updatedUser)
          {
            console.log('tylko tu')
            res.send(false)
          }
        })
    } catch (err) {
      console.log(err);
      res.send(false);
      return;
    }

  try 
  {
    const data = await getAllData();
    res.send({ data: data, message: 'Użytkownik został zaktualizowany' });
  } catch (err) {
    console.log(err);
    res.send(false);
  }
};


module.exports.user_delete = async  (req, res) =>
{

  const id = req.body.id;

  await User.findByIdAndDelete(id)
  .catch(err => 
    {
      console.log(err);
      res.send(false);
    })

    try {
      const data = await getAllData();
      res.send({data: data, message: 'Użytkownik został usunięty'});
    } catch (error) {
      res.send(false);
      
    }
};

module.exports.login = (req, res) => 
{
      const {mail, password} = req.body;
      User.findOne({ mail })
      .then(user => 
        {
          if (user.password === password)
          {
            const token = createToken(user);
            res.send({token, message: 'loginSuccess'});
          }
          else
            res.send({token: false, message: 'validData'})

        })
      .catch(err=>
        {
          console.log(err);
          res.send({auth: false, token: false, message: 'userNotFound'})
        });
};

module.exports.token = (req, res) =>
{
  const user = req.body;
  const token = createToken(user);
  res.send({token});
}