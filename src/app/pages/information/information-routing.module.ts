import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './information.component';
import { PartStockComponent } from './part-stock/part-stock.component';
import { PartStockEditComponent } from './part-stock-edit/part-stock-edit.component';

const routes: Routes = [{
  path: '',
  component: InformationComponent,
  children: [
  {
    path: 'partStrock',
    component: PartStockComponent,
  },{
    path: 'partStrockEdit',
    component: PartStockEditComponent,
  }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationRoutingModule { }
