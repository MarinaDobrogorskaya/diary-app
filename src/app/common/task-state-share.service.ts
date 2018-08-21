import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class TaskStateShareService {

  private taskSelectedSource = new Subject<string>();
  private taskUpdatedSource = new Subject<string>();
  private taskDeletedSource = new Subject<string>();
  public taskSelected$ = this.taskSelectedSource.asObservable();
  public taskUpdated$ = this.taskUpdatedSource.asObservable();
  public taskDeleted$ = this.taskDeletedSource.asObservable();

  selectTask(id: string) {
    console.log('TaskStateShareService > selectTask - id: ', id);
    this.taskSelectedSource.next(id);
  }
  updateTask(id: string) {
    console.log('TaskStateShareService > updateTask - id: ', id);
    this.taskUpdatedSource.next(id);
  }
  deleteTask(id: string) {
    console.log('TaskStateShareService > deleteTask - id: ', id);
    this.taskDeletedSource.next(id);
  }
}
