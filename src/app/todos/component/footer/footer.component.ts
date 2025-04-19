import { Component, computed, inject } from '@angular/core';
import { FilterEnum } from '../../types/filter.enum';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgClass,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {


  todoService = inject(TodosService)

  filterSig = this.todoService.filterSig;

  filterEnum = FilterEnum;

  activeCount = computed(() => this.todoService.todosSig().filter(todo => !todo.isCompleted).length);
  itemsLeftText = computed(() => `item${this.activeCount() === 1 ? 's' : ''} left`);


  noTodoClass = computed(() => this.todoService.todosSig().length === 0);
  changeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todoService.changeFilter(filter);
  }
}
