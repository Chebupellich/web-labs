import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventSendDTO, IEvent } from '@myTypes/event.ts';
import {
    createEvent,
    deleteEvent as deleteEventApi,
    getEvents,
    updateEvent as updateEventApi,
} from '@api/eventService.ts';

import { RootState } from '@store/store.ts';
import { checkAxiosError } from '@api/axios.ts';
import { AxiosError } from 'axios';

interface EventsState {
    events: IEvent[];
    loading: boolean;
    error: string | null;
}

const initialState: EventsState = {
    events: [],
    loading: false,
    error: null,
};

export const fetchEvents = createAsyncThunk<IEvent[], undefined>(
    'events/getEvents',
    async (_, { rejectWithValue }) => {
        try {
            return await getEvents();
        } catch (e) {
            checkAxiosError(e as AxiosError);
            return rejectWithValue('Error when fetching events');
        }
    }
);

export const addEvent = createAsyncThunk<
    IEvent,
    EventSendDTO,
    { rejectValue: string }
>('events/addEvent', async (newEvent, { rejectWithValue }) => {
    try {
        return await createEvent(newEvent);
    } catch (e) {
        checkAxiosError(e as AxiosError);
        return rejectWithValue('Error when create event');
    }
});

export const updateEvent = createAsyncThunk<
    IEvent,
    IEvent,
    { state: RootState; rejectValue: string }
>('events/updateEvent', async (eventData, { rejectWithValue }) => {
    try {
        return await updateEventApi(eventData);
    } catch (e) {
        checkAxiosError(e as AxiosError);
        return rejectWithValue('Error when update event');
    }
});

export const deleteEvent = createAsyncThunk(
    'events/deleteEvent',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const result = await deleteEventApi(id);
            return { id: id, result: result };
        } catch (e) {
            checkAxiosError(e as AxiosError);
            return rejectWithValue('Error when delete event');
        }
    }
);

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<IEvent[]>) => {
            state.events = action.payload;
        },
        clearEvents: (state) => {
            state.events = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchEvents.fulfilled,
                (state, action: PayloadAction<IEvent[]>) => {
                    state.loading = false;
                    state.events = action.payload;
                }
            )
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as string) ?? 'Ошибка при загрузке событий';
            });
        builder.addCase(
            addEvent.fulfilled,
            (state, action: PayloadAction<IEvent>) => {
                const event = action.payload;
                state.events.unshift(event);
            }
        );
        builder
            .addCase(updateEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateEvent.fulfilled,
                (state, action: PayloadAction<IEvent>) => {
                    state.loading = false;
                    const updatedEvent = action.payload;
                    const index = state.events.findIndex(
                        (event) => event.id === updatedEvent.id
                    );
                    if (index !== -1) {
                        state.events[index] = {
                            ...state.events[index],
                            ...updatedEvent,
                        };
                    }
                }
            )
            .addCase(updateEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(deleteEvent.fulfilled, (state, action) => {
                const { result, id } = action.payload;
                if (result.status === 200) {
                    const index = state.events.findIndex(
                        (event) => event.id === id
                    );
                    if (index !== -1) {
                        state.events.splice(index, 1);
                    }
                }
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as string) ?? 'Ошибка при удалении события';
            });
    },
});

export const { setEvents, clearEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
