const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const slotSchema = new Schema({
    id: String,
    name: String,
    records: [
      {
        id: String,
        data: String,
      },
    ],
  });
  
  const daySchema = new Schema({
    name: String,
    date: Date,
    id: String,
    slots: [slotSchema],
  });
  
  const weekSchema = new Schema({
    id: String,
    bannedDays: [String],
    days: [daySchema],
  });
  
  const monthSchema = new Schema({
    name: String,
    weeks: [weekSchema],
  });
  
  const calendarSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      date: [Date],
      months: [monthSchema],
      slots: [slotSchema],
      bannedDays: [String],
      autoMonth: {
        type: Boolean,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      messages: [String],
    },
    { timestamps: true }
  );

const Calendar = mongoose.model('calendar', calendarSchema);

const createRecords = (space, id) =>
{
    const records = [];
    for (let i = 0; i < space; i++) {
        records.push({
        id: id + "_" + i.toString(),
        data: ''
      });
    }

    return records
}
const createCalendar = ({name, months, slots, bannedDays, autoMonth, description, time}) => {
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
            const weekId = monthYear.date + "_" + weekIndex.toString();

            const generateTimes = (timeStart, timeEnd, timeBetween) =>
            {
                const times = [];
                let currentTime = timeStart;
                while (currentTime <= timeEnd) {
                times.push(currentTime);
                const [hours, minutes] = currentTime.split(':');
                const currentMinutes = parseInt(hours) * 60 + parseInt(minutes);
                const beetwMinutes = parseInt(timeBetween.split(':')[0]) * 60 + parseInt(timeBetween.split(':')[1]);
                const nextMinutes = currentMinutes + beetwMinutes;
                const nextHours = Math.floor(nextMinutes / 60).toString().padStart(2, '0');
                const nextMinutesRemainder = nextMinutes % 60;
                currentTime = `${nextHours}:${nextMinutesRemainder.toString().padStart(2, '0')}`;
            }
        
            return times;
            }

            const days = week.map((day, dayIndex)=>
            {
                const dayId  = weekId + "_" + dayIndex.toString();

                const createSlots = slots.map((slot, slotIndex)=>
                {
                    const slotId =  dayId + "_" + slotIndex;
                    const slotName = slot.name;
                    const records = createRecords(parseInt(slot.space), slotId);
                    
                    return {id: slotId, name: slotName, records: records}
                })

                return {...day, id:dayId, slots: createSlots}
            })
            return {id: weekId, bannedDays, days: days, time: generateTimes(time.timeFrom, time.timeTo, time.timeBetween)}
        });

        return {
            name: monthYear.date,
            weeks : weeks
        }
    })
    
    return {
        name: name,
        months : renderedMonths,
        bannedDays,
        autoMonth,
        description
    };

   
}

module.exports = {Calendar, createCalendar};
