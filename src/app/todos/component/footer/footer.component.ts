import { Component, computed, inject } from '@angular/core';
import { FilterEnum } from '../../types/filter.enum';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { TodosService } from '../../sevices/todos.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgClass,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {


  todoService = inject(TodosService)

  filterSig = this.todoService.fiterSig;

  filterEnum = FilterEnum;

  activeCount = computed(() => this.todoService.todoSig().filter(todo => !todo.completed).length);
  itemsLeftText = computed(() => `item${this.activeCount() === 1 ? 's' : ''} left`);


  noTodoClass = computed(() => this.todoService.todoSig().length === 0);
  changeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todoService.changeFilter(filter);
  }
}
