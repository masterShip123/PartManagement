import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { SectionEditComponent } from '../section-edit/section-edit.component';

@Component({
  selector: 'ngx-factory-edit',
  templateUrl: './factory-edit.component.html',
  styleUrls: ['./factory-edit.component.scss']
})
export class FactoryEditComponent implements OnInit {
  factory_ID: string = "";
  factory_Name: string = "";
  activeFlag: string = "";
  value1: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<FactoryEditComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.factory_ID = JSON.parse(localStorage.getItem('factory_ID'));
    this.factory_Name = JSON.parse(localStorage.getItem('factory_Name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag2'));
    this.service.getFactoryList().then((newdata) => {
      this.source.load(newdata);
      //console.log("Shipp : "+data.password)
     });
  }
  cancel() {
    this.ref.close();
  }
  save(factoryname,StatusValue){
    
      this.service.putFactoryList(factoryname,this.factory_ID,StatusValue);
      // this.ref.close();
      this.service.getFactoryList().then((data) => {
        // this.source.update(data.section_name,sectionname);
        // this.source.update(data.section_ID,sectionid);
          // window.location.reload();
          this.ref.close(this.source.load(data));
       });
    
    
  }

}
