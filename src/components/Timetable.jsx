const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

const  Timetable = ({ bookings }) => {
  /*
    Checks every item in the bookings array and returns true as soon as it finds at least one
    booking in the bookings array that matches the condition. If no condition matches, it returns
    false.
  */
  const isSlotBooked = (day, time) => {
    return bookings.some(
      (b) => b.day === day && time >= b.start && time < b.end
    );
  };

  return (
    <div className="timetable-container">
      <table className="timetable">
        <thead>
          <tr>
            <th>Time</th>
            {DAYS.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIMES.map((time) => (
            <tr key={time}>
              <td className="time-col">{time}</td>
              {DAYS.map((day) => {
                const booked = isSlotBooked(day, time);
                return (
                  <td
                    key={day}
                    className={booked ? "slot booked" : "slot free"}
                  >
                    {booked ? "Booked" : "Free"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;