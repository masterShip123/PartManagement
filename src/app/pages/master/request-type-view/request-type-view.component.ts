import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-request-type-view',
  templateUrl: './request-type-view.component.html',
  styleUrls: ['./request-type-view.component.scss']
})
export class RequestTypeViewComponent implements OnInit {

  requestType_ID: string = "";
  requestType_Name: string = "";
  value1: string = "";
  
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<RequestTypeViewComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.service.getDataUser(); 
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataFactoryLine();
    this.requestType_ID = JSON.parse(localStorage.getItem('requestType_ID'));
    this.requestType_Name = JSON.parse(localStorage.getItem('requestType_Name'));
    this.service.getRequestTypeList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    
    this.value1 = JSON.parse(localStorage.getItem('value1'));
   
    
  }
  cancel() {
    this.ref.close();
  }

}
