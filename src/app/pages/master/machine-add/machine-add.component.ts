import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { machineList } from '../../../shared/index.model';

@Component({
  selector: 'ngx-machine-add',
  templateUrl: './machine-add.component.html',
  styleUrls: ['./machine-add.component.scss']
})
export class MachineAddComponent implements OnInit {

  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private machineList: machineList[];

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  preventDuplicates = false;
  currentUser : string;
  
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<MachineAddComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder) { 
    
  }
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.service.getDataProductionLine();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    this.service.getMachineList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
  }
  cancel() {
    this.ref.close();
  }
  
  submit(machinename,machineid,productionLine,StatusValue) {
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.machineList = dataa;
      for(let row of this.machineList){
        //  console.log("Datas : "+row.factory_ID+", "+factoryid)

         if(row.machine_ID == machineid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataMachine(machinename,machineid,productionLine,StatusValue)
        this.service.getMachineList().then((data) => {
          this.ref.close(this.source.load(data));
       });
      }
    
    });
    //  if(this.service.postDataMachine(machinename,machineid,productionLine,StatusValue) != null){
    //    console.log("Succes");
    //  }
    //  this.service.getMachineList().then((data) => {
    
    //     this.ref.close(this.source.load(data));
    //  });
     
  }

}
