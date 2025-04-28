import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { IUser } from "../store/authSlice";
import { useState } from "react";
import { IEvent } from "./EventCalendar";
import { Moment } from "moment";
import { formatDate } from "../utils/formatDate";
import { useAppSelector } from "../store/store";

interface IProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}
function EventForm({ guests, submit }: IProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [event, setEvent] = useState<IEvent>({
    author: "",
    date: "",
    description: "",
  } as IEvent);

  function submitForm() {
    submit({ ...event, author: user!.username });
    // setEvent({ ...event, author: user!.username });
    // console.log(event);
  }

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Описание события"
        name="description"
        rules={[{ required: true, message: "Введите описание" }]}
      >
        <Input
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Дата события"
        name="date"
        rules={[{ required: true, message: "Укажите дату" }]}
      >
        <DatePicker
          onChange={(date) =>
            setEvent({ ...event, date: formatDate(date.toDate()) })
          }
        />
      </Form.Item>
      <Form.Item
        label="Выберите гостя"
        name="select"
        rules={[{ required: true, message: "Выберите гостя" }]}
      >
        <Select
          onChange={(guest) => setEvent({ ...event, guest: guest })}
          options={guests.map((item) => ({
            value: item.username,
            label: item.username,
          }))}
        />
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}

export default EventForm;
