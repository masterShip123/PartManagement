import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-check-tool-view',
  templateUrl: './check-tool-view.component.html',
  styleUrls: ['./check-tool-view.component.scss']
})
export class CheckToolViewComponent implements OnInit {

  value1: string = "";
  checkTool_ID: string = "";
  
  checkTool_Name : string = "";
  timming_name: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<CheckToolViewComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.service.getDataProductionLine();
    this.service.getDataMicTiming();
    this.checkTool_ID = JSON.parse(localStorage.getItem('checkTool_ID'));
    this.checkTool_Name = JSON.parse(localStorage.getItem('checkTool_Name'));
    this.timming_name = JSON.parse(localStorage.getItem('timming_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
  }
  
  cancel() {
    this.ref.close();
  }

}
