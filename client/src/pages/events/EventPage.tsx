import styles from './eventPageStyles.module.scss';
import UsersMenu from '@components/general/UsersMenu.tsx';
import { useUsersMenuContext } from '@contexts/UsersMenuContext.tsx';
import { AnimatePresence } from 'framer-motion';
import EventMenu from '@components/general/EventMenu.tsx';

import EventCard from '@components/events/EventCard.tsx';
import { useEffect, useState } from 'react';
// @ts-ignore
import { Categories, EventDTO, IEvent } from '@types/event.ts';
import { testItem } from '../../../public/testingData/eventObj.ts';
import { useDragLayer } from 'react-dnd';
import CardDeleteTarget from '@components/events/CardDeleteTarget.tsx';
import DeleteEventModal from '@components/modals/DeleteEventModal.tsx';
import CreateEventModal from '@components/modals/CreateEventModal.tsx';
import { randInt } from 'three/src/math/MathUtils';

const EventPage = () => {
    const { isButtonActive } = useUsersMenuContext();
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

    const [events, setEvents] = useState<IEvent[]>(
        [...Array(20)].map((_, i) => ({
            ...testItem,
            id: i,
            title: `Event ${i}`,
            category: i % 2 == 0 ? Categories.Lecture : Categories.Concert,
        }))
    );

    useEffect(() => {
        setShowDeleteTarget(isDragging && itemType === 'EVENT_ITEM');
    }, [isDragging]);

    const showEditModal = (event: IEvent) => {
        if (event.id === selectedEvent?.id && showEditEventModal) {
            setShowEditEventModal(false);
            setSelectedEvent(undefined);
        } else {
            setShowEditEventModal(true);
            setSelectedEvent(event);
        }
    };

    const handleSave = (updated: {
        title: string;
        description?: string;
        date: Date;
        category: Categories;
    }) => {
        if (!selectedEvent) return;

        setEvents((prevEvents) =>
            prevEvents.map((event) =>
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
    };

    const handleRemove = (dropEvent: IEvent | undefined) => {
        if (!dropEvent) return;

        setEvents((prev) => {
            const exists = prev.some((event) => event.id === dropEvent.id);
            if (!exists) return prev;
            return prev.filter((event) => event.id !== dropEvent.id);
        });

        setShowEditEventModal(false);
        setSelectedEvent(undefined);
    };

    const handleCreateEvent = (event: EventDTO) => {
        const ev = { ...event, id: randInt(0, 19999) };
        setEvents((prevEvents) => [ev, ...prevEvents]);
        setShowCreateEventModal(false);
    };

    return (
        <div className={styles.eventContainer}>
            <AnimatePresence mode="wait">
                {isButtonActive && <UsersMenu />}
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
                    {events.map((event) => (
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
