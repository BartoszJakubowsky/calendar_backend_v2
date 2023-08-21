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
    expiresIn: 30000,
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
      console.log("err while adding user into register table", err);
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
  const userId = req.params.id;

  UserRegister.findByIdAndDelete(userId)
    .then((result) => res.send(true))
    .catch((err) => {
      console.log("err while removing user from register", err);
      res.send(false);
    });
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
  const userId = req.params.id;
  const user = req.body;
  const newPassword = user.password;

  const updatedFields = { password: newPassword };
  User.findByIdAndUpdate(userId, updatedFields, { new: true }).then(
    (updatedUser) => {
      if (!updatedUser) {
        res.send(false);
        console.log("error while updating password");
      } else {
        UserPassword.findByIdAndDelete(userId)
          .then((result) => res.send(updatedUser))
          .catch((err) => {
            console.log("err while removing user fomr list", err);
            res.send(false);
          });
      }
    }
  );
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
  const userId = req.params.id;
  const user = req.body;

  User.updateOne({ _id: userId }, user)
    .then((result) => res.send(result))
    .catch((err) => {
      console.log("add user erro");
      res.send(false);
    });
};

module.exports.user_updateRecord = (req, res) => {
  const userId = req.body.userId;
  const newRecord = req.date;

  User.findById(userId, (err, user) => {
    if (err) {
      console.log("error while updating record", err);
    }
    const checkRecordExists = () => {
      return user.records.some((record) => record.id === newRecord.id);
    };

    if (checkRecordExists())
      User.updateOne(
        userId,
        { $pull: { records: { id: newRecord.id } } },
        (err, result) => {
          if (err) console.error("err while removing record", err);
        }
      );
    else
      User.updateOne(
        { userId },
        { $push: { records: newRecord } },
        (err, result) => {
          if (err) console.error("err while adding record", err);
        }
      );
  });
};

module.exports.get_user = async (req, res) => {
  const userId = req.params.id;
  const token = req.headers["x-access-token"];
  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      console.log("error while decoding token for get user", err);
      return false;
    }

    const user = decoded.user;
    if (userId !== user._id) return false;
    User.findById(userId)
      .then((response) => res.send(response))
      .catch((err) => {
        console.log("err while getting user", err);
        res.send(false);
      });
  });
};

module.exports.token = (req, res) => {
  const user = req.body;
  const token = createToken(user);
  res.send({ token });
};
