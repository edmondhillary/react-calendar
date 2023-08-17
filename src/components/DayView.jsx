import React, { useState } from "react";
import "./WeekView.scss";
import EventForm from "./EventForm";
import { Modal } from "antd";
import Event from "./Event";

function DayView({ dayDetails }) {
  const hours = Array.from({ length: 15 }, (_, index) => index + 8);

  const [showModal, setShowModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [events, setEvents] = useState([]);

  const formattedDate = `${dayDetails
    .toLocaleString("es-ES", { weekday: "long" })
    .toUpperCase()} ${dayDetails.getDate()} de ${dayDetails.toLocaleString(
    "es-ES",
    { month: "long" }
  )} ${dayDetails.getFullYear()}`;

  const handleCellClick = (hour) => {
    setSelectedHour(hour);
    setShowModal(true);
  };

  const handleEventSubmit = (eventData) => {
    const eventHourStart = eventData.startDate.getHours();
    setEvents(prevEvents => ({
      ...prevEvents,
      [eventHourStart]: eventData
    }));
    setShowModal(false);
};

  return (
    <div className='week-view'>
      <table>
        <thead>
          <tr>
            <th className='hour-cell'>Horas</th>
            <th
              style={{
                backgroundColor: "#ffde719c",
                color: "gray",
                fontSize: "15px",
              }}
            >
              <b>{formattedDate}</b>
            </th>
          </tr>
        </thead>
        <tbody>
    {hours.map((hour) => (
        <tr key={hour}>
            <td className='hour-cell'>{hour}:00</td>
            <td className='day-cell' onClick={() => handleCellClick(hour)}>
                {events[hour] ? <Event eventData={events[hour]} /> : null}
            </td>
        </tr>
    ))}
</tbody>

      </table>
      {showModal && (
        <Modal
          title='Agregar Evento'
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={null}
        >
          <EventForm
            onSubmit={handleEventSubmit}
            initialDate={{ day: dayDetails, hour: selectedHour }}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default DayView;
