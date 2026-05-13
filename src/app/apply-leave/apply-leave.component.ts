import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent {

  formData = {
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  };

  constructor(
    private leaveService: LeaveService,
    private route: ActivatedRoute
  ) {
    // 👇 auto-fill from calendar click
    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        this.formData.startDate = params['date'];
        this.formData.endDate = params['date'];
      }
    });
  }

  applyLeave() {
    this.leaveService.applyLeave(this.formData)
      .subscribe(() => {
        alert('Leave Applied Successfully');
      });
  }
}