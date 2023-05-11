const { UserPassword, UserRegister, User } = require("../models/user");

module.exports.register = (req, res) => 
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
              .then(respond => res.send('Prośba o zajerestrowanie konta została wysłana'))
              .catch(err => console.log(err));
            }
            else
            {
              res.send('Twoja prośba o rejestrację została już wysłana');
            }
          })
          
        } 
        else 
        {
          res.send('Użytkownik z podanym mailem już istnieje!');
        }
      })
      .catch(err => console.log(err));
};

module.exports.login = (req, res) => 
{
     
};


module.exports.password = (req, res) => 
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
          .then(respond => res.send('Prośba o zresetowanie hasła została wysłana'))
          .catch(err => console.log(err));
        }
        else
        {
          res.send('Prośba o zresetowanie hasła została już wysłana')
        }
     }
     else
     {
      res.send('Użytkownik pod tym mailem nie istnieje')
     }
    })
    .catch(err => console.log(err));
};

module.exports.add_user = (req, res) => 
{
  
  const users = req.body;

  for (let i = 0; i < users.length; i++) 
  {
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
              
              newUser.save()
              .then(respond => 
                {
                  UserRegister.deleteOne({_id: userId})
                })
              .catch(err => console.log(err));
            }
            if (users.length === 1)
              res.send('Konto zostało dodane');
            else
              res.send('Konta zostały dodane');
  }


module.exports.add_password = (req, res) => 
{
  //move from password to register
};

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

