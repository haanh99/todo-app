import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../sevices/todos.service';
import { CommonModule, NgFor } from '@angular/common';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ CommonModule, TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  todoSevice = inject(TodosService);
  editingId: string | null = null;
 
  // todos = this.todoSevice.todoSig();

  visibleTodos = computed(() => {
    const todo = this.todoSevice.todoSig();
    const filter = this.todoSevice.fiterSig();

    if(filter === FilterEnum.active){
      return todo.filter(todo => !todo.completed)
    }else if(filter === FilterEnum.completed){
      return todo.filter(todo => todo.completed)
    }
    return todo;
  });

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  isAllTodoSelected = computed(() => {
    return this.todoSevice.todoSig().every((todo) => todo.completed);
  });
  noTodosClass = computed(()=> this.todoSevice.todoSig().length ===0)
  toggleAllTodo(event : Event): void {
    const target = event.target as HTMLInputElement;
    this.todoSevice.toggleAllTodo(target.checked);
    // this.todoSevice.todoSig().forEach((todo) => todo.completed = target.checked);
  }
}
