import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { departmentList } from '../../../shared/index.model';

@Component({
  selector: 'ngx-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit {

  validEmail:boolean = false;
  private data: string[];
  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private dataDepartmentList: departmentList[];

  source: LocalDataSource = new LocalDataSource();
  // validEmail:boolean = false;
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<DepartmentAddComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { 
    
  }
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
  }
  cancel() {
    this.ref.close();
  }
  
  submit(departmentid,departmentname,StatusValue) {
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.dataDepartmentList = dataa;
      for(let row of this.dataDepartmentList){
         console.log("Datas : "+row.dept_ID+", "+departmentid)

         if(row.dept_ID == departmentid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataDepartment(departmentid,departmentname,StatusValue)
        this.service.getDepartmentList().then((data) => {
          this.ref.close(this.source.load(data));
         });
      }
    
    });
    //  if(this.service.postDataDepartment(departmentid,departmentname,StatusValue) != null){
    //    console.log("Succes");
    //   //  this.ref.close();
       
    //   // this.ref.close();
      
      
    //  }
    //  this.service.getDepartmentList().then((data) => {
    //   this.ref.close(this.source.load(data));
  
    //  });
     
  }

}
