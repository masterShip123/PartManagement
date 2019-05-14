import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-machine-edit',
  templateUrl: './machine-edit.component.html',
  styleUrls: ['./machine-edit.component.scss']
})
export class MachineEditComponent implements OnInit {

  machine_ID: string = "";
  machine_name: string = "";
  value1: string = "";
  productionLine_ID: string = "";
  activeFlag: string = "";
  productionLine_name: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<MachineEditComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.service.getDataProductionLine();
    this.machine_ID = JSON.parse(localStorage.getItem('machine_ID'));
    this.machine_name = JSON.parse(localStorage.getItem('machine_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.productionLine_ID = JSON.parse(localStorage.getItem('productionLine_ID'));
    this.productionLine_name = JSON.parse(localStorage.getItem('productionLine_name'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag'));
    this.service.getMachineList().then((newdata) => {
      this.source.load(newdata);
      //console.log("Shipp : "+data.password)
     });
  }
  cancel() {
    this.ref.close();
  }
  save(machinename,productionLine,StatusValue){
    
      this.service.putMachineList(this.machine_ID,machinename,productionLine,StatusValue);
      // this.ref.close();
      this.service.getMachineList().then((data) => {
        // this.source.update(data.section_name,sectionname);
        // this.source.update(data.section_ID,sectionid);
          // window.location.reload();
          this.ref.close(this.source.load(data));
       });
    
    
  }


}
