const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema([
  {
    id: String,
    data: String,
    erase: Boolean,
    messages: Array,
  },
]);

const slotSchema = new Schema({
  id: String,
  name: String,
  records: [recordSchema],
  messages: Array,
  erase: Boolean,
});

const columnsSchema = new Schema({
  id: String,
  name: String,
  slots: [slotSchema],
  messages: Array,
  erase: Boolean,
});

const daySchema = new Schema({
  name: String,
  date: Date,
  id: String,
  columns: [columnsSchema],
  erase: Boolean,
  messages: Array,
  indelible: Boolean,
});

const weekSchema = new Schema({
  id: String,
  bannedDays: [String],
  time: Array,
  days: [daySchema],
  messages: Array,
  erase: Boolean,
});

const monthSchema = new Schema({
  name: String,
  weeks: [weekSchema],
  messages: Array,
});

const calendarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    months: [monthSchema],
    autoMonth: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    messages: Array,
    conservation: Boolean,
  },
  { timestamps: true }
);

const Calendar = mongoose.model("calendar", calendarSchema);

const createCalendar = ({
  name,
  months,
  slots,
  bannedDays,
  autoMonth,
  description,
  time,
}) => {
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
    "december",
  ];

  const weekDays = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  const renderMonth = (monthYear) => {
    const name = monthYear;
    const weeks = renderWeeksWithDays(monthYear);
    const messages = [];
    return { name, weeks, messages };
  };

  const renderWeeksWithDays = (monthYear) => {
    const [yearName, monthName] = monthYear.split(".");
    const year = parseInt(yearName, 10);
    const month = monthsNames.indexOf(monthName.toLowerCase());
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let allWeeksInMonth = [];
    let currentWeek = [];

    for (let i = 2; i <= daysInMonth + 1; i++) {
      const date = new Date(year, month, i);
      const dayOfWeek = date.getDay();
      const day = {
        name: weekDays[dayOfWeek],
        date: date,
      };

      currentWeek.push(day);
      if (dayOfWeek === 1 || i === daysInMonth + 1) {
        allWeeksInMonth.push(currentWeek);
        currentWeek = [];
      }
    }
    const weeks = allWeeksInMonth.map((week, index) =>
      renderWeek(week, monthYear, index)
    );
    return weeks;
  };

  const generateTimes = (timeStart, timeEnd, timeBetween) => {
    const times = [];
    let currentTime = timeStart;
    while (currentTime <= timeEnd) {
      times.push(currentTime);
      const [hours, minutes] = currentTime.split(":");
      const currentMinutes = parseInt(hours) * 60 + parseInt(minutes);
      const beetwMinutes =
        parseInt(timeBetween.split(":")[0]) * 60 +
        parseInt(timeBetween.split(":")[1]);
      const nextMinutes = currentMinutes + beetwMinutes;
      const nextHours = Math.floor(nextMinutes / 60)
        .toString()
        .padStart(2, "0");
      const nextMinutesRemainder = nextMinutes % 60;
      currentTime = `${nextHours}:${nextMinutesRemainder
        .toString()
        .padStart(2, "0")}`;
    }

    return times;
  };
  const renderWeek = (week, monthName, index) => {
    const weekID = monthName + "_" + index.toString();
    const _time = generateTimes(time.timeFrom, time.timeTo, time.timeBetween);
    const days = week.map((day, index) => renderDay(day, weekID, index, _time));
    const erase = false;
    const messages = [];
    return { id: weekID, bannedDays, days, time: _time, erase, messages };
  };

  const renderDay = (day, weekID, index, time) => {
    const dayID = weekID + "_" + index.toString();
    const name = day.name;
    const date = day.date;
    const columns = slots.map((slot, index) =>
      renderColumn(slot, dayID, index, time)
    );
    const erase = false;
    const messages = [];
    return { id: dayID, name, date, columns, erase, messages };
  };

  const renderColumn = (slot, dayID, index, time) => {
    const columnID = dayID + "_" + index;
    const name = slot.name;
    const slots = time.map((time, index) => renderSlot(columnID, index, slot));
    const erase = false;
    const messages = [];

    return { id: columnID, name, slots, erase, messages };
  };

  const renderSlot = (columnID, index, slot) => {
    const slotID = columnID + "_" + index;
    const space = parseInt(slot.space);
    const records = Array(space)
      .fill()
      .map((emptyRecord, index) => renderRecord(slotID, index));
    const erase = false;
    const messages = [];

    return { id: slotID, space, name, records, erase, messages };
  };

  const renderRecord = (slotID, index) => {
    const recordID = slotID + "_" + index;
    const data = "";
    const erase = false;
    return { id: recordID, data, erase };
  };

  const calendar = {
    name,
    months: months.map((month) => renderMonth(month.date)),
    description,
    autoMonth,
    conservation: false,
  };

  return calendar;
};

module.exports = { Calendar, createCalendar };
