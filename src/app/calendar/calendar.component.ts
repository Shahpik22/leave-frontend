import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ApplyLeaveDialogComponent } from '../apply-leave-dialog/apply-leave-dialog.component';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  today = new Date();

  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  leaves: any[] = [];
  daysInMonth: Date[] = [];

  constructor(private dialog: MatDialog, private leaveService: LeaveService) {
    console.log(this.currentMonth);
    console.log(this.today);
    this.generateCalendar(this.currentMonth, this.currentYear);

  }
  ngOnInit() {

    this.leaveService.getLeaves()
      .subscribe((res: any) => {
        this.leaves = res;
      });
  }

  // generateCalendar(month: number, year: number) {
  //   this.daysInMonth = [];

  //   const date = new Date(year, month, 1);
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');

  //   while (date.getMonth() === month) {
  //     this.daysInMonth.push(new Date(date));
  //     date.setDate(date.getDate() + 1);
  //   }
  // }

  generateCalendar(month: number, year: number) {

    this.currentMonth = month;
    this.currentYear = year;

    this.daysInMonth = [];

    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      this.daysInMonth.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  }

  getMonthName() {
    return new Date(this.currentYear, this.currentMonth)
      .toLocaleString('default', { month: 'long' });
  }

  selectDate(day: Date) {

    const selectedDate = this.formatDate(day);

    const dialogRef = this.dialog.open(ApplyLeaveDialogComponent, {
      width: '420px',
      data: { date: selectedDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Leave Submitted:', result);

        // 👉 call API here later
        // this.leaveService.applyLeave(result).subscribe(...)
        // this.leaveService.applyLeave(result)
        //   .subscribe(() => {
        //     alert('Leave Applied Successfully');
        //   });

        this.leaveService.applyLeave(result)
          .subscribe(() => {
            alert('Leave Applied Successfully');
            this.leaveService.getLeaves()
              .subscribe((res: any) => {
                this.leaves = res;
              });

          });
      }
    });
  }


  getLeaveForDate(date: Date) {
    const d = this.formatDate(date);

    return this.leaves.find(l =>
      d >= l.startDate && d <= l.endDate
    );
  }
  getLeavesForDate(date: Date) {

    const d = this.formatDate(date);

    return this.leaves.filter((l: any) =>
      d >= l.startDate && d <= l.endDate
    );
  }
  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }

    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

    isUserAlreadyOnLeave(day: Date): boolean {

    const selectedDate = this.formatDate(day);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return this.leaves.some((leave: any) => {

      const isSameUser =
        leave.name?.toLowerCase() === user.name?.toLowerCase();

      const isDateInRange =
        selectedDate >= leave.startDate &&
        selectedDate <= leave.endDate;

      return isSameUser && isDateInRange;
    });
  }

  isToday(day: Date): boolean {

    return (
      day.getDate() === this.today.getDate() &&
      day.getMonth() === this.today.getMonth() &&
      day.getFullYear() === this.today.getFullYear()
    );
  }
}