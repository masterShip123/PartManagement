import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-check-tool-edit',
  templateUrl: './check-tool-edit.component.html',
  styleUrls: ['./check-tool-edit.component.scss']
})
export class CheckToolEditComponent implements OnInit {
  checkTool_ID: string = "";
  checkTool_Name: string = "";
  timming_name: string = "";
  value1: string = "";
  activeFlag: string = "";
  timing: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<CheckToolEditComponent>,
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
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag'));
    this.timing = JSON.parse(localStorage.getItem('timing'));
    this.service.getCheckToolList().then((newdata) => {
      this.source.load(newdata);
      //console.log("Shipp : "+data.password)
     });
  }
  cancel() {
    this.ref.close();
  }
  save(checkToolname,timing,StatusValue){
    
      this.service.putCheckToolList(this.checkTool_ID,checkToolname,timing,StatusValue);
      // this.ref.close();
      this.service.getCheckToolList().then((data) => {
        // this.source.update(data.section_name,sectionname);
        // this.source.update(data.section_ID,sectionid);
          // window.location.reload();
          this.ref.close(this.source.load(data));
       });
    
    
  }


}
