import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { IndexService } from '../../shared/index.service';
import { NbDialogService } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { MasterRoutingModule } from '../master/master-routing.module';
import { TreeModule } from 'angular-tree-component';
import { ToasterModule } from 'angular2-toaster';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MasterComponent } from '../master/master.component';
import { InformationComponent } from './information.component';
import { PartStockComponent } from './part-stock/part-stock.component';
import { PartStockEditComponent } from './part-stock-edit/part-stock-edit.component';
const COMPONENTS = [
  InformationComponent
];

const MODULES = [
  ThemeModule,
  InformationRoutingModule,
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
    PartStockComponent,
    PartStockEditComponent,
    
  ],
  providers: [
    ...SERVICES,
  ],
})
export class InformationModule { }
