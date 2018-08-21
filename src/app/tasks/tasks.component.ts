import {Component, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TaskService} from './task.service';
import {FormControl, Validators} from '@angular/forms';
import {Task} from './task/task';
import {TaskStateShareService} from '../common/task-state-share.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [TaskService]
})
export class TasksComponent implements OnInit {
  private subscription: Subscription;
  public name = new FormControl('', Validators.required);
  public tasks: Task[] = [];
  public sectionHeight: number;
  public selectedTaskId: string;
  constructor(private taskService: TaskService,
              private stateService: TaskStateShareService) { }
  ngOnInit() {
    this.updateTasks();
    this.subscription = this.stateService.taskUpdated$
      .subscribe( id => {
        console.log('TasksComponent > ngOnInit - id: ', id);
        this.updateTasks();
      });
    this.sectionHeight = this.countHeight();
  }
  onAddTask(): void {
    const task = {
      id: Date.now().toString(),
      name: this.name.value,
      comments: []
    };
    this.taskService.addTask(task);
    this.updateTasks();
    this.name.reset();
  }
  onSelectTask(id: string) {
    this.selectedTaskId = id;
    this.stateService.selectTask(id);
    console.log('TasksComponent >  Was selected task: ', id);
  }
  onRemoveTask(id: string): void {
    this.stateService.deleteTask(id);
    this.taskService.removeTask(id);
    this.updateTasks();
  }
  updateTasks(): void {
    this.tasks = this.taskService.getAllTasks();
  }
  // noinspection JSMethodCanBeStatic
  private countHeight(): number {
    const height = document.documentElement.clientHeight;
    const indents = 48; // margins
    return height - indents;
  }
  @HostListener('window:resize')
  onResize() {
    this.sectionHeight = this.countHeight();
  }
}
