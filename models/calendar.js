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
        months : {
            type: Array,
            required : true
        },
        slots: {
            type: Array,
            required : true
        },
        bannedDays : {
            type: Array,
        },
        autoMonth : {
            type: Boolean,
            required: true,
        },
        messages :{
            type: Array
        }

    }, {timestamps: true});

const Calendar = mongoose.model('calendar', calendarSchema);

const createRecords = (space, id) =>
{
    const records = [];
    for (let i = 0; i < space; i++) {
        records.push({
        id: id + space.toString(),
        data: ''
      });
    }

    return records
}
const createCalendar = ({name, months, slots, bannedDays, autoMonth}) => {
    const monthsNames = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
        ]

    const weekDays = [
        "saturday",
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday"
        ];
    const renderedMonths  = months.map((monthYear, monthIndex)=>
    {
        const [yearName, monthName] = monthYear.date.split('.');
        const year = parseInt(yearName, 10);
        const month = monthsNames.indexOf(monthName.toLowerCase());
        const daysInMonth = new Date(year, month+1, 0).getDate();
        const {timeFrom, timeTo, timeBetween} = monthYear.time;


        let allWeeksInMonth = [];
        let currentWeek = [];

        for (let i = 2; i <= daysInMonth+1; i++) 
        {
            const date = new Date(year, month, i);
            const dayOfWeek = date.getDay();
            const day = 
            {
                name: weekDays[dayOfWeek],
                date: date
            };

            currentWeek.push(day)
            if (dayOfWeek === 1 || i === daysInMonth +1) 
            {
                allWeeksInMonth.push(currentWeek);
                currentWeek = [];
            }
        }




        const weeks = allWeeksInMonth.map((week, weekIndex) => {
            const weekId = monthName.date + "_" + weekIndex.toString();

            
            const days = week.map((day, dayIndex)=>
            {
                const dayId  = weekId + "_" + dayIndex.toString();

                const createSlots = slots.map((slot, slotIndex)=>
                {
                    const slotId =  dayId + "_" + slotIndex;
                    const records = createRecords(parseInt(slot.space), slotId);
                    
                    return {id: slotId, slots: records}
                })

                return {...day, id:dayId, slots: createSlots}
            })
            return {id: weekId, days: days}
        });

        return {
            name: monthYear.date,
            weeks : weeks
        }
    })
    




    return {
        name: name,
        months : renderedMonths
    };




    // return new Calendar(
    //     {
    //         name, 
    //         slots,
    //         records,
    //         bannedDays,
    //         autoMonth
    //     }
    // )
}

module.exports = {Calendar, createCalendar};
