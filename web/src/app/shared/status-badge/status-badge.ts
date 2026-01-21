import { Component, Input } from '@angular/core';
import { Status } from '../../features/task/interfaces/tasks';
import { TaskStatusPipe } from '../../features/task/pipe/task-status-pipe';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.html',
  imports: [TaskStatusPipe],
})
export class StatusBadge {
  @Input() status: Status | undefined = Status.PENDING;

  getStatusColor(status: Status | undefined): string {
    switch (status) {
      case Status.PENDING:
        return 'bg-red-100 text-red-800';
      case Status.IN_PROGRESS:
        return 'bg-amber-100 text-amber-800';
      case Status.DONE:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  }
}
