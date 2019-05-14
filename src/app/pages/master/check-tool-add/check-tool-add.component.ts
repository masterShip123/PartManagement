import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { checkToolList } from '../../../shared/index.model';

@Component({
  selector: 'ngx-check-tool-add',
  templateUrl: './check-tool-add.component.html',
  styleUrls: ['./check-tool-add.component.scss']
})
export class CheckToolAddComponent implements OnInit {
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  preventDuplicates = false;
  currentUser : string;
  checkPrimarykey : number = 0;
  showValid: boolean = false;
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  private data: string[];
  private datacheckToolList: checkToolList[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<CheckToolAddComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { 
    
  }
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.service.getDataProductionLine();
    this.service.getDataMicTiming();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    this.service.getCheckToolList().then((dataa) => {
      this.source.load(dataa);
      this.datacheckToolList = dataa;
      for(let row of this.datacheckToolList){
         console.log("Chek : "+row.checkTool_ID)
      }
      console.log("DataList :"+dataa);
    });
  }
  cancel() {
    this.ref.close();
  }
  
  submit(checkToolid,checkToolname,timing,StatusValue) {
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.datacheckToolList = dataa;
      for(let row of this.datacheckToolList){
         console.log("Datas : "+row.checkTool_ID+", "+checkToolid)

         if(row.checkTool_ID == checkToolid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataCheckTool(checkToolid,checkToolname,timing,StatusValue) 
        this.service.getCheckToolList().then((data) => {
          this.ref.close(this.source.load(data));
         });
      }
    
    });
    // console.log("Ck2 : "+this.checkPrimarykey)
    // if(this.checkPrimarykey){
    //   console.log("Check Primary : "+this.checkPrimarykey)
    //   this.service.postDataCheckTool(checkToolid,checkToolname,timing,StatusValue) 
    //   this.service.getCheckToolList().then((data) => {
    //     // this.source.update(data.section_name,sectionname);
    //     // this.source.update(data.section_ID,sectionid);
    //     this.ref.close(this.source.load(data));
    //       // window.location.reload();
    //    });
    // }
    // console.log("Check Primary : "+this.checkPrimarykey)
    // this.service.postDataCheckTool(checkToolid,checkToolname,timing,StatusValue) 
    // this.service.getCheckToolList().then((data) => {
    //   // this.source.update(data.section_name,sectionname);
    //   // this.source.update(data.section_ID,sectionid);
    //   this.ref.close(this.source.load(data));
    //     // window.location.reload();
    //  });
     
    
     
  }

}
