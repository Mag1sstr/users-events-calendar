import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import axios from "axios";
import { IUser } from "./authSlice";
import { IEvent } from "../components/EventCalendar";

interface EventState {
  guests: IUser[];
  events: IEvent[];
}

const initialState: EventState = {
  events: [],
  guests: [],
};
export const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    setGuests(state, action) {
      state.guests = action.payload;
    },
    createEvent(state, action) {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      json.push(action.payload);
      state.events.push(action.payload);
      localStorage.setItem("events", JSON.stringify(json));
    },
  },
});

export function getUsers() {
  return function (dispatch: AppDispatch) {
    axios.get("./users.json").then((resp) => {
      dispatch(setGuests(resp.data));
    });
  };
}

export function getEvents(username: string) {
  return function (dispatch: AppDispatch) {
    const events: IEvent[] = JSON.parse(localStorage.getItem("events")!) || [];
    const currentUserEvents = events.filter(
      (e) => e.author === username || e.guest === username
    );
    dispatch(setEvents(currentUserEvents));
  };
}

export const { setEvents, setGuests, createEvent } = eventSlice.actions;

export default eventSlice.reducer;
