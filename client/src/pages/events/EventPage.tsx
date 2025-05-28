import styles from './eventPageStyles.module.scss';
import UsersMenu from '@components/general/UsersMenu.tsx';
import { AnimatePresence } from 'framer-motion';
import EventMenu from '@components/general/EventMenu.tsx';
import EventCard from '@components/events/EventCard.tsx';
import { useEffect, useState } from 'react';
import { IEvent, EventSendDTO } from '@myTypes/event';
import { useDragLayer } from 'react-dnd';
import CardDeleteTarget from '@components/events/CardDeleteTarget.tsx';
import DeleteEventModal from '@components/modals/DeleteEventModal.tsx';
import CreateEventModal from '@components/modals/CreateEventModal.tsx';

import { useDispatch, useSelector } from 'react-redux';
import {
    fetchEvents,
    deleteEvent,
    updateEvent,
    addEvent,
} from '@store/slices/eventsSlice.ts';
import type { AppDispatch, RootState } from '@store/store.ts';

const EventPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isButtonActive = useSelector(
        (state: RootState) => state.ui.showUsersMenu
    );
    const activeCategories = useSelector(
        (state: RootState) => state.ui.activeCategories
    );

    const { isDragging, itemType } = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
        itemType: monitor.getItemType(),
    }));

    const [showDeleteTarget, setShowDeleteTarget] = useState(false);
    const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<IEvent | undefined>();
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>();
    const [isMobile, setIsMobile] = useState(false);

    const { events, loading } = useSelector((state: RootState) => state.events);

    // Handle mobile resize
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    useEffect(() => {
        let attempts = 0;
        let intervalId: NodeJS.Timeout;

        if (events.length === 0) {
            intervalId = setInterval(() => {
                if (attempts >= 5) {
                    clearInterval(intervalId);
                    return;
                }
                dispatch(fetchEvents());
                attempts++;
            }, 2000);

            return () => clearInterval(intervalId);
        }
    }, [events.length, dispatch]);

    useEffect(() => {
        setShowDeleteTarget(isDragging && itemType === 'EVENT_ITEM');
    }, [isDragging, itemType]);

    const showEditModal = (event: IEvent) => {
        if (event.id === selectedEvent?.id && showEditEventModal) {
            setShowEditEventModal(false);
            setSelectedEvent(undefined);
        } else {
            setShowEditEventModal(true);
            setSelectedEvent(event);
        }
    };

    const handleSave = (updated: IEvent) => {
        if (!selectedEvent) return;
        dispatch(updateEvent(updated));
        setShowEditEventModal(false);
        setSelectedEvent(undefined);
    };

    const handleRemove = (event?: IEvent) => {
        if (!event) return;
        dispatch(deleteEvent({ id: event.id }));
        setShowEditEventModal(false);
        setSelectedEvent(undefined);
    };

    const handleCreateEvent = (event: EventSendDTO) => {
        dispatch(addEvent(event));
        setShowCreateEventModal(false);
    };

    return (
        <div className={styles.eventContainer}>
            <AnimatePresence mode="wait">
                {isButtonActive && (
                    <div
                        className={
                            isMobile ? styles.usersMenuMobileOverCenter : ''
                        }
                    >
                        <UsersMenu />
                    </div>
                )}
            </AnimatePresence>

            <div className={styles.eventCenterWrap}>
                <div className={styles.eventWrap}>
                    <div
                        className={styles.addEventWrap}
                        onClick={() => setShowCreateEventModal(true)}
                    >
                        <div className={styles.addEvent}>
                            <svg
                                className={styles.plusIcon}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                        </div>
                    </div>

                    {!loading &&
                        events
                            .filter(
                                (e) =>
                                    activeCategories.length === 0 ||
                                    activeCategories.includes(e.category)
                            )
                            .map((event) => (
                                <EventCard
                                    key={'eventCard' + event.id}
                                    item={event}
                                    isOpen={showEditEventModal}
                                    events={selectedEvent}
                                    onClick={() => showEditModal(event)}
                                />
                            ))}
                </div>
            </div>

            {showDeleteTarget && (
                <CardDeleteTarget
                    key={'deleteEventCardDnd'}
                    onDrop={(event: IEvent) => {
                        setEventToDelete(event);
                        setShowDeleteEventModal(true);
                    }}
                />
            )}

            <AnimatePresence mode="wait">
                {showEditEventModal && selectedEvent && (
                    <div
                        className={
                            isMobile ? styles.usersMenuMobileOverCenter : ''
                        }
                    >
                        <EventMenu
                            event={selectedEvent}
                            onClose={() => showEditModal(selectedEvent!)}
                            onDelete={handleRemove}
                            onSave={handleSave}
                            onRequestDelete={(event) => {
                                setEventToDelete(event);
                                setShowDeleteEventModal(true);
                            }}
                        />
                    </div>
                )}
            </AnimatePresence>

            <DeleteEventModal
                event={eventToDelete}
                isOpen={showDeleteEventModal}
                onClose={() => {
                    setShowDeleteEventModal(false);
                    setEventToDelete(undefined);
                }}
                onConfirm={() => {
                    handleRemove(eventToDelete);
                    setShowDeleteEventModal(false);
                    setEventToDelete(undefined);
                }}
            />

            <CreateEventModal
                isOpen={showCreateEventModal}
                onClose={() => setShowCreateEventModal(false)}
                onConfirm={handleCreateEvent}
            />
        </div>
    );
};

export default EventPage;
