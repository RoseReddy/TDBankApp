import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { config } from 'rxjs';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { EntryComponent } from './entry/entry.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  { path: '', component: EntryComponent },
  { path: 'Confirmation', component: ConfirmationComponent },
  {
    path: 'entry/thankyou',
    loadChildren: () =>
      import('./thank-you/thank-you.module').then((m) => m.ThankYouModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
