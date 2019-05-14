import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { unitTypeList } from '../../../shared/index.model';

@Component({
  selector: 'ngx-unit-type-add',
  templateUrl: './unit-type-add.component.html',
  styleUrls: ['./unit-type-add.component.scss']
})
export class UnitTypeAddComponent implements OnInit {
  
  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private unitTypeList: unitTypeList[];

  currentUser : string;
  source: LocalDataSource = new LocalDataSource();
  // validEmail:boolean = false;
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<UnitTypeAddComponent>,
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
    this.service.getUnitTypeList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
  }
  cancel() {
    this.ref.close();
  }
  
  submit(unitTypeid,unitTypename,StatusValue) {
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.unitTypeList = dataa;
      for(let row of this.unitTypeList){
        //  console.log("Datas : "+row.factory_ID+", "+factoryid)

         if(row.unitType_ID == unitTypeid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataUnitType(unitTypeid,unitTypename,StatusValue)
        this.service.getUnitTypeList().then((data) => {
          this.ref.close(this.source.load(data));
       });
      }
    
    });
    //  if(this.service.postDataUnitType(unitTypeid,unitTypename,StatusValue) != null){
    //    console.log("Succes");
    //  }
    //  this.service.getUnitTypeList().then((data) => {
    //     this.ref.close(this.source.load(data));
    //  });
      
     }

}
