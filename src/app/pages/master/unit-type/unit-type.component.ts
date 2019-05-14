import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { Http } from '@angular/http';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { UnitTypeEditComponent } from '../unit-type-edit/unit-type-edit.component';
import { UnitTypeAddComponent } from '../unit-type-add/unit-type-add.component';
import { UnitTypeViewComponent } from '../unit-type-view/unit-type-view.component';

@Component({
  selector: 'ngx-unit-type',
  templateUrl: './unit-type.component.html',
  styleUrls: ['./unit-type.component.scss']
})
export class UnitTypeComponent implements OnInit {
  settings = {
    actions : {
       add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'view',
          title: '<i class="nb-person "></i>'
        },
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>'
        },
        {
          name: 'delete',
          title: '<i class="nb-trash"></i>'
        }

      ],
      position: 'right'
    },
   
    // Colum ต้องให้ชื่อตรงกับ Model
    columns: {
      ID: {
        title: 'ID',
        type: 'number',
        
      },
      unitType_ID: {
        title: 'UnitType ID',
        type: 'string',
      },
      unitType_name: {
        title: 'UnitType Name',
        type: 'string',
      },
    
      value1: {
        title: 'Status',
        type: 'string',
      }
    }
  }
  private data: string[];
  //private tbUser:sectionList[];
  showMs: boolean = false;
  //private sele: string[];
  ngOnInit() {
    //this.sele = ["Flex"]
    
  }
  source: LocalDataSource = new LocalDataSource();
  currentUser : string
  constructor(private router: Router,public service: IndexService,public http: Http,private ser: SmartTableService,
    private dialogService: NbDialogService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    //const data2 = this.service.getData();
    //this.source.load(data2);
    this.service.getUnitTypeList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    
  }
 
  onCustom(event){
    localStorage.setItem('unitType_ID', JSON.stringify(event.data.unitType_ID));
    localStorage.setItem('unitType_name', JSON.stringify(event.data.unitType_name));
    localStorage.setItem('value1', JSON.stringify(event.data.value1));
    localStorage.setItem('activeFlag', JSON.stringify(event.data.activeFlag));
    
    // console.log(event.action);
    if(event.action == "delete"){
      
        // console.log("LOG : "+event.data.user_empID);
        //event.confirm.resolve();
        this.service.onDeleteUnitType(event.data.unitType_ID).then((newdata) => {
          this.source.load(newdata);  
        //console.log("Shipp : "+data.password)
       });
        // this.service.getUnitTypeList().then((newdata) => {
        //   this.source.load(newdata);  
        //   //console.log("Shipp : "+data.password)
        //  });
   
    }else if(event.action == "edit"){
      this.dialogService.open(UnitTypeEditComponent).onClose.subscribe((res) => {
        console.log("Res : "+res);
        this.service.getUnitTypeList().then((newdata) => {
            this.source.load(newdata);  
           });
      });
    }else if(event.action == "view"){
      this.dialogService.open(UnitTypeViewComponent)
    }
  }
  
  onAddUserlist(): void{
    this.dialogService.open(UnitTypeAddComponent).onClose.subscribe((res) => {
      console.log("Res : "+res);
      this.service.getUnitTypeList().then((newdata) => {
          this.source.load(newdata);  
         });
    });
  }

}
