import React from 'react';

function DaysOfWeek() {
  const daysFull = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const daysShort = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

  return (
    <div className="days-of-week">
      {daysFull.map((day, index) => (
        <div key={index} className="day-of-week">
          <span className="full">{day}</span>
          <span className="short">{daysShort[index]}</span>
        </div>
      ))}
    </div>
  );
}

export default DaysOfWeek;
