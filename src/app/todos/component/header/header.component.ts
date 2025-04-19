import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  todoService = inject(TodosService);
  title = "";

  changeTitle(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.title = target.value
  }

  addTodo(): void {
    this.todoService.addTodo(this.title);
    this.title = "";
  }
}
