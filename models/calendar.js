const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const calendarSchema = new Schema(
    {
        name : {
            type: String,
            required: true
        },
        date : {
            type: Array,
            required: true
        },
        time: {
            type: Object,
            required: true
        },
        slots: {
            type: Array
        },
        bannedDays : {
            type: Array,
            required: true
        },
        autoMonth : {
            type: Boolean,
            require: true
        },
        records: {
            type: Array
        },
        slotMessages :{
            type: Array
        }

    }, {timestamps: true});

const Calendar = mongoose.model('calendar', calendarSchema);
module.exports = Calendar;
