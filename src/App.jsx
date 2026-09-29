import { useState } from 'react';
import RoomsInfo from './data/rooms.json';

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday"
]

const DAY_ABBR = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri"
};

const TIMES_OF_DAY = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00"
]

function App() {
  const [selectedDetails, setSelectedDetails] = useState({
    day: "Monday",
    time: "09:00"
  })

  const alterSelectedDetails = (e) => {
    setSelectedDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const roomsList = RoomsInfo.rooms;

  const filteredRooms = roomsList.filter((room) => {
    const targetDayAbbr = DAY_ABBR[selectedDetails.day];
    const targetTime = selectedDetails.time;

    const isBooked = room.bookings.some((booking) => {
      return (
        booking.day === targetDayAbbr &&
        targetTime >= booking.start &&
        targetTime < booking.end
      );
    });

    return !isBooked;
  });

  return (
    <>
      <header>
        <h1>Find a free room</h1>
        <p>Pick a day and time to see which computer labs are open.</p>
      </header>

      <main>
        <div className='detailsPicker'>
          <div className="picker">
            <label htmlFor="day">Day</label>
            
            <select name="day" id="day" value={selectedDetails.day} onChange={alterSelectedDetails}>
              {DAYS_OF_WEEK.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div className="picker">
            <label htmlFor="time">Time</label>

            <select name="time" id="time" value={selectedDetails.time} onChange={alterSelectedDetails}>
              {TIMES_OF_DAY.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>

            <p>Current Day: {selectedDetails.day}, Time: {selectedDetails.time}</p>
          </div>
        </div>

        <div>
          <h2>
            {filteredRooms.length} of {roomsList.length} free on {selectedDetails.day}, {selectedDetails.time}
          </h2>

          {filteredRooms.length > 0 ? (
            <ul>
              {filteredRooms.map((room) => (
                <li key={room.id}>
                  <strong>{room.id}</strong> - {room.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No rooms available at this time.</p>
          )}
        </div>
      </main>
    </>
  )
}

export default App
