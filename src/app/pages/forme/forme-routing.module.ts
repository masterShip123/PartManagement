import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormeComponent } from './forme.component';
import { RepairRequestComponent } from './repair-request/repair-request.component';
import { AddRepairComponent } from './add-repair/add-repair.component';
import { EditRepairComponent } from './edit-repair/edit-repair.component';
import { DeleteRepairComponent } from './delete-repair/delete-repair.component';

const routes: Routes = [{
  path: '',
  component: FormeComponent,
  children: [
  {
    // ส่งค่าผ่าน พารามิเตอผ่าน URL
    path: 'repair/:id',
    component: RepairRequestComponent,
  },{
    path: 'addrepair',
    component: AddRepairComponent,
  },{
    path: 'editrepair',
    component: EditRepairComponent,
  },{
    path: 'deleterepair',
    component: DeleteRepairComponent,
  }
  
  
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
