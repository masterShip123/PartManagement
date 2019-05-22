import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormeComponent } from './forme.component';
import { RepairRequestComponent } from './repair-request/repair-request.component';

const routes: Routes = [{
  path: '',
  component: FormeComponent,
  children: [
  {
    path: 'repair',
    component: RepairRequestComponent,
  },
  // {
  //   path: 'partStrockEdit',
  //   component: PartStockEditComponent,
  // }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormeRoutingModule { }
