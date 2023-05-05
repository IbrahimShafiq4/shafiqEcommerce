import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AuthGuard } from '../AuthGuard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', redirectTo: 'reset', pathMatch: 'full'},
  {path: 'change', canActivate: [AuthGuard],component: ChangepasswordComponent, title: 'change password'},
  {path: 'reset', canActivate: [AuthGuard],component: ResetpasswordComponent, title: 'reset password'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, FormsModule, ReactiveFormsModule]
})
export class SettingsRoutingModule { }
