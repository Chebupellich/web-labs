import { User } from './user.js';
import { Event } from './event.js';

export const setupAssociations = async () => {
    User.hasMany(Event, {
        sourceKey: 'id',
        foreignKey: 'createdBy',
        as: 'events',
    });
    Event.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
};
