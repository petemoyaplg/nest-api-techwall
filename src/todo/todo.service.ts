import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from 'src/entities/todo.entity';
import { todos } from 'src/todo.db';

@Injectable()
export class TodoService {
  todos: Todo[] = todos;

  updateTodo(id: number, name: string, description: string) {
    const todo = this.getOnTodoById(id);
    todo.name = name ? name : todo.name;
    todo.description = description ? description : todo.description;
    return todo;
  }

  deleteOnTodoById(id: number): Todo {
    const index: number = this.todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      const todo: Todo = this.todos.find((todo) => todo.id === id);
      this.todos = todos.splice(index, 1);
      return todo;
    } else {
      throw new NotFoundException(`le Todo d'id ${id} n'existe pas`);
    }
  }

  getOnTodoById(id: number): Todo {
    return this.todos.find((todo) => todo.id === id);
  }

  addTodo(name: string, description: string): Todo {
    const id: number = todos.length + 1;
    const todo = {
      id,
      name: `${name}${id}`,
      description: `${description}${id}`,
      createdAt: new Date().toLocaleString(),
    };
    this.todos.push(todo);
    return todo;
  }
  getTodo(): Todo[] {
    return this.todos;
  }
}
