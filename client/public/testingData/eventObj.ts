import { Categories } from '../../src/types/event';

const createdBy = {
    id: 1,
    name: 'Events',
    email: 'eventsMail',
};

const testItem = {
    id: 0,
    title: 'Test Item',
    description:
        'Super test Item askmdna kman n dms smmnd masn ,as nd,amn as da sda sdasdasdafd fds gfsdg fdsg asd asdas das dfg asd',
    date: new Date(),
    createdAt: new Date(),
    createdBy: createdBy,
    category: Categories.Lecture,
};

export { createdBy, testItem };
