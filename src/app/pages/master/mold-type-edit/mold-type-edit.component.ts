import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-mold-type-edit',
  templateUrl: './mold-type-edit.component.html',
  styleUrls: ['./mold-type-edit.component.scss']
})
export class MoldTypeEditComponent implements OnInit {

  moldType_ID : string = "";
  moldType_Name : string = "";
  value1: string = "";
  activeFlag: string = "";
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  registerForm: FormGroup;
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<MoldTypeEditComponent>,
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
  save(moldTypename,StatusValue){
    
      this.service.putMoldTyoeList(moldTypename,this.moldType_ID,StatusValue);
      // this.ref.close();
      this.service.getMoldTypeList().then((data) => {
        // this.source.update(data.section_name,sectionname);
        // this.source.update(data.section_ID,sectionid);
          // window.location.reload();
          this.ref.close(this.source.load(data));
       });
    
    
  }

}
