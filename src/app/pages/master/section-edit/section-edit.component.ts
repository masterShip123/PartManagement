import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss']
})
export class SectionEditComponent implements OnInit {
  section_ID: string = "";
  section_name: string = "";
  value1: string = "";
  activeFlag: string = "";
  dept_ID: string = "";
  dept_name: string = "";
  currentUser : string;
  private data: string[];
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<SectionEditComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.section_ID = JSON.parse(localStorage.getItem('section_ID'));
    this.section_name = JSON.parse(localStorage.getItem('section_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    console.log("Value : "+this.value1);
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag2'));
    this.dept_ID = JSON.parse(localStorage.getItem('dept_ID'));
    this.dept_name = JSON.parse(localStorage.getItem('dept_name'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.service.getLogin().subscribe((Response) =>{
    //     this.data = Response;
    // });
    // this.service.getSectionList().then((newdata) => {
    //   this.source.load(newdata);
    //   //console.log("Shipp : "+data.password)
    //  });
  }
  cancel() {
    this.ref.close();
  }
  save(department,sectionid,sectionname,StatusValue){
    
      this.service.putSectionList(department,this.section_ID,sectionname,StatusValue);
      // this.ref.close();
      // this.service.getSectionList().then((data) => {
      
      //     // window.location.reload();
      //  });
      this.service.getSectionList().then((data) => {
   
        this.ref.close(this.source.load(data));
     
       });
    
  }
}
