import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent implements OnInit {
  dept_ID: string = "";
  dept_name: string = "";
  value1: string = "";
  activeFlag: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<DepartmentEditComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.dept_ID = JSON.parse(localStorage.getItem('dept_ID'));
    this.dept_name = JSON.parse(localStorage.getItem('dept_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag1'));
    console.log("Shii : "+this.activeFlag)
    
  }
  cancel() {
    this.ref.close();
  }
  save(departmentid,departmentname,StatusValue){
    console.log("Staa : "+StatusValue);
      this.service.putDepartmentList(this.dept_ID,departmentname,StatusValue);
      // this.ref.close();
      // localStorage.setItem('activeFlag1', JSON.stringify(StatusValue));
      // console.log("ShiiSave : "+this.activeFlag)
      this.service.getDepartmentList().then((data) => {
        this.ref.close(this.source.load(data));
        // this.source.update(data.section_name,sectionname);
        // this.source.update(data.section_ID,sectionid);
          // window.location.reload();
       });
    
    
  }

}
