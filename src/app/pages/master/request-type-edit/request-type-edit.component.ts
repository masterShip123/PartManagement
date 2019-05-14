import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-request-type-edit',
  templateUrl: './request-type-edit.component.html',
  styleUrls: ['./request-type-edit.component.scss']
})
export class RequestTypeEditComponent implements OnInit {
  requestType_ID: string = "";
  requestType_Name: string = "";
  value1: string = "";
  activeFlag: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<RequestTypeEditComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.service.getDataProductionLine();
    this.requestType_ID = JSON.parse(localStorage.getItem('requestType_ID'));
    this.requestType_Name = JSON.parse(localStorage.getItem('requestType_Name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag2'));
    this.service.getRequestTypeList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
  }
  cancel() {
    this.ref.close();
  }
  save(requestTypeid,requestTypename,StatusValue){
    
      this.service.putRequestTypeList(this.requestType_ID,requestTypename,StatusValue);
      // this.ref.close();
      this.service.getRequestTypeList().then((data) => {
        // this.source.update(data.section_name,sectionname);
        // this.source.update(data.section_ID,sectionid);
          // window.location.reload();
          this.ref.close(this.source.load(data));
       });
    
    
  }
}
