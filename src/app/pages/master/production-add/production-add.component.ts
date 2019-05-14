import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ProductionLineList } from '../../../shared/index.model';

@Component({
  selector: 'ngx-production-add',
  templateUrl: './production-add.component.html',
  styleUrls: ['./production-add.component.scss']
})
export class ProductionAddComponent implements OnInit {

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  preventDuplicates = false;
  currentUser : string;

  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private productionLineList: ProductionLineList[];

  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<ProductionAddComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { 
    
  }
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    this.service.getProductionLineList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
  }
  cancel() {
    this.ref.close();
  }
  
  submit(productionLinename,productionLineid,factoryname,StatusValue) {
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.productionLineList = dataa;
      for(let row of this.productionLineList){
        //  console.log("Datas : "+row.factory_ID+", "+factoryid)

         if(row.productionLine_ID == productionLineid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataProductionLine(productionLinename,productionLineid,factoryname,StatusValue) 
        this.service.getProductionLineList().then((data) => {
          this.ref.close(this.source.load(data));
       });
      }
    
    });
    //  if(this.service.postDataProductionLine(productionLinename,productionLineid,factoryname,StatusValue) != null){
    //    console.log("Succes");
    //  }
    //  this.service.getProductionLineList().then((data) => {
    //     this.ref.close(this.source.load(data));
    //  });
     
  }

}
