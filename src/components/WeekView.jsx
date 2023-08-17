import { Modal } from "antd";
import React, { useState } from "react";
import Event from "./Event";
import EventForm from "./EventForm";
import "./WeekView.scss";

function WeekView({ currentDate }) {
  const startOfWeek = new Date(currentDate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [events, setEvents] = useState([]);

  startOfWeek.setDate(
    startOfWeek.getDate() -
      (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1)
  );

  const hours = Array.from({ length: 15 }, (_, index) => index + 8);
  const days = Array.from(
    { length: 7 },
    (_, index) => new Date(startOfWeek.getTime() + index * 24 * 60 * 60 * 1000)
  );

  const handleCellClick = (day, hour) => {
    setSelectedDateTime({ day, hour });
    setIsModalOpen(true);
  };

  const handleEventSubmit = eventData => {
    setEvents(prevEvents => [...prevEvents, eventData]);
    setIsModalOpen(false);
  };

  return (
    <div className='week-view'>
      <table>
        <thead>
          <tr>
            <th>Horas</th>
            {days.map((day) => (
              <th
                key={day}
              >
                {day.toLocaleString('es-ES', { weekday: 'short' }).toUpperCase()} {day.getDate()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td className='hour-cell'>{hour}:00</td>
              {days.map((day, dayIndex) => {
                const eventForThisCell = events.find(event => 
                    new Date(event.startDate).toDateString() === day.toDateString() &&
                    new Date(event.startDate).getHours() === hour
                );
                return (
                    <td 
                        key={dayIndex} 
                        className='day-cell' 
                        onClick={() => handleCellClick(day, hour)}
                    >
                        {eventForThisCell 
                            ? <Event eventData={eventForThisCell} /> 
                            : ''}
                    </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <EventForm
          initialDate={selectedDateTime}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleEventSubmit}
        />
      </Modal>
    </div>
  );
}

export default WeekView;