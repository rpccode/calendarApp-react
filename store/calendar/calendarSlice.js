import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const event = {
    _id: new Date().getTime(),
    title: 'fiesta de cumpleanos ',
    notes: 'hay que comprar todo en el super ',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColors: "#fafafa",
    user: {
        _id: "'123",
        name: 'Rudy'
    }
}
export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            event
        ],
        activeEvent: null,
    },

    reducers: {
        onSendActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload)
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {

                if (event._id === payload._id) {
                    return payload
                }

                return event
            });
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id)
                state.activeEvent = null;
            }

        }
    }
});
export const { onSendActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;