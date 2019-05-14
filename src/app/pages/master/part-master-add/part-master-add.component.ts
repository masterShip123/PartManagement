import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { partMasterList } from '../../../shared/index.model';

@Component({
  selector: 'ngx-part-master-add',
  templateUrl: './part-master-add.component.html',
  styleUrls: ['./part-master-add.component.scss']
})
export class PartMasterAddComponent implements OnInit {
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  preventDuplicates = false;
  currentUser : string;
  sysPart_ID : string = "";
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  
  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private partMasterList: partMasterList[];

  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<PartMasterAddComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { 
    
  }
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.service.getProvince();
    this.service.getDataUnitType();
    this.service.getDataLocation();
    this.service.getDataMaker();
    this.service.getDataMoldType();

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    this.service.getPartMasterList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    
  }
  cancel() {
    this.ref.close();
  }
  
 
  submit(partid, partname, qty , price , minstock
       , maxstock, unitype, location,maker,moldType, StatusValue) {
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
        this.sysPart_ID = "sys"+partid;
        this.service.getCheckToolList().then((dataa) => {
          this.partMasterList = dataa;
          for(let row of this.partMasterList){
            //  console.log("Datas : "+row.factory_ID+", "+factoryid)
    
             if(row.part_ID == partid){
              this.checkPrimarykey++; 
              
            }
          }
          console.log("T : "+this.checkPrimarykey)
          if(this.checkPrimarykey > 0 ){
            this.showValid = true;
            this.checkPrimarykey = 0;
          }else{
            this.service.postDataPartMaster(partid, partname, qty , price , minstock,maxstock, unitype, location,maker,moldType, StatusValue,this.sysPart_ID) 
            this.service.getPartMasterList().then((data) => {
              this.ref.close(this.source.load(data));
           });
          }
        
        });
    //  if(this.service.postDataPartMaster(partid, partname, qty , price , minstock,maxstock, unitype, location,maker,moldType, StatusValue,this.sysPart_ID) != null){
    //    console.log("Succes");
    //  }
    //  this.service.getPartMasterList().then((data) => {
    //     this.ref.close(this.source.load(data));
    //  });
     
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  fixDecimals(event){
    event.value = "" + event.value;
    event.value = event.value.trim();
    event.value = parseFloat(event.value).toFixed(2);
    return event.value;
  }

}
