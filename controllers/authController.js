require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;
const jwt = require("jsonwebtoken");
const { response } = require("express");
const { UserPassword, UserRegister, User } = require("../models/user");
const { Calendar } = require("../models/calendar");

const getAllData = async () => {
  return Promise.all([User.find(), UserRegister.find(), UserPassword.find()])
    .then((results) => {
      const user = results[0];
      const userRegister = results[1];
      const userPassword = results[2];

      return { user, userRegister, userPassword };
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
const createToken = (user) => {
  const token = jwt.sign({ user }, JWT_KEY, {
    expiresIn: 300000,
    // expiresIn: 300000,
  });

  return token;
};

module.exports.get_all = (req, res) => {
  Promise.all([
    User.find(),
    UserRegister.find(),
    UserPassword.find(),
    Calendar.find(),
  ]).then((results) => {
    const userConfirmed = results[0];
    const userRegister = results[1];
    const userPassword = results[2];
    const calendars = results[3];

    res.send({ userConfirmed, userRegister, userPassword, calendars });
  });
};

module.exports.register_submit = (req, res) => {
  //to change
  const email = req.body.mail;
  User.findOne({ mail: email })
    .then((user) => {
      if (!user) {
        UserRegister.findOne({ mail: email }).then((userRegister) => {
          if (!userRegister) {
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
              records: userRecords,
            });

            registerUser
              .save()
              .then((respond) => res.send({ message: "registerSuccess" }))
              .catch((err) => {
                console.log(err);
                res.send({ message: "error" });
              });
          } else {
            //user register already exist
            res.send({ message: "registerErrorSend" });
          }
        });
      } else {
        //user aLready exists
        res.send({ message: "registerErrorUser" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("error");
    });
};

module.exports.register_add = async (req, res) => {
  const user = req.body;
  const newUser = new User({
    name: user.name,
    mail: user.mail,
    password: user.password,
    permissions: ["user"],
    records: [],
  });
  newUser
    .save()
    .then((newUser) => {
      UserRegister.deleteOne({ _id: user._id })
        .then((result) => res.send(newUser))
        .catch((err) => {
          console.log("err while removing user from register", err);
          res.send(false);
        });
    })
    .catch((err) => {
      console.log("err while adding user from register", err);
      res.send(false);
    });
};

module.exports.register_delete = async (req, res) => {
  const id = req.body.id;

  await UserRegister.findByIdAndDelete(id).catch((err) => {
    console.log(err);
    res.send("Wystąpił problem podczas usuwania prośby o reset hasła");
  });

  try {
    const data = await getAllData();
    res.send({ data: data, message: "Prośba o reset hasła została usunięta" });
  } catch (error) {
    res.send("Wystąpił problem podczas usuwania prośby o reset hasła");
  }
};

module.exports.password_submit = (req, res) => {
  const email = req.body.mail;
  const password = req.body.password;
  Promise.all([
    User.findOne({ mail: email }),
    UserPassword.findOne({ mail: email }),
  ])
    .then((results) => {
      const user = results[0];
      const userPassword = results[1];

      if (user) {
        if (!userPassword) {
          const userName = user.name;
          const userMail = user.mail;
          const userPassword = password;
          const userPermissions = user.permissions;
          const userRecords = user.records;
          const userId = user._id;

          console.log(
            userName,
            userMail,
            userPassword,
            userPermissions,
            userRecords,
            userId
          );
          const newUserPassword = new UserPassword({
            _id: userId,
            name: userName,
            mail: userMail,
            password: userPassword,
            permissions: userPermissions,
            records: userRecords,
          });
          newUserPassword
            .save()
            .then((respond) => res.send({ message: "passwordSuccess" }))
            .catch((err) => {
              console.log(err);
              res.send({ message: "error" });
            });
        } else {
          res.send({ message: "passwordError" });
        }
      } else {
        res.send({ message: "userNotFound" });
      }
    })
    .catch((err) => {
      console.log("database err", err);
      res.send({ message: "error" });
    });
};

module.exports.password_add = async (req, res) => {
  const users = req.body;
  try {
    for (let i = 0; i < users.length; i++) {
      const id = users[i]._id;
      const newPassword = users[i].password;
      const updatedFields = { password: newPassword };
      await User.findByIdAndUpdate(id, updatedFields, { new: true }).then(
        (updatedUser) => {
          if (!updatedUser) return false;
          else {
            UserPassword.findByIdAndDelete(id).catch((err) => console.log(err));
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    return;
  }
  getAllData()
    .then((data) => {
      if (users.length === 1) {
        res.send({ data: data, message: "Nowe hasło zostało zapisane" });
      } else {
        res.send({ data: data, message: "Nowe hasła zostały zapisane" });
      }
    })
    .catch((err) => console.log(err));
  //move from password to register
};

module.exports.password_delete = async (req, res) => {
  const id = req.body.id;

  await UserPassword.findByIdAndDelete(id).catch((err) => {
    console.log(err);
    res.send("Wystąpił problem podczas usuwania prośby o reset hasła");
  });

  try {
    const data = await getAllData();
    res.send({ data: data, message: "Prośba o reset hasła została usunięta" });
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

  const updatedFields = {
    name: userName,
    mail: userMail,
    password: userPassword,
    permissions: userPermissions,
    records: userRecords,
    _id: userId,
  };

  try {
    await User.findByIdAndUpdate(userId, updatedFields, { new: true }).then(
      (updatedUser) => {
        if (!updatedUser) {
          console.log("tylko tu");
          res.send(false);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.send(false);
    return;
  }

  try {
    const data = await getAllData();
    res.send({ data: data, message: "Użytkownik został zaktualizowany" });
  } catch (err) {
    console.log(err);
    res.send(false);
  }
};

module.exports.user_delete = async (req, res) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then((result) => res.send(true))
    .catch((err) => {
      console.log("user delete error", err);
      res.send(false);
    });
};

module.exports.login = (req, res) => {
  const { mail, password } = req.body;
  User.findOne({ mail })
    .then((user) => {
      if (user.password === password) {
        const token = createToken(user);
        res.send({ token, message: "loginSuccess" });
      } else res.send({ token: false, message: "validData" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ auth: false, token: false, message: "userNotFound" });
    });
};

module.exports.user_update = (req, res) => {
  console.log("halo");
  const user = req.body;
  const userId = req.params.id;

  User.updateOne({ _id: userId }, user)
    .then((result) => res.send(result))
    .catch((err) => {
      console.log("add user erro");
      res.send(false);
    });
};

module.exports.token = (req, res) => {
  const user = req.body;
  const token = createToken(user);
  res.send({ token });
};
