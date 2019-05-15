import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { Http } from '@angular/http';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { ProductionAddComponent } from '../production-add/production-add.component';
import { ProducyionEditComponent } from '../producyion-edit/producyion-edit.component';
import { ProductionViewComponent } from '../production-view/production-view.component';

@Component({
  selector: 'ngx-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {
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
        width: '5%',
      },
      productionLine_ID: {
        title: 'ProductionLine ID',
        type: 'string',
      },
      productionLine_name: {
        title: 'ProductionLine Name',
        type: 'string',
        width: '50%',
      },
      factory_name: {
        title: 'Factory Name',
        type: 'string',
        width: '30%',
      },
      value1: {
        title: 'Status',
        type: 'string',
        width: '10%',
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
    this.service.getProductionLineList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    
  }
 
  onCustom(event){
    localStorage.setItem('productionLine_ID', JSON.stringify(event.data.productionLine_ID));
    localStorage.setItem('productionLine_name', JSON.stringify(event.data.productionLine_name));
    localStorage.setItem('factory_name', JSON.stringify(event.data.factory_name));
    localStorage.setItem('value1', JSON.stringify(event.data.value1));
    localStorage.setItem('factory_ID', JSON.stringify(event.data.factory_ID));
    localStorage.setItem('activeFlag', JSON.stringify(event.data.activeFlag));
    // console.log(event.action);
    if(event.action == "delete"){
      
        console.log("LOG : "+event.data.user_empID);
        //event.confirm.resolve();
        this.service.onDeleteProductionLine(event.data.productionLine_ID).then((newdata) => {
            this.source.load(newdata);  
          //console.log("Shipp : "+data.password)
         });;
        // this.service.getProductionLineList().then((newdata) => {
        //   this.source.load(newdata);  
        //   //console.log("Shipp : "+data.password)
        //  });
   
    }else if(event.action == "edit"){
      this.dialogService.open(ProducyionEditComponent).onClose.subscribe((res) => {
        console.log("Res : "+res);
        this.service.getProductionLineList().then((newdata) => {
            this.source.load(newdata);  
           });
      });
    }else if(event.action == "view"){
      this.dialogService.open(ProductionViewComponent)
    }
  }
  
  onAddUserlist(): void{
    this.dialogService.open(ProductionAddComponent).onClose.subscribe((res) => {
      console.log("Res : "+res);
      this.service.getProductionLineList().then((newdata) => {
          this.source.load(newdata);  
         });
    });
  }
  onSaveConfirm(event): void {
  
      console.log("LOG : "+event.newData.user_empID);
      event.confirm.resolve();
      this.service.onEdit(event.newData.user_empID,event.newData.name,event.newData.section_name,event.newData.userType_name,event.newData.value1);
      this.service.getUserList().then((data) => {
        this.source.load(data);
       });
    
    
  }

}
