const { UserPassword, UserRegister, User } = require("../models/user");

module.exports.register = (req, res) => 
{
    //to change
    const email = req.params.email;
    User.findOne({ mail: email })
      .then(user => {
        if (!user) 
        {
          res.send(true);
        } 
        else 
        {
          res.send(false);
        }
      })
      .catch(err => console.log(err));
};

module.exports.login = (req, res) => 
{
     
};


module.exports.password = (req, res) => 
{
    const email = req.params.email;
    const password = req.params.password;
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
          const userId = user._id;

          const newUserPassword = new UserPassword({_id: userId},
          {
            name: userName,
            mail: userMail,
            password
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
  //move from register to user
};

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

