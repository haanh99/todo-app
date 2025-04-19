import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
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
    const todo = this.todoSevice.todosSig();
    const filter = this.todoSevice.filterSig();

    if(filter === FilterEnum.active){
      return todo.filter(todo => !todo.isCompleted)
    }else if(filter === FilterEnum.completed){
      return todo.filter(todo => todo.isCompleted)
    }
    return todo;
  });

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  isAllTodoSelected = computed(() => {
    return this.todoSevice.todosSig().every((todo) => todo.isCompleted);
  });
  noTodosClass = computed(()=> this.todoSevice.todosSig().length ===0)
  toggleAllTodo(event : Event): void {
    const target = event.target as HTMLInputElement;
    this.todoSevice.toggleAll(target.checked);
    // this.todoSevice.todoSig().forEach((todo) => todo.completed = target.checked);
  }
}
