import { Todo } from './entities/todo.entity';

export const todos: Todo[] = [
  {
    id: 1,
    name: 'todo1',
    description: 'plg1',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 2,
    name: 'todo2',
    description: 'plg2',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 3,
    name: 'todo3',
    description: 'plg3',
    createdAt: new Date().toLocaleString(),
  },
  {
    id: 4,
    name: 'todo4',
    description: 'plg4',
    createdAt: new Date().toLocaleString(),
  },
];
