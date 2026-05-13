import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../services/leave.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-list.component.html'
})
export class LeaveListComponent implements OnInit {

  leaves: any[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {

    this.leaveService.getLeaves()
    .subscribe((res: any) => {
      this.leaves = res;
    });
  }
}