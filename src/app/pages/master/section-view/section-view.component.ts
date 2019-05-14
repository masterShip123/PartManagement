import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-section-view',
  templateUrl: './section-view.component.html',
  styleUrls: ['./section-view.component.scss']
})
export class SectionViewComponent implements OnInit {
  value1: string = "";
  section_ID: string = "";
  section_name: string = "";
  dept_name : string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<SectionViewComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }
    
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.section_ID = JSON.parse(localStorage.getItem('section_ID'));
    this.section_name = JSON.parse(localStorage.getItem('section_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.dept_name = JSON.parse(localStorage.getItem('dept_name'));
  }

  cancel() {
    this.ref.close();
  }

}
