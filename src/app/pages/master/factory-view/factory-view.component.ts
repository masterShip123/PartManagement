import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-factory-view',
  templateUrl: './factory-view.component.html',
  styleUrls: ['./factory-view.component.scss']
})
export class FactoryViewComponent implements OnInit {
  value1: string = "";
  factory_ID: string = "";
  factory_Name: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<FactoryViewComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }

    
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.factory_ID = JSON.parse(localStorage.getItem('factory_ID'));
    this.factory_Name = JSON.parse(localStorage.getItem('factory_Name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    
  }

  cancel() {
    this.ref.close();
  }

}
