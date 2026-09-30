import { X } from 'lucide-react';
import Timetable from './Timetable';

const RoomModal = ({ room, closeModal }) => {
    return (
        <>
            <div className="overlay" onClick={closeModal}></div>

            <div className="content">
                <div className="container">
                    <div>
                        <h2>{room.id}</h2>
                        <p>Current Room Schedule</p>
                    </div>

                    <X onClick={closeModal}/>
                </div>

                
                <div className='roomTimetable'>
                    <div key={room.id} className="room-card">
                        <h3>{room.id} - {room.name}</h3>
                        <Timetable bookings={room.bookings} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoomModal;