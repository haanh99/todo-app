import { Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { CommonModule, NgClass } from '@angular/common';
import { TodosService } from '../../sevices/todos.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgClass,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit, OnChanges {
 
  @Input({required: true}) todo!: TodoInterface;
  @Input({required: true}) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
  @ViewChild('textInput') textInput?: ElementRef

  todoService = inject(TodosService);
  editingText: string = '';
  ngOnInit():void {
    this.editingText = this.todo.title
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(()=>{
        this.textInput?.nativeElement.focus();
      }, 0)
    }
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }
  changeTodo(): void {
    this.todoService.changeTodo(this.todo.id, this.editingText);
    this.setEditingId.emit(null);
  }
  setTodo(): void {
    // this.todo.title = this.editingText;
    // this.setEditingId.emit(null);
    // this.editingText = '';
    this.setEditingId.emit(this.todo.id.toString());
  }
  removeTodo(): void {
    this.todoService.removeTodo(this.todo.id);
  }

  toggleTodo(): void {
    this.todoService.toggleTodo(this.todo.id);
  }
}
