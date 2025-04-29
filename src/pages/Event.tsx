import { Button, Input, Modal, Row } from "antd";
import EventCalendar, { IEvent } from "../components/EventCalendar";
import { useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import { useAppDispatch, useAppSelector } from "../store/store";
import { createEvent, getEvents, getUsers } from "../store/eventSlice";

function Event() {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { guests, events } = useAppSelector((state) => state.event);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getEvents(user!.username));
  }, []);

  function addNewEvent(event: IEvent) {
    dispatch(createEvent(event));
    setOpenModal(false);
  }
  console.log(events);

  return (
    <div>
      <Modal
        title="Добавить событие"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={false}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={() => setOpenModal(true)}>Добавить событие</Button>
      </Row>
    </div>
  );
}

export default Event;
