import { Calendar, CalendarProps } from "antd";
import { Moment } from "moment";
import { formatDate } from "../utils/formatDate";
import type { Dayjs } from "dayjs";

export interface IEvent {
  author: string;
  guest: string;
  date: string;
  description: string;
}

interface IProps {
  events: IEvent[];
}

function EventCalendar({ events }: IProps) {
  const dateCellRender = (value: Dayjs) => {
    console.log(value.toDate());
    const formatedDate = formatDate(value.toDate());
    const currDayEvents = events.filter((e) => e.date === formatedDate);
    return (
      <div>
        {currDayEvents.map((event, index) => (
          <div key={index}>{event.description}</div>
        ))}
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current) => {
    return dateCellRender(current);
  };

  return <Calendar cellRender={cellRender} />;
}

export default EventCalendar;
