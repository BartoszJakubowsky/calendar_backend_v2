const {Calendar, createCalendar} = require('../models/calendar');
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
    const {name, months, slots, bannedDays, autoMonth, description, time} = req.body;

    const newCalendar = createCalendar({name, months, slots, bannedDays, autoMonth, description, time});

    const calendar = new Calendar(
        {
            name: newCalendar.name,
            months : newCalendar.months,
            bannedDays : newCalendar.months,
            autoMonth : newCalendar.autoMonth,
            description : newCalendar.description
        }
    )
    calendar.save()
    .then(result => 
        {
        res.send({data: result, message: 'apiSuccess'})
        })
    .catch(err => 
        {
            console.log(err);
            res.send({message: 'apiError'})
        })
};



module.exports.calendar_edit = (req, res) => 
{
    const {name, date, time, slots, bannedDays, autoMonth,slotMessages, _id} = req.body;
    Calendar.updateOne({_id}, {name, date, time, slots, bannedDays, autoMonth, slotMessages})
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


module.exports.calendar_conservation = async (conservation) =>
{
    const _id = conservation.id;
    const conservationBoolean = conservation.conservation;
    Calendar.updateOne({_id}, {$set : {'conservation' :  conservationBoolean}}).catch(err => console.log('conservation',err))
}
module.exports.calendar_sign = async (record) => 
{
    
    const newData = record.data;
    // const [monthName, weekIndex, dayIndex, slotIndex, recordIndex] = record.recordID.split('_');
    // const weekID = monthName + "_" + weekIndex;
    // const dayID = weekID + "_" + dayIndex;
    // const slotID = dayID + "_" + slotIndex;
    // const recordID = slotID + "_" + recordIndex;

        return Calendar.updateOne(
            { "_id": record.calendarID, 'months.weeks.days.columns.slots.records.id':record.recordID },
            { $set: { "months.$[].weeks.$[].days.$[].columns.$[].slots.$[].records.$[record].data": record.data }},
            { arrayFilters: [{ 'record.id': record.recordID }]}
        )
        .then(result => {
            console.log(result);
            if (result.modifiedCount === 0)
                return false
            else
          return record;
        })
        .catch(err => {
          console.log('err', err);
        });
      

}