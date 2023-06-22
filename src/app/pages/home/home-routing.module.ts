import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MailVerifiedGuard } from 'src/app/guards/mail-verified.guard';

const routes: Routes = [
  { 
    path: '', component: HomeComponent,
    canActivate: [MailVerifiedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
