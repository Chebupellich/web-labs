import { User } from './user.js';
import { Event } from './event.js';

export const setupAssociations = async () => {
    User.hasMany(Event, { sourceKey: 'id', foreignKey: 'createdBy' });
    Event.belongsTo(User, { foreignKey: 'createdBy', as: 'user' });
};
