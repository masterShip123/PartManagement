import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  empId: string = "";
  userName: string = "";
  name: string = "";
  section_name: string = "";
  userType_name: string = "";
  value1: string = "";
  surname: string = "";
         tel: number = 0;
         email: string = "";
        user_password: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<ViewUserComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.service.getDataUser(); 
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.empId = JSON.parse(localStorage.getItem('userListEmpId'));
    this.userName = JSON.parse(localStorage.getItem('currentUser'));
    this.name = JSON.parse(localStorage.getItem('name'));
    this.section_name = JSON.parse(localStorage.getItem('section_name'));
    this.userType_name =JSON.parse(localStorage.getItem('userType_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.surname = JSON.parse(localStorage.getItem('surname'));
    this.tel = JSON.parse(localStorage.getItem('tel'));
    this.email = JSON.parse(localStorage.getItem('email'));
    this.user_password = JSON.parse(localStorage.getItem('password'));
    
  }
  cancel() {
    this.ref.close();
  }
}
