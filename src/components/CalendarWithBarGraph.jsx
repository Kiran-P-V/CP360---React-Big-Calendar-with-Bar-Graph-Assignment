import React, { useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfDay, startOfWeek, isSameDay } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectDate as selectDateAction } from "../store/calendarSlice.js";
import { dummyData } from "../data/dummyData.js";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay: (date) => date.getDay(),
  locales,
});

const DATE_FORMAT = "dd-MM-yyyy";

const parseKeyToDate = (key) => {
  return startOfDay(parse(key, DATE_FORMAT, new Date()));
};

export const CalendarWithBarGraph = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.calendar.selectedDate);

  const events = useMemo(() => {
    return Object.entries(dummyData).map(([dateKey, entries]) => {
      const date = parseKeyToDate(dateKey);
      const total = entries.reduce((sum, item) => {
        const value = Object.values(item)[0] ?? 0;
        return sum + value;
      }, 0);
      return {
        title: `Total: ${total}`,
        start: date,
        end: date,
        allDay: true,
        resource: {
          key: dateKey,
        },
      };
    });
  }, []);

  const selectedKey = useMemo(() => {
    if (!selectedDate) return null;
    const normalized = startOfDay(selectedDate);
    const key = format(normalized, DATE_FORMAT);
    return key;
  }, [selectedDate]);

  const barData = useMemo(() => {
    if (!selectedKey || !dummyData[selectedKey]) return [];
    return dummyData[selectedKey].map((entry) => {
      const [user, value] = Object.entries(entry)[0];
      return {
        user,
        value,
      };
    });
  }, [selectedKey]);

  const hasDataForSelectedDate = !!(selectedKey && dummyData[selectedKey]);

  const handleSelectSlot = ({ start }) => {
    dispatch(selectDateAction(start));
  };

  const handleSelectEvent = (event) => {
    dispatch(selectDateAction(event.start));
  };

  const dayPropGetter = (date) => {
    const normalized = startOfDay(date);
    const key = format(normalized, DATE_FORMAT);

    const isSelected =
      selectedDate && isSameDay(normalized, startOfDay(selectedDate));
    const hasData = !!dummyData[key];

    const classNames = ["rbc-day-bg-custom"];
    if (hasData) {
      classNames.push("has-data");
    }
    if (isSelected) {
      classNames.push("selected");
    }

    return {
      className: classNames.join(" "),
    };
  };

  const formattedSelectedDate = selectedDate
    ? format(startOfDay(selectedDate), "dd MMM yyyy")
    : null;

  return (
    <div className="calendar-wrapper">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        dayPropGetter={dayPropGetter}
        views={["month", "week", "day"]}
      />

      <div className="sidebar">
        <h2>Selected Date Details</h2>
        {selectedDate ? (
          <>
            <p className="selected-date-label">
              Selected Date: <strong>{formattedSelectedDate}</strong>
            </p>
            {hasDataForSelectedDate ? (
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={barData}
                    margin={{ top: 16, right: 16, bottom: 32, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="user" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="no-data-warning">
                No data found for the selected date:{" "}
                <strong>{formattedSelectedDate}</strong>
              </div>
            )}
          </>
        ) : (
          <p>Please click on any date in the calendar to view details.</p>
        )}
      </div>
    </div>
  );
};
