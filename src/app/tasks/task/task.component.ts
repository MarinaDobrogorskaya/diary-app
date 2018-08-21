import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: Task;
  @Output() deleted = new EventEmitter<string>();
  constructor() { }
  onDelete(id) {
    this.deleted.emit(id);
  }
}
