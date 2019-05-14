import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-user-type-view',
  templateUrl: './user-type-view.component.html',
  styleUrls: ['./user-type-view.component.scss']
})
export class UserTypeViewComponent implements OnInit {
  userType_ID: string = "";
  userType_name: string = "";
  value1: string = "";
 
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<UserTypeViewComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.service.getDataUser(); 
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.userType_ID = JSON.parse(localStorage.getItem('userType_ID'));
    this.userType_name = JSON.parse(localStorage.getItem('userType_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
  }
  cancel() {
    this.ref.close();
  }
}
