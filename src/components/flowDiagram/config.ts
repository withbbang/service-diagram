import Event from './event/Event';
import eventIcon from './event/icon';
import Task from './task/Task';
import taskIcon from './task/icon';

const config = {
  entityTypes: {
    Task: {
      width: 125,
      height: 75
    },
    Event: {
      width: 50,
      height: 50
    }
  },
  gridSize: 25
};

const customEntities = {
  Task: {
    component: Task,
    icon: taskIcon
  },
  Event: {
    component: Event,
    icon: eventIcon
  }
};

export { config, customEntities };
