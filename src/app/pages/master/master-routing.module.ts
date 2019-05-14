import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { UserComponent } from './user/user.component';
import { AdduserComponent } from './adduser/adduser.component';
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

const routes: Routes = [{
  path: '',
  component: MasterComponent,
  children: [
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'adduser',
    component: AdduserComponent,
  },{
    path: 'edituser',
    component: EditUserComponent,
  },{
    path: 'viewuser',
    component: ViewUserComponent,
  },{
    path: 'user-type',
    component: UserTypeComponent,
  },{
    path: 'user-type-view',
    component: UserTypeViewComponent,
  },{
    path: 'section',
    component: SectionComponent,
    
  },{
    path: 'sectionadd',
    component: SectionAddComponent,
    
  },{
    path: 'sectionedit',
    component: SectionEditComponent,
 
  },{
    path: 'sectioneview',
    component: SectionViewComponent,
  },{
    path: 'department',
    component: DepartmentComponent,
  },{
    path: 'departmentadd',
    component: DepartmentAddComponent,
  },{
    path: 'departmentedit',
    component: DepartmentEditComponent,
  },{
    path: 'departmentview',
    component: DepartmentViewComponent,
  },{
    path: 'factory',
    component: FactoryComponent,
  },{
    path: 'factoryadd',
    component: FactoryAddComponent,
    
  },{
    path: 'factoryedit',
    component: FactoryEditComponent,
  },{
    path: 'factoryview',
    component: FactoryViewComponent,
  },{
    path: 'production',
    component: ProductionComponent,
  },{
    path: 'productionadd',
    component: ProductionAddComponent,
  },{
    path: 'productionedit',
    component: ProducyionEditComponent,
  },{
    path: 'productionview',
    component: ProductionViewComponent,
  },{
    path: 'machine',
    component: MachineComponent,
  },{
    path: 'machineadd',
    component: MachineAddComponent,
  },{
    path: 'machineedit',
    component: MachineEditComponent,
    
  },{
    path: 'machineview',
    component: MachineViewComponent,
    
  },{
    path: 'requestType',
    component: RequestTypeComponent,
  },{
    path: 'requestTypeadd',
    component: RequestTypeAddComponent,
  },{
    path: 'requestTypeedit',
    component: RequestTypeEditComponent,
  },{
    path: 'requestTypeview',
    component: RequestTypeViewComponent,
  },{
    path: 'checkTool',
    component: CheckToolComponent,
  },{
    path: 'checkToolAdd',
    component: CheckToolAddComponent,
  },{
    path: 'checkToolEdit',
    component: CheckToolEditComponent,
  },{
    path: 'checkToolView',
    component: CheckToolViewComponent,
  },{
    path: 'location',
    component: LocationComponent,
  },{
    path: 'locationAdd',
    component: LocationAddComponent,
  },{
    path: 'locationEdit',
    component: LocationEditComponent,
  },{
    path: 'locationView',
    component: LocationViewComponent,
  },{
    path: 'maker',
    component: MakerComponent,
  },{
    path: 'makerAdd',
    component: MakerAddComponent,
  },{
    path: 'makerEdit',
    component: MakerEditComponent,
  },{
    path: 'makerView',
    component: MakerViewComponent,
  },{
    path: 'moldtype',
    component: MoldTypeComponent,
  },{
    path: 'moldtypeAdd',
    component: MoldTypeAddComponent,
  },{
    path: 'moldtypeEdit',
    component: MoldTypeEditComponent,
  },{
    path: 'moldtypeView',
    component: MoldTypeViewComponent,
  },{
    path: 'partMaster',
    component: PartMasterComponent,
  },{
    path: 'partMasterAdd',
    component: PartMasterAddComponent,
  },{
    path: 'partMasterEdit',
    component: PartMasterEditComponent,
  },{
    path: 'partMasterView',
    component: PartMasterViewComponent,
  },{
    path: 'unitType',
    component: UnitTypeComponent,
  },{
    path: 'unitTypeAdd',
    component: UnitTypeAddComponent,
  },{
    path: 'unitTypeEdit',
    component: UnitTypeEditComponent,
  },{
    path: 'unitTypeView',
    component: UnitTypeViewComponent,
  }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule { }
