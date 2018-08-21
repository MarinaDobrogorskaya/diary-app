import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() deleted = new EventEmitter<string>();
  constructor() { }
  ngOnInit() {
  }
  onDelete(id) {
    this.deleted.emit(id);
  }
}
