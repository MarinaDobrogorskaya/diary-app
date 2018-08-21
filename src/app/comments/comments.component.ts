import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Comment} from './comment/comment';
import {Subscription} from 'rxjs';
import {TaskStateShareService} from '../common/task-state-share.service';
import {FormControl, Validators} from '@angular/forms';
import {TaskService} from '../tasks/task.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [TaskService]
})
export class CommentsComponent implements OnInit, OnDestroy {
  public taskId: string;
  public comments: Comment[];
  public sectionHeight: number;
  public text = new FormControl('', Validators.required);
  private selectedTaskSubscription: Subscription;
  private deletedTaskSubscription: Subscription;
  constructor(private stateService: TaskStateShareService,
              private taskService: TaskService) {
  }
  ngOnInit(): void {
    this.selectedTaskSubscription = this.stateService.taskSelected$
      .subscribe(id => {
        console.log('Get id: ', id);
        this.taskId = id;
        this.comments = this.taskService.getTask(id).comments;
      });
    this.deletedTaskSubscription = this.stateService.taskDeleted$
      .subscribe(id => {
        console.log('Delete comments: ', id)
        this.taskId = null;
        this.comments = [];
      });
  }
  onCtrlEnterPressed(event: KeyboardEvent): void {
    if (event.ctrlKey && event.keyCode === 13) {
      this.addComment(this.taskId);
      console.log('win');
    }
    this.comments = this.taskService.getTask(this.taskId).comments;
    this.stateService.updateTask(this.taskId);
  }
  ngOnDestroy() {
    this.selectedTaskSubscription.unsubscribe();
  }
  private addComment (id) {
    const changedTask = this.taskService.getTask(id);
    changedTask.comments.push({
      img: '../../assets/icons/user.png',
      text: this.text.value
    });
    this.taskService.updateTask(id, changedTask);
    this.text.reset();
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
