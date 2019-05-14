import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { moldTypeList } from '../../../shared/index.model';

@Component({
  selector: 'ngx-mold-type-add',
  templateUrl: './mold-type-add.component.html',
  styleUrls: ['./mold-type-add.component.scss']
})
export class MoldTypeAddComponent implements OnInit {

  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private moldTypeList: moldTypeList[];

  currentUser : string;
  source: LocalDataSource = new LocalDataSource();
  // validEmail:boolean = false;
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<MoldTypeAddComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    this.service.getMoldTypeList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
  }
  cancel() {
    this.ref.close();
  }
  
  submit(moldTypeid,moldTypename,StatusValue) {
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.moldTypeList = dataa;
      for(let row of this.moldTypeList){
        //  console.log("Datas : "+row.factory_ID+", "+factoryid)

         if(row.moldType_ID == moldTypeid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataMoldType(moldTypeid,moldTypename,StatusValue) 
        this.service.getMoldTypeList().then((data) => {
          this.ref.close(this.source.load(data));
       });
      }
    
    });
    //  if(this.service.postDataMoldType(moldTypeid,moldTypename,StatusValue) != null){
    //    console.log("Succes");
    //  }
    //  this.service.getMoldTypeList().then((data) => {
    //     this.ref.close(this.source.load(data));
    //  });
      
     }
}
