const Calendar = require('../models/calendar');


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
    const {name, date, time, slots} = req.params.body;
    
    const calendar = new Calendar(
        {
            name,
            date, 
            time, 
            slots
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
    const {name, date, time, slots, id} = req.params.body;

    Calendar.updateOne({_id: id}, {name, date, time, slots})
    .then(result => 
        {
            res.send(result);
        })
    .catch(err => console.log(err));

};

module.exports.calendar_delete = (req, res) => 
{
    const id = req.params.id;

    Calendar.deleteOne({_id: id})
      .then(result => 
        {
        res.send(result);
      })
      .catch(err => console.log(err));
};

