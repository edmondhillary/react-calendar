import React from "react";

function DaysOfMonth({ currentDate, onPreviousMonth, onNextMonth, onSelectDay }) {
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const today = new Date();

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfMonth = getFirstDayOfMonth(month, year);
  const daysInPreviousMonth = getDaysInMonth(month - 1, year);
  const totalDaysInGrid = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

  const handleClickDay = (day, type) => {
    if (type === "prev-month") {
      onPreviousMonth();
    } else if (type === "next-month") {
      onNextMonth();
    } else if (type === "current-month") {
      onSelectDay(new Date(year, month, day));
    }
  };
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(
      <div
        key={`prev-${i}`}
        data-day={daysInPreviousMonth - firstDayOfMonth + i + 1}
        className="day prev-month"
        onClick={() => handleClickDay(daysInPreviousMonth - firstDayOfMonth + i + 1, "prev-month")}
      />
    );
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      today.getDate() === i &&
      today.getMonth() === month &&
      today.getFullYear() === year;
    days.push(
      <div
        key={i}
        data-day={i}
        className={`day ${isToday ? "today" : ""}`}
        onClick={() => handleClickDay(i, "current-month")}
      />
    );
  }
  for (
    let i = daysInMonth + firstDayOfMonth;
    i < totalDaysInGrid;
    i++
  ) {
    days.push(
      <div
        key={`next-${i}`}
        data-day={i - (daysInMonth + firstDayOfMonth) + 1}
        className="day next-month"
        onClick={() => handleClickDay(i - (daysInMonth + firstDayOfMonth) + 1, "next-month")}
      />
    );
  }

  return <div className="days-of-month">{days}</div>;
}

export default DaysOfMonth;

