import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { CommentsComponent } from './comments/comments.component';
import { TaskComponent } from './tasks/task/task.component';
import { CommentComponent } from './comments/comment/comment.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TaskStateShareService} from './common/task-state-share.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    CommentsComponent,
    TaskComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [TaskStateShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
