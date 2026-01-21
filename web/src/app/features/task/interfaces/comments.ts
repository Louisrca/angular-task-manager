import { User } from '../../../core/auth/interfaces/user';

export interface Comment {
  id: string;
  taskId?: number;
  content: string;
  createdAt: string;
  createdBy: User;
}
