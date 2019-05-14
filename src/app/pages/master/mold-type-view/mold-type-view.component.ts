import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-mold-type-view',
  templateUrl: './mold-type-view.component.html',
  styleUrls: ['./mold-type-view.component.scss']
})
export class MoldTypeViewComponent implements OnInit {
  moldType_ID : string = "";
  moldType_Name : string = "";
  value1: string = "";
  activeFlag: string = "";
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  registerForm: FormGroup;
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<MoldTypeViewComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.moldType_ID = JSON.parse(localStorage.getItem('moldType_ID'));
    this.moldType_Name = JSON.parse(localStorage.getItem('moldType_Name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag'));
  }
  cancel() {
    this.ref.close();
  }
 

}
