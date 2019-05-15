import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { Http } from '@angular/http';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { MakerAddComponent } from '../maker-add/maker-add.component';
import { MakerEditComponent } from '../maker-edit/maker-edit.component';
import { MakerViewComponent } from '../maker-view/maker-view.component';

@Component({
  selector: 'ngx-maker',
  templateUrl: './maker.component.html',
  styleUrls: ['./maker.component.scss']
})
export class MakerComponent implements OnInit {
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
      maker_ID: {
        title: 'Maker ID',
        type: 'string',
      },
      maker_name: {
        title: 'Maker Name',
        type: 'string',
        width: '60%',
      },
      maker_contactName: {
        title: 'Maker ContactName',
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
    this.service.getMakerLineList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
    });
    
  }
 
  onCustom(event){
    localStorage.setItem('maker_ID', JSON.stringify(event.data.maker_ID));
    localStorage.setItem('maker_name', JSON.stringify(event.data.maker_name));
    localStorage.setItem('maker_contactName', JSON.stringify(event.data.maker_contactName));
    localStorage.setItem('value1', JSON.stringify(event.data.value1));
    localStorage.setItem('activeFlag', JSON.stringify(event.data.activeFlag));
    localStorage.setItem('maker_province', JSON.stringify(event.data.maker_province));
    localStorage.setItem('maker_contactLastName', JSON.stringify(event.data.maker_contactLastName));
    localStorage.setItem('maker_tel', JSON.stringify(event.data.maker_tel));
    localStorage.setItem('maker_email', JSON.stringify(event.data.maker_email));
    localStorage.setItem('maker_address1', JSON.stringify(event.data.maker_address1));
    localStorage.setItem('province_name_tha', JSON.stringify(event.data.province_name_tha));
    // console.log(event.action);
    if(event.action == "delete"){
     
        // console.log("LOG : "+event.data.user_empID);
        //event.confirm.resolve();
        this.service.onDeleteMaker(event.data.maker_ID).then((newdata) => {
          this.source.load(newdata);  
        //console.log("Shipp : "+data.password)
       });
        // this.service.getMakerLineList().then((newdata) => {
        //   this.source.load(newdata);  
        //   //console.log("Shipp : "+data.password)
        //  });
      
    }else if(event.action == "edit"){
      this.dialogService.open(MakerEditComponent).onClose.subscribe((res) => {
        console.log("Res : "+res);
        this.service.getMakerLineList().then((newdata) => {
            this.source.load(newdata);  
           });
      });
    }else if(event.action == "view"){
      this.dialogService.open(MakerViewComponent)
    }
  }
  
  onAddUserlist(): void{
    this.dialogService.open(MakerAddComponent).onClose.subscribe((res) => {
      console.log("Res : "+res);
      this.service.getMakerLineList().then((newdata) => {
          this.source.load(newdata);  
         });
    });
  }
  

}
