import styles from './eventPageStyles.module.scss';
import UsersMenu from '@components/general/UsersMenu.tsx';
import { useUsersMenuContext } from '@contexts/hooks/useUsersMenuContext.ts';
import { AnimatePresence } from 'framer-motion';
import EventMenu from '@components/general/EventMenu.tsx';

import EventCard from '@components/events/EventCard.tsx';
import { useEffect, useState } from 'react';
import { EventSendDTO, IEvent } from '@myTypes/event';
import { useDragLayer } from 'react-dnd';
import CardDeleteTarget from '@components/events/CardDeleteTarget.tsx';
import DeleteEventModal from '@components/modals/DeleteEventModal.tsx';
import CreateEventModal from '@components/modals/CreateEventModal.tsx';
import { useEventFilter } from '@contexts/hooks/useEventFilter';
import {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent,
} from '@api/eventService.ts';
import { checkAxiosError } from '@api/axios.ts';

const EventPage = () => {
    const { isButtonActive } = useUsersMenuContext();
    const { activeCategories } = useEventFilter();
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
    const [events, setEvents] = useState<IEvent[]>();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        handleGetEvents();
    }, []);

    useEffect(() => {
        if (events && events.length === 0) {
            const intervalId = setInterval(() => {
                handleGetEvents();
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [events]);

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

    const handleGetEvents = () => {
        getEvents()
            .then((resp) => setEvents(resp))
            .catch((err) => checkAxiosError(err));
    };

    const handleSave = (updated: IEvent) => {
        if (!selectedEvent) return;

        updateEvent(updated)
            .then(() => {
                setEvents((prev) =>
                    prev?.map((event) =>
                        event.id === selectedEvent!.id
                            ? {
                                  ...event,
                                  ...updated,
                              }
                            : event
                    )
                );

                setShowEditEventModal(false);
                setSelectedEvent(undefined);
            })
            .catch((err) => checkAxiosError(err));
    };

    const handleRemove = (dropEvent: IEvent | undefined) => {
        if (!dropEvent) return;

        deleteEvent(dropEvent.id)
            .then(() => {
                setEvents((prev) => {
                    const exists = prev?.some(
                        (event) => event.id === dropEvent.id
                    );
                    if (!exists) return prev;
                    return prev?.filter((event) => event.id !== dropEvent.id);
                });

                setShowEditEventModal(false);
                setSelectedEvent(undefined);
            })
            .catch((err) => checkAxiosError(err));
    };

    const handleCreateEvent = (event: EventSendDTO) => {
        createEvent(event)
            .then((resp) => {
                setEvents((prev) => [resp, ...(prev ?? [])]);
                setShowCreateEventModal(false);
            })
            .catch((err) => checkAxiosError(err));
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
                    {events
                        ?.filter(
                            (e) =>
                                activeCategories.size === 0 ||
                                activeCategories.has(e.category)
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
                onConfirm={(event) => handleCreateEvent(event)}
            />
        </div>
    );
};

export default EventPage;
