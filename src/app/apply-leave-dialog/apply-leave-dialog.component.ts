import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apply-leave-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apply-leave-dialog.component.html',
  styleUrls: ['./apply-leave-dialog.component.css']
})
export class ApplyLeaveDialogComponent {

  formData = {
    name: '',
    email: '', 
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  };

  constructor(
    private dialogRef: MatDialogRef<ApplyLeaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // prefill date from calendar click
    if (data?.date) {
      this.formData.startDate = data.date;
      this.formData.endDate = data.date;
    }

     // get logged in user
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.formData.name = user.name;
    this.formData.email = user.email;
  }

  submit() {
    this.dialogRef.close(this.formData);
  }

  close() {
    this.dialogRef.close();
  }
}