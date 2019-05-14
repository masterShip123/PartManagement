import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { FactoryList } from '../../../shared/index.model';

@Component({
  selector: 'ngx-factory-add',
  templateUrl: './factory-add.component.html',
  styleUrls: ['./factory-add.component.scss']
})
export class FactoryAddComponent implements OnInit {

  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private factoryList: FactoryList[];

  first = "";
  count = 0;
  userId= "";

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  preventDuplicates = false;
  currentUser : string;
 
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<FactoryAddComponent>,
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
    this.service.getFactoryList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
  }
  cancel() {
    this.ref.close();
  }
  
  submit(factoryid,factoryname,StatusValue) {
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.factoryList = dataa;
      for(let row of this.factoryList){
         console.log("Datas : "+row.factory_ID+", "+factoryid)

         if(row.factory_ID == factoryid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataFactory(factoryid,factoryname,StatusValue)
        this.service.getFactoryList().then((data) => {
          this.ref.close(this.source.load(data));
        });
      }
    
    });

    //  if(this.service.postDataFactory(factoryid,factoryname,StatusValue) != null){
    //    console.log("Succes");
    //   //  this.ref.close();
      
     
      
      
    //  }
    //  this.service.getFactoryList().then((data) => {
    //     this.ref.close(this.source.load(data));
    //  });
     
  }

}
