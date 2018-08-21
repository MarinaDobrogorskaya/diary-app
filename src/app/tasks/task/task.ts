import {Comment} from '../../comments/comment/comment';

export interface Task {
  id: string;
  name: string;
  comments: Comment[];
}
