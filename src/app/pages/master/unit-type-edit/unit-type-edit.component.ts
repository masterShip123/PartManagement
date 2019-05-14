import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-unit-type-edit',
  templateUrl: './unit-type-edit.component.html',
  styleUrls: ['./unit-type-edit.component.scss']
})
export class UnitTypeEditComponent implements OnInit {
  unitType_ID : string = "";
  unitType_name : string = "";
  value1: string = "";
  activeFlag: string = "";
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<UnitTypeEditComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.unitType_ID = JSON.parse(localStorage.getItem('unitType_ID'));
    this.unitType_name = JSON.parse(localStorage.getItem('unitType_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag'));
  }
  cancel() {
    this.ref.close();
  }
  save(unitTypename,StatusValue){
    
      this.service.putUnitTypeList(unitTypename,this.unitType_ID,StatusValue);
      // this.ref.close();
      this.service.getUnitTypeList().then((data) => {
        // this.source.update(data.section_name,sectionname);
        // this.source.update(data.section_ID,sectionid);
          // window.location.reload();
          this.ref.close(this.source.load(data));
       });
    
    
  }

}
