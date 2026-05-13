import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LeaveListComponent } from './leave-list/leave-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'apply-leave', component: ApplyLeaveComponent },
  { path: 'leave-list', component: LeaveListComponent }
];