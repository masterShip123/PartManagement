import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormeRoutingModule } from './forme-routing.module';
import { FormeComponent } from './forme.component';
import { ThemeModule } from '../../@theme/theme.module';
import { TreeModule } from 'angular-tree-component';
import { ToasterModule } from 'angular2-toaster';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IndexService } from '../../shared/index.service';
import { NbDialogService } from '@nebular/theme';
import { PartStockComponent } from '../information/part-stock/part-stock.component';
import { RepairRequestComponent } from './repair-request/repair-request.component';

const COMPONENTS = [
  FormeComponent
];

const MODULES = [
  ThemeModule,
  FormeRoutingModule,
  TreeModule,
  ToasterModule.forRoot(),
  Ng2SmartTableModule,
  ReactiveFormsModule,
    FormsModule
];

const SERVICES = [
  IndexService,
  NbDialogService
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
    RepairRequestComponent
    
  ],
  providers: [
    ...SERVICES,
  ],
})
export class FormeModule { }
