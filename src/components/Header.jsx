import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import EventForm from './EventForm';

function Header({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onPreviousDay,
  onNextDay,
  onPreviousWeek,
  onNextWeek,
  onCurrentMonth,
  activeView,
  onChangeView,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEventSubmit = eventData => {
    console.log(eventData);
    setIsModalOpen(false);
    // Aquí puedes añadir el código para guardar el evento, enviar al backend, etc.
  };
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const monthName = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  let displayDate;
  if (activeView === "Semana") {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    displayDate = `${startOfWeek.getDate()}-${endOfWeek.getDate()} ${
      monthNames[endOfWeek.getMonth()]
    }`;
  } else if (activeView === "Dia") {
    displayDate = `${currentDate
      .toLocaleDateString("es-ES", { weekday: "long" })
      .toUpperCase()} ${currentDate.getDate()} ${monthName} ${year}`;
  } else {
    displayDate = `${
      monthName.charAt(0).toUpperCase() + monthName.slice(1)
    } ${year}`;
  }

  const viewButtons = ["Mes", "Semana", "Dia", "Hoy"];

  return (
    <div className='header'>
      <button
        onClick={() => {
          if (activeView === "Semana") onPreviousWeek();
          else if (activeView === "Dia") onPreviousDay();
          else onPreviousMonth();
        }}
        className='change-month'
      >
        &lt;
      </button>

      <h1>{displayDate}</h1>

      <div
        className='view-buttons'
        style={{ position: "absolute", right: "1rem", top: "1rem" }}
      >
        {viewButtons.map((view, index) => (
          <button
            key={view}
            onClick={view === "Hoy" ? onCurrentMonth : () => onChangeView(view)}
            className={`view-button ${view === activeView ? "active" : ""}`}
            style={{
              borderRadius:
                index === 0
                  ? "1rem 0 0 0"
                  : index === viewButtons.length - 1
                  ? "0 1rem 1rem 0"
                  : 0,
              borderRight:
                index !== viewButtons.length - 1 ? "none" : undefined,
              borderLeft: index !== 0 ? "none" : undefined,
            }}
          >
            {view}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          if (activeView === "Semana") onNextWeek();
          else if (activeView === "Dia") onNextDay();
          else onNextMonth();
        }}
        className='change-month'
      >
        &gt;
      </button>

      <div className='add-event-button' onClick={() => setIsModalOpen(true)}>
        <svg width='36' height='36' viewBox='0 0 36 36'>
          <path fill='#34A853' d='M16 16v14h4V20z'></path>
          <path fill='#4285F4' d='M30 16H20l-4 4h14z'></path>
          <path fill='#FBBC05' d='M6 16v4h10l4-4z'></path>
          <path fill='#EA4335' d='M20 16V6h-4v14z'></path>
          <path fill='none' d='M0 0h36v36H0z'></path>
        </svg>
      </div>

      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Añadir Evento</h2>
            <EventForm setIsModalOpen={setIsModalOpen} onSubmit={handleEventSubmit} />
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Header;
