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
import { UiFeaturesComponent } from '../ui-features/ui-features.component';
import { GridComponent } from '../ui-features/grid/grid.component';
import { IconsComponent } from '../ui-features/icons/icons.component';
import { TypographyComponent } from '../ui-features/typography/typography.component';
import { SearchComponent } from '../maps/search-map/search/search.component';
import { EmailService } from '../../shared/email.service';
import { LightboxModule } from 'ngx-lightbox';
import { AddRepairComponent } from './add-repair/add-repair.component';
import { EditRepairComponent } from './edit-repair/edit-repair.component';
import { DeleteRepairComponent } from './delete-repair/delete-repair.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const COMPONENTS = [
  FormeComponent,
  UiFeaturesComponent,
  GridComponent,
  IconsComponent,
  TypographyComponent,
  SearchComponent,
];

const MODULES = [
  ThemeModule,
  FormeRoutingModule,
  TreeModule,
  ToasterModule.forRoot(),
  Ng2SmartTableModule,
  ReactiveFormsModule,
    FormsModule,
    LightboxModule,
    OwlDateTimeModule,
     OwlNativeDateTimeModule,
 
];

const SERVICES = [
  IndexService,
  NbDialogService,
  EmailService
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
    RepairRequestComponent,
    AddRepairComponent,
    EditRepairComponent,
    DeleteRepairComponent
    
  ],
  providers: [
    ...SERVICES,
  ],
})
export class FormeModule { }
