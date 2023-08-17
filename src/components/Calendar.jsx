import React, { useState } from "react";
import Header from "./Header";
import DaysOfWeek from "./DaysOfWeek";
import DaysOfMonth from "./DaysOfMonth";
import "./Calendar.scss";
import WeekView from "./WeekView";
import DayView from "./DayView";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeView, setActiveView] = useState("Mes");

  const handleSelectDay = (selectedDate) => {
    setCurrentDate(selectedDate);
    setActiveView("Dia");
  };

  const handleChangeView = (view) => {
    setActiveView(view);
    if (view === 'Dia') setCurrentDate(new Date());
  };

  const handlePreviousMonth = () => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  const handleNextMonth = () => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  const handlePreviousWeek = () => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate() - 7));
  const handleNextWeek = () => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate() + 7));
  const handleCurrentMonth = () => setCurrentDate(new Date());

  const onNextDay = () => {
    setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    });
  };

  const onPreviousDay = () => {
    setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
    });
  };

  return (
    <div className='calendar'>
      <Header
        currentDate={currentDate}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onPreviousDay={onPreviousDay}
        onNextDay={onNextDay}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onCurrentMonth={handleCurrentMonth}
        activeView={activeView}
        onChangeView={handleChangeView}
      />
      {activeView === "Mes" && <DaysOfWeek />}
      {activeView === "Dia" ? (
        <DayView dayDetails={currentDate} />
      ) : activeView === "Mes" ? (
        <DaysOfMonth
          currentDate={currentDate}
          onSelectDay={handleSelectDay}
        />
      ) : (
        <WeekView currentDate={currentDate} />
      )}
    </div>
  );
}

export default Calendar;
