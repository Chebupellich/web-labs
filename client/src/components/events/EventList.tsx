import { motion } from 'framer-motion';
import { Categories } from '../../types/event.ts';
import EventCard from '@components/events/EventCard.tsx';

const cardVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
};

const createdBy = {
    id: 1,
    name: 'Events',
    email: 'eventsMail',
};

const testItem = {
    id: 0,
    title: 'Test Item',
    description: 'Super test Item',
    date: new Date(),
    createdAt: new Date(),
    createdBy: createdBy,
    category: Categories.Lecture,
};

const EventList = () => {
    return (
        <>
            {[...Array(20)].map((_, i) => (
                <motion.div key={i} variants={cardVariants}>
                    <EventCard item={{ ...testItem, id: i }} />
                </motion.div>
            ))}
        </>
    );
};
export default EventList;
