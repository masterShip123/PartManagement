import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { UserComponent } from './user/user.component';
import { IndexService } from '../../shared/index.service';
import { ThemeModule } from '../../@theme/theme.module';
import { ExtraComponentsRoutingModule } from '../extra-components/extra-components-routing.module';
import { TreeModule } from 'angular-tree-component';
import { ToasterModule } from 'angular2-toaster';
import { PagesRoutingModule } from '../pages-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdduserComponent } from './adduser/adduser.component';
import { NbDialogService } from '@nebular/theme';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { UserTypeViewComponent } from './user-type-view/user-type-view.component';
import { SectionComponent } from './section/section.component';
import { SectionAddComponent } from './section-add/section-add.component';
import { SectionEditComponent } from './section-edit/section-edit.component';
import { SectionViewComponent } from './section-view/section-view.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { FactoryComponent } from './factory/factory.component';
import { FactoryAddComponent } from './factory-add/factory-add.component';
import { FactoryEditComponent } from './factory-edit/factory-edit.component';
import { FactoryViewComponent } from './factory-view/factory-view.component';
import { ProductionComponent } from './production/production.component';
import { ProductionAddComponent } from './production-add/production-add.component';
import { ProducyionEditComponent } from './producyion-edit/producyion-edit.component';
import { ProductionViewComponent } from './production-view/production-view.component';
import { MachineComponent } from './machine/machine.component';
import { MachineAddComponent } from './machine-add/machine-add.component';
import { MachineEditComponent } from './machine-edit/machine-edit.component';
import { MachineViewComponent } from './machine-view/machine-view.component';
import { RequestTypeComponent } from './request-type/request-type.component';
import { RequestTypeAddComponent } from './request-type-add/request-type-add.component';
import { RequestTypeEditComponent } from './request-type-edit/request-type-edit.component';
import { RequestTypeViewComponent } from './request-type-view/request-type-view.component';
import { CheckToolComponent } from './check-tool/check-tool.component';
import { CheckToolAddComponent } from './check-tool-add/check-tool-add.component';
import { CheckToolEditComponent } from './check-tool-edit/check-tool-edit.component';
import { CheckToolViewComponent } from './check-tool-view/check-tool-view.component';
import { LocationComponent } from './location/location.component';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationViewComponent } from './location-view/location-view.component';
import { MakerComponent } from './maker/maker.component';
import { MakerAddComponent } from './maker-add/maker-add.component';
import { MakerEditComponent } from './maker-edit/maker-edit.component';
import { MakerViewComponent } from './maker-view/maker-view.component';
import { MoldTypeComponent } from './mold-type/mold-type.component';
import { MoldTypeAddComponent } from './mold-type-add/mold-type-add.component';
import { MoldTypeEditComponent } from './mold-type-edit/mold-type-edit.component';
import { MoldTypeViewComponent } from './mold-type-view/mold-type-view.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { PartMasterAddComponent } from './part-master-add/part-master-add.component';
import { PartMasterEditComponent } from './part-master-edit/part-master-edit.component';
import { PartMasterViewComponent } from './part-master-view/part-master-view.component';
import { UnitTypeComponent } from './unit-type/unit-type.component';
import { UnitTypeAddComponent } from './unit-type-add/unit-type-add.component';
import { UnitTypeEditComponent } from './unit-type-edit/unit-type-edit.component';
import { UnitTypeViewComponent } from './unit-type-view/unit-type-view.component';

const COMPONENTS = [
  MasterComponent,
  UserComponent,
  AdduserComponent,
  EditUserComponent
];

const MODULES = [
  ThemeModule,
  MasterRoutingModule,
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
    ViewUserComponent,
    UserTypeComponent,
    UserTypeViewComponent,
    SectionComponent,
    SectionAddComponent,
    SectionEditComponent,
    SectionViewComponent,
    DepartmentComponent,
    DepartmentAddComponent,
    DepartmentEditComponent,
    DepartmentViewComponent,
    FactoryComponent,
    FactoryAddComponent,
    FactoryEditComponent,
    FactoryViewComponent,
    ProductionComponent,
    ProductionAddComponent,
    ProducyionEditComponent,
    ProductionViewComponent,
    MachineComponent,
    MachineAddComponent,
    MachineEditComponent,
    MachineViewComponent,
    RequestTypeComponent,
    RequestTypeAddComponent,
    RequestTypeEditComponent,
    RequestTypeViewComponent,
    CheckToolComponent,
    CheckToolAddComponent,
    CheckToolEditComponent,
    CheckToolViewComponent,
    LocationComponent,
    LocationAddComponent,
    LocationEditComponent,
    LocationViewComponent,
    MakerComponent,
    MakerAddComponent,
    MakerEditComponent,
    MakerViewComponent,
    MoldTypeComponent,
    MoldTypeAddComponent,
    MoldTypeEditComponent,
    MoldTypeViewComponent,
    PartMasterComponent,
    PartMasterAddComponent,
    PartMasterEditComponent,
    PartMasterViewComponent,
    UnitTypeComponent,
    UnitTypeAddComponent,
    UnitTypeEditComponent,
    UnitTypeViewComponent,
    
  ],
  providers: [
    ...SERVICES,
  ],
})


export class MasterModule { }
