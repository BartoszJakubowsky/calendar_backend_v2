const Calendar = require('../models/calendar');
const { UserPassword, UserRegister, User } = require("../models/user");

module.exports.calendar_get = (req, res) => 
{
    Calendar.find()
    .then((result) => 
    {
        res.send(result);

    }).catch((err) => 
    {
        console.log(err);    
    });
};

module.exports.calendar_create = (req, res) => 
{
    const {name, date, time, slots} = req.body;
    
    const calendar = new Calendar(
        {
            name,
            date, 
            time, 
            slots,
            records: []
        }
    )

    calendar.save()
    .then(result => 
        {
            res.send(result)
        })
    .catch(err => console.log(err))
};



module.exports.calendar_edit = (req, res) => 
{
    const {name, date, time, slots, _id} = req.body;
    Calendar.updateOne({_id}, {name, date, time, slots})
    .then(result => 
        {
            res.send(true);
        })
    .catch(err => 
        {
            console.log(err);
            res.send(false);
        });

};

module.exports.calendar_delete = (req, res) => 
{

    const id = req.params.id;

    Calendar.deleteOne({_id: id})
      .then(result => 
        {
        res.send(true);
      })
      .catch(err => 
        {
            console.log(err);
            res.send(false);
        });
      
};



module.exports.data_all = (req, res) => 
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

module.exports.calendar_sign = (record) => 
{
  const {calendarID} = record;
  Calendar.updateOne({_id : calendarID}, 
      {
          $push:{records: record}
      })
  .then(result => 
      {
      })
  .catch(err => 
      {
          console.log(err);
          return false;
      });
}