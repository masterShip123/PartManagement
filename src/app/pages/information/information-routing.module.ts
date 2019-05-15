import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './information.component';
import { PartStockComponent } from './part-stock/part-stock.component';

const routes: Routes = [{
  path: '',
  component: InformationComponent,
  children: [
  {
    path: 'partStrock',
    component: PartStockComponent,
  }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationRoutingModule { }
